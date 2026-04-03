import { useState, useEffect } from "react";

const TickerBanner = () => {
  const [seconds, setSeconds] = useState(45 * 60);
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 16) + 5);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setViewers(() => Math.floor(Math.random() * 16) + 5);
    }, 30_000);
    return () => clearInterval(t);
  }, []);

  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const sc = (seconds % 60).toString().padStart(2, "0");

  const items = [
    "🔥 500+ Happy Customers",
    "🌍 Worldwide Shipping Available",
    "✅ Trusted Suppliers",
    "Instant Access After Purchase⚡",
  ];

  const text = items.join("   ·   ") + "   ·   ";

  return (
    <div className="bg-secondary border-b border-border py-1.5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="md:text-sm text-foreground/90 text-base font-serif font-extrabold opacity-100 border-none my-[6px] py-[6px]">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerBanner;
