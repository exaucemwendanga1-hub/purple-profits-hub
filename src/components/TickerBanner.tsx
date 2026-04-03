const TickerBanner = () => {


  const items = [
    "🔥 500+ Happy Customers",
    "🌍 Worldwide Shipping Available",
    "✅ Trusted Suppliers",
    "Instant Access After Purchase⚡",
  ];

  const text = items.join("   ·   ") + "   ";

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
