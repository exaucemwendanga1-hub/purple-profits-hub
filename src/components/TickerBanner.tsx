const items = [
  "🔥 10,247 Happy Customers",
  "⭐ Rated 5/5 ★★★★★",
  "🌍 Worldwide Shipping Available",
  "✅ Trusted Suppliers",
  "⚡ Instant Access After Purchase",
];

const text = items.join("  I  ") + "  I  ";

const TickerBanner = () => (
  <div className="bg-primary/20 border-b border-primary/30 py-1.5 overflow-hidden">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-xs text-primary-light mx-0 md:text-base font-mono font-bold border-4 bg-black/0 border-black/[0.01] opacity-0">
          {text}
        </span>
      ))}
    </div>
  </div>
);

export default TickerBanner;
