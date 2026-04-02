const items = [
  "🔥 500+ Happy Customers",
  "⭐ Rated 4.8/5 ★★★★",
  "🌍 Worldwide Shipping Available",
  "✅ Trusted Suppliers",
  "Instant Access After Purchase⚡",
];

const text = items.join("  I  ") + "  I  ";

const TickerBanner = () => (
  <div className="bg-primary/20 border-b border-primary/30 py-1.5 overflow-hidden">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-xs font-bold opacity-100 font-sans md:text-base text-center py-0 border-2 border-none border-border text-yellow-300 bg-secondary-foreground mx-0 my-0 px-0 rounded-none shadow-inner">
          {text}
        </span>
      ))}
    </div>
  </div>
);

export default TickerBanner;
