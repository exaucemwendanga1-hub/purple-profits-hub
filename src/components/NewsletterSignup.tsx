import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed!");
          setSubscribed(true);
        } else {
          throw error;
        }
      } else {
        toast.success("You're in! 🎉");
        setSubscribed(true);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center bg-card border border-border rounded-xl p-8">
          <span className="text-4xl mb-4 block">✉️</span>
          <h3 className="font-heading text-2xl text-foreground mb-2">You're on the list!</h3>
          <p className="text-muted-foreground text-sm">We'll send exclusive drops & deals straight to your inbox.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center bg-card border border-border rounded-xl p-8">
        <span className="text-4xl mb-4 block">🔥</span>
        <h2 className="font-heading text-3xl text-foreground mb-2">Get Exclusive Drops</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Be the first to know about new suppliers, flash sales, and member-only deals.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-[2] bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
          <p className="text-muted-foreground text-xs">No spam. Unsubscribe anytime.</p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
