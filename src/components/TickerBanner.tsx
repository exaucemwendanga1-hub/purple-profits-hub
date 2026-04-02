const items = [
  "🔥 10,247 Happy Customers",
  "⭐ Rated 5/5 ★★★★★",
  "🌍 Worldwide Shipping Available",
  "✅ Trusted Suppliers",
  "⚡ Instant Access After Purchase",
  "👀 142 People Viewing Right Now",
];

const text = items.join("  •  ") + "  •  ";

const TickerBanner = () => (
  <div className="bg-primary/20 border-b border-primary/30 py-1.5 overflow-hidden">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-xs md:text-sm font-medium text-primary-light mx-0">
          {text}
        </span>
      ))}
    </div>
  </div>
);

export default TickerBanner;
