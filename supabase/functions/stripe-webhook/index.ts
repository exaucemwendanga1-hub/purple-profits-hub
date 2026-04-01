import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2";

// Product priceId → file path + display name mapping
const PRODUCTS: Record<string, { name: string; storagePath: string }> = {
  "price_1TG8uJPkl9P0JJ5qx0TQ3ccH": { name: "All Supplier Bundle", storagePath: "all-supplier-bundle.pdf" },
  "price_1TG96qPkl9P0JJ5qXGXtNrmk": { name: "Shoe Supplier", storagePath: "shoe-supplier.pdf" },
  "price_1TGvFmPkl9P0JJ5qY6nfhFdm": { name: "Luxury Watch Supplier", storagePath: "luxury-watch-supplier.pdf" },
  "price_1TGvG8Pkl9P0JJ5q5S2l1ceZ": { name: "Earbud Supplier", storagePath: "earbud-supplier.pdf" },
  "price_1TGvH6Pkl9P0JJ5q4mg7eLmk": { name: "Cologne Supplier", storagePath: "cologne-supplier.pdf" },
  "price_1TGvIHPkl9P0JJ5q5dIn0rk9": { name: "Luxury Glasses Supplier", storagePath: "luxury-glasses-supplier.pdf" },
  "price_1TGvIwPkl9P0JJ5qVtH9gE7c": { name: "Puffer Jacket Supplier", storagePath: "puffer-jacket-supplier.pdf" },
  "price_1TGvM7Pkl9P0JJ5qMYG2mdtE": { name: "Tech Supplier", storagePath: "tech-supplier.pdf" },
  "price_1TGvMTPkl9P0JJ5qQ7c79u8b": { name: "Belt Supplier", storagePath: "belt-supplier.pdf" },
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
    // No webhook secret configured — parse event directly (less secure, for dev)
    event = JSON.parse(body);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      console.error("No customer email in session", { sessionId: session.id });
      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    // Get line items to find which product was purchased
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    for (const item of lineItems.data) {
      const priceId = item.price?.id;
      if (!priceId) continue;

      const product = PRODUCTS[priceId];
      if (!product) {
        console.warn("Unknown priceId:", priceId);
        continue;
      }

      // Generate a signed download URL (expires in 24 hours)
      const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from("digital-products")
        .createSignedUrl(product.storagePath, 60 * 60 * 24); // 24 hours

      if (signedUrlError || !signedUrlData?.signedUrl) {
        console.error("Failed to create signed URL", {
          error: signedUrlError,
          path: product.storagePath,
        });
        continue;
      }

      // Send product delivery email
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "product-delivery",
          recipientEmail: customerEmail,
          idempotencyKey: `product-delivery-${session.id}-${priceId}`,
          templateData: {
            productName: product.name,
            downloadUrl: signedUrlData.signedUrl,
          },
        },
      });

      console.log("Product delivery email sent", {
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
