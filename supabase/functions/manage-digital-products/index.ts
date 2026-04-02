import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BUCKET = "digital-products";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

  // Verify the caller is an admin
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const anonClient = createClient(supabaseUrl, supabaseAnonKey);
  const token = authHeader.replace("Bearer ", "");
  const { data: userData, error: authError } = await anonClient.auth.getUser(token);
  if (authError || !userData.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Check admin role
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
  const { data: roles } = await serviceClient
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id)
    .eq("role", "admin");

  if (!roles || roles.length === 0) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    // LIST files
    if (action === "list") {
      const { data, error } = await serviceClient.storage.from(BUCKET).list("", {
        limit: 100,
        sortBy: { column: "name", order: "asc" },
      });
      if (error) throw error;
      return new Response(JSON.stringify({ files: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // UPLOAD file
    if (action === "upload") {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      const fileName = formData.get("fileName") as string;

      if (!file || !fileName) {
        return new Response(JSON.stringify({ error: "file and fileName are required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const arrayBuffer = await file.arrayBuffer();
      const { error } = await serviceClient.storage
        .from(BUCKET)
        .upload(fileName, arrayBuffer, {
          contentType: file.type || "application/pdf",
          upsert: true,
        });
      if (error) throw error;

      return new Response(JSON.stringify({ success: true, path: fileName }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // DELETE file
    if (action === "delete") {
      const { fileName } = await req.json();
      if (!fileName) {
        return new Response(JSON.stringify({ error: "fileName is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await serviceClient.storage.from(BUCKET).remove([fileName]);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action. Use: list, upload, delete" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("manage-digital-products error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
