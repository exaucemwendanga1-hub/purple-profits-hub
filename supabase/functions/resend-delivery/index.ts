import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRODUCTS: Record<string, { name: string; storagePath: string }> = {
  bundle: { name: "All Supplier Bundle", storagePath: "Resell.pdf" },
  shoes: { name: "Shoe Supplier", storagePath: "Shoe supplier.pdf" },
  watch: { name: "Luxury Watch Supplier", storagePath: "Luxury watch.pdf" },
  earbuds: { name: "Earbud Supplier", storagePath: "Copy of AirPods supplier.pdf" },
  cologne: { name: "Cologne Supplier", storagePath: "Cologne.pdf" },
  puffer: { name: "Puffer Jacket Supplier", storagePath: "Designer jacket.pdf" },
  crm: { name: "CRM Supplier", storagePath: "Chrome.pdf" },
  lulu: { name: "Lulu Supplier", storagePath: "activewear.pdf" },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

  try {
    // Admin-only: require admin user JWT
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await userClient.auth.getUser(token);
    let isAuthorized = token === serviceKey;
    if (!isAuthorized && userData?.user) {
      const adminCheck = createClient(supabaseUrl, serviceKey);
      const { data: roleRow } = await adminCheck
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      isAuthorized = !!roleRow;
    }
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { recipientEmail, productKey, customerName } = await req.json();
    const product = PRODUCTS[productKey];
    if (!recipientEmail || !product) {
      return new Response(JSON.stringify({ error: "recipientEmail and valid productKey required", validKeys: Object.keys(PRODUCTS) }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: signed, error: signedErr } = await admin.storage
      .from("digital-products")
      .createSignedUrl(product.storagePath, 60 * 60 * 24);

    if (signedErr || !signed?.signedUrl) {
      return new Response(JSON.stringify({ error: "Failed to create signed URL", details: signedErr?.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceKey}`,
        apikey: anonKey,
      },
      body: JSON.stringify({
        templateName: "product-delivery",
        recipientEmail,
        idempotencyKey: `manual-resend-${productKey}-${Date.now()}`,
        templateData: {
          customerName: customerName || "",
          productName: product.name,
          downloadUrl: signed.signedUrl,
        },
      }),
    });

    const respText = await resp.text();
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: "send failed", status: resp.status, details: respText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, product: product.name, recipient: recipientEmail }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
