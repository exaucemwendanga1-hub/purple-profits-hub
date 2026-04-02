import { useState, useEffect } from "react";

const items = [
  "🔥 500+ Happy Customers",
  "⭐ Rated 4.8/5 ★★★★",
  "🌍 Worldwide Shipping Available",
  "✅ Trusted Suppliers",
  "Instant Access After Purchase⚡",
];

const text = items.join("  I  ") + "  I  ";

const TickerBanner = () => {
  const [seconds, setSeconds] = useState(45 * 60);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="bg-secondary border-b border-border py-2 overflow-hidden">
      <div className="container mx-auto flex items-center justify-between px-4">
        <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
          ⚡ Price increasing in: <span className="text-primary-light font-bold">{m}:{s}</span>
        </span>

        <div className="flex-1 overflow-hidden mx-4">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-xs font-bold opacity-100 font-sans md:text-base text-center py-0 border-2 border-none border-border text-yellow-300 bg-secondary-foreground mx-0 my-0 px-0 rounded-none shadow-inner">
                {text}
              </span>
            ))}
          </div>
        </div>

        <span className="flex items-center gap-2 whitespace-nowrap text-xs md:text-sm">
          <span className="w-2 h-2 rounded-full bg-sale animate-pulse-dot inline-block" />
          <span className="text-muted-foreground"><span className="text-foreground font-semibold">73</span> live</span>
        </span>
      </div>
    </div>
  );
};

export default TickerBanner;
