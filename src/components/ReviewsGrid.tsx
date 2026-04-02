import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  product_name: string;
  created_at: string;
}

const hardcodedReviews = [
  { name: "Jake S.", text: "Best supplier list I've ever bought. Made my money back in the first week!", rating: 5 },
  { name: "Alex A.", text: "Instant access and amazing quality. The shoe suppliers are incredible.", rating: 5 },
  { name: "Ryan R.", text: "I was skeptical at first but these suppliers are legit. Highly recommend!", rating: 5 },
  { name: "Noah N.", text: "Great value for money. The ultimate pack is a no-brainer at this price.", rating: 5 },
  { name: "Liam L.", text: "Customer support is top notch and the suppliers deliver fast.", rating: 5 },
  { name: "Ethan G.", text: "Been reselling for 2 years and this is the best resource I've found.", rating: 5 },
  { name: "Owen K.", text: "The jewelry suppliers alone are worth 10x the price. Amazing!", rating: 5 },
  { name: "Henry M.", text: "Quick delivery, verified suppliers, and great prices. What more could you want?", rating: 5 },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="text-gold text-sm mb-3">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-gold" : "text-muted-foreground/30"}>★</span>
    ))}
  </div>
);

const ReviewsGrid = () => {
  const [dbReviews, setDbReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setDbReviews(data);
    };
    fetchReviews();
  }, []);

  // Combine DB reviews with hardcoded fallbacks
  const allReviews = [
    ...dbReviews.map((r) => ({ name: r.reviewer_name, text: r.review_text, rating: r.rating })),
    ...hardcodedReviews,
  ];

  const avgRating = allReviews.length > 0
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : "5.0";

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-3">
          WHAT OUR CUSTOMERS SAY
        </h2>
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-gold text-xl">★</span>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          Rated {avgRating} out of 5 stars · {allReviews.length} reviews
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {allReviews.map((r, idx) => (
          <div
            key={`${r.name}-${idx}`}
            className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:glow-purple-sm"
          >
            <StarRating rating={r.rating} />
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center text-primary-foreground font-bold text-sm">
                {r.name[0]}
              </div>
              <div>
                <div className="text-foreground text-sm font-semibold">{r.name}</div>
                <div className="text-muted-foreground text-xs">Verified Buyer</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsGrid;
