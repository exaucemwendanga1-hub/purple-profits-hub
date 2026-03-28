const text = "10,247 Happy Customers • Best Suppliers In The World • Rated 5/5 ★★★★★ • Worldwide Shipping Available • Instant Access After Purchase • ";

const TickerBanner = () => (
  <div className="bg-primary/20 border-b border-primary/30 py-2 overflow-hidden">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-sm font-medium text-primary-light mx-0">{text}</span>
      ))}
    </div>
  </div>
);

export default TickerBanner;
