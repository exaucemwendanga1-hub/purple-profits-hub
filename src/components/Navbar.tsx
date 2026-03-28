import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo_transparent.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex flex-col items-center py-3 px-4">
        <img src={logo} alt="ZSauce LLC" className="h-20 cursor-pointer" onClick={() => scrollTo("hero")} />
        
        <div className="hidden md:flex items-center gap-8 mt-2">
          {[["Home","hero"],["Products","products"],["FAQ","faq"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-muted-foreground hover:text-foreground transition-colors font-medium">{label}</button>
          ))}
        </div>

        <button className="md:hidden absolute right-4 top-6 text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 flex flex-col gap-3 items-center">
          {[["Home","hero"],["Products","products"],["FAQ","faq"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-muted-foreground hover:text-foreground py-2">{label}</button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
