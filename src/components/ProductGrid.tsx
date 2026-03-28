const products = [
  { name: "All Supplier Bundle", price: "$24.99", old: "$74.99", emoji: "📦" },
  { name: "Receipt Creator + View Tools", price: "$19.99", old: "$39.99", emoji: "🧾" },
  { name: "Shoe Supplier", price: "$9.99", old: "$19.99", emoji: "👟" },
  { name: "Luxury Watch Supplier", price: "$9.99", old: "$19.99", emoji: "⌚" },
  { name: "Earbud Supplier", price: "$9.99", old: "$19.99", emoji: "🎧" },
  { name: "Cologne Supplier", price: "$9.99", old: "$19.99", emoji: "🧴" },
  { name: "All Jewelry Supplier", price: "$19.99", old: "$49.99", emoji: "💎" },
  { name: "Bag Supplier", price: "$9.99", old: "$19.99", emoji: "👜" },
  { name: "Luxury Glasses Supplier", price: "$9.99", old: "$19.99", emoji: "🕶️" },
  { name: "Athletic Wear Supplier", price: "$9.99", old: "$19.99", emoji: "🏃" },
  { name: "Puffer Jacket Supplier", price: "$9.99", old: "$19.99", emoji: "🧥" },
  { name: "Wallet Supplier", price: "$9.99", old: "$19.99", emoji: "👛" },
  { name: "Tech Supplier", price: "$9.99", old: "$19.99", emoji: "📱" },
  { name: "Belt Supplier", price: "$9.99", old: "$19.99", emoji: "🪢" },
  { name: "Cleat + Jersey Supplier", price: "$9.99", old: "$19.99", emoji: "⚽" },
  { name: "Golf Club Supplier *NEW*", price: "$9.99", old: "$19.99", emoji: "⛳" },
];

const ProductGrid = () => (
  <section id="products" className="container mx-auto px-4 py-16">
    <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-12">All Products</h2>
    <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
      {products.map((p) => (
        <div key={p.name} className="group bg-card border border-border rounded-xl p-5 flex flex-col transition-all hover:-translate-y-1 hover:border-primary/50 hover:glow-purple-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-3xl">{p.emoji}</span>
            <span className="bg-sale text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">SALE</span>
          </div>
          <h3 className="font-semibold text-foreground text-sm mb-3 flex-1">{p.name}</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-primary-light">{p.price}</span>
            <span className="text-muted-foreground line-through text-xs">{p.old}</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 border border-primary/40 text-primary-light text-xs py-2 rounded-lg hover:bg-primary/10 transition-colors font-medium">Details +</button>
            <button className="flex-1 bg-primary text-primary-foreground text-xs py-2 rounded-lg hover:bg-primary-light transition-colors font-medium">Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProductGrid;
