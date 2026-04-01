import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "valid" | "already_unsubscribed" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: anonKey } }
        );
        const data = await res.json();
        if (res.ok && data.valid) {
          setStatus("valid");
        } else if (data.reason === "already_unsubscribed") {
          setStatus("already_unsubscribed");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {status === "loading" && (
          <p className="text-muted-foreground text-lg">Verifying your request...</p>
        )}
        {status === "valid" && (
          <>
            <h1 className="font-heading text-3xl text-foreground mb-4">Unsubscribe</h1>
            <p className="text-muted-foreground mb-8">
              Are you sure you want to unsubscribe from Purple Profits Hub emails?
            </p>
            <button
              onClick={handleUnsubscribe}
              disabled={submitting}
              className="bg-primary hover:bg-primary-light text-primary-foreground px-6 py-3 rounded-full font-semibold transition-all disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Confirm Unsubscribe"}
            </button>
          </>
        )}
        {status === "success" && (
          <>
            <h1 className="font-heading text-3xl text-foreground mb-4">Unsubscribed</h1>
            <p className="text-muted-foreground">You've been successfully unsubscribed.</p>
          </>
        )}
        {status === "already_unsubscribed" && (
          <>
            <h1 className="font-heading text-3xl text-foreground mb-4">Already Unsubscribed</h1>
            <p className="text-muted-foreground">You're already unsubscribed from our emails.</p>
          </>
        )}
        {status === "invalid" && (
          <>
            <h1 className="font-heading text-3xl text-foreground mb-4">Invalid Link</h1>
            <p className="text-muted-foreground">This unsubscribe link is invalid or has expired.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="font-heading text-3xl text-foreground mb-4">Something Went Wrong</h1>
            <p className="text-muted-foreground">Please try again later.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
