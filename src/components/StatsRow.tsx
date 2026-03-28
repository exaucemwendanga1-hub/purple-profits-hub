const stats = [
  { value: "10,247+", label: "Happy Customers" },
  { value: "5.0 ★", label: "Average Rating" },
  { value: "100%", label: "Worldwide Shipping" },
  { value: "Instant", label: "Access After Purchase" },
];

const StatsRow = () => (
  <section className="border-y border-border bg-secondary/50 py-8">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
      {stats.map((s) => (
        <div key={s.label} className="text-center px-4">
          <div className="text-2xl md:text-3xl font-heading text-primary-light">{s.value}</div>
          <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsRow;
