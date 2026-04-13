import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";

// Product priceId → file path + display name mapping
const PRODUCTS: Record<string, { name: string; storagePath: string }> = {
  // Old account price IDs
  "price_1TG8uJPkl9P0JJ5qx0TQ3ccH": { name: "All Supplier Bundle", storagePath: "Resell.pdf" },
  "price_1TG96qPkl9P0JJ5qXGXtNrmk": { name: "Shoe Supplier", storagePath: "Shoe supplier.pdf" },
  "price_1TGvFmPkl9P0JJ5qY6nfhFdm": { name: "Luxury Watch Supplier", storagePath: "Luxury watch.pdf" },
  "price_1TGvG8Pkl9P0JJ5q5S2l1ceZ": { name: "Earbud Supplier", storagePath: "Copy of AirPods supplier.pdf" },
  "price_1TGvH6Pkl9P0JJ5q4mg7eLmk": { name: "Cologne Supplier", storagePath: "Cologne.pdf" },
  "price_1TGvIwPkl9P0JJ5qVtH9gE7c": { name: "Puffer Jacket Supplier", storagePath: "Designer jacket.pdf" },
  "price_1TIJ2oPkl9P0JJ5qfhrApxYP": { name: "CRM Supplier", storagePath: "Chrome.pdf" },
  "price_1TICsCPkl9P0JJ5qikR7BRdq": { name: "Lulu Supplier", storagePath: "activewear.pdf" },
  // New account price IDs
  "price_1TIJhKB69r5Oj3X78nbBHGrt": { name: "All Supplier Bundle", storagePath: "Resell.pdf" },
  "price_1TIJfYB69r5Oj3X7jxdPNj1R": { name: "All Supplier Bundle", storagePath: "Resell.pdf" },
  "price_1TIJnKB69r5Oj3X7aER6v3Nv": { name: "Shoe Supplier", storagePath: "Shoe supplier.pdf" },
  "price_1TLXsoB69r5Oj3X7TFBvlFxA": { name: "Luxury Watch Supplier", storagePath: "Luxury watch.pdf" },
  "price_1TLauTB69r5Oj3X7i0Yh1K0L": { name: "Earbud Supplier", storagePath: "Copy of AirPods supplier.pdf" },
  "price_1TLawPB69r5Oj3X75dch1EMg": { name: "Cologne Supplier", storagePath: "Cologne.pdf" },
  "price_1TLaxpB69r5Oj3X7DBYK69Z9": { name: "Puffer Jacket Supplier", storagePath: "Designer jacket.pdf" },
  "price_1TLazWB69r5Oj3X7nBCVD79M": { name: "Lulu Supplier", storagePath: "activewear.pdf" },
  "price_1TLb0jB69r5Oj3X76tKsMKgX": { name: "CRM Supplier", storagePath: "Chrome.pdf" },
};

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!stripeSecretKey || !supabaseUrl || !supabaseServiceKey) {
    console.error("Missing required env vars");
    return new Response("Server configuration error", { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-08-27.basil" });
  const body = await req.text();

  let event: Stripe.Event;

  if (stripeWebhookSecret) {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response("Missing stripe-signature header", { status: 400 });
    }
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return new Response("Webhook signature verification failed", { status: 400 });
    }
  } else {
    event = JSON.parse(body);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      console.error("No customer email in session", { sessionId: session.id });
      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Try to find a user by email to link the order
    const { data: userData } = await supabase.auth.admin.listUsers();
    const matchedUser = userData?.users?.find(u => u.email === customerEmail);

    for (const item of lineItems.data) {
      const priceId = item.price?.id;
      if (!priceId) continue;

      const product = PRODUCTS[priceId];
      if (!product) {
        console.warn("Unknown priceId:", priceId);
        continue;
      }

      // Save order to database
      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: matchedUser?.id || null,
          stripe_session_id: session.id,
          customer_email: customerEmail,
          product_name: product.name,
          price_id: priceId,
          amount: item.amount_total || 0,
          currency: item.currency || "usd",
          status: "completed",
          digital_asset_path: product.storagePath,
        });

      if (orderError) {
        console.error("Failed to save order:", orderError);
      }

      // Generate a signed download URL (expires in 24 hours)
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from("digital-products")
        .createSignedUrl(product.storagePath, 60 * 60 * 24);

      if (signedUrlError || !signedUrlData?.signedUrl) {
        console.error("Failed to create signed URL", {
          error: signedUrlError,
          path: product.storagePath,
        });
        continue;
      }

      // Helper: call send-transactional-email with explicit service-role auth
      const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
      const sendEmail = async (body: Record<string, unknown>) => {
        const resp = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseServiceKey}`,
            "apikey": supabaseAnonKey,
          },
          body: JSON.stringify(body),
        });
        if (!resp.ok) {
          const errText = await resp.text();
          console.error("send-transactional-email failed:", resp.status, errText);
        }
      };

      // Send order confirmation email
      await sendEmail({
        templateName: "order-confirmation",
        recipientEmail: customerEmail,
        idempotencyKey: `order-confirm-${session.id}-${priceId}`,
        templateData: {
          productName: product.name,
          amount: `$${((item.amount_total || 0) / 100).toFixed(2)}`,
          customerEmail,
        },
      });

      // Send product delivery email
      await sendEmail({
        templateName: "product-delivery",
        recipientEmail: customerEmail,
        idempotencyKey: `product-delivery-${session.id}-${priceId}`,
        templateData: {
          customerName: session.customer_details?.name || "",
          productName: product.name,
          downloadUrl: signedUrlData.signedUrl,
        },
      });

      console.log("Order saved & delivery email sent", {
        email: customerEmail,
        product: product.name,
        sessionId: session.id,
      });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
