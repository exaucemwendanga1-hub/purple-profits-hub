const links = ["Terms of Service", "Contact", "Privacy Policy", "Shipping Policy", "Refund Policy"];

const Footer = () => (
  <footer className="border-t border-border bg-secondary/30 py-10">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {links.map((l) => (
          <a key={l} href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{l}</a>
        ))}
      </div>
      <p className="text-muted-foreground text-sm">© 2026 YourResells. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
