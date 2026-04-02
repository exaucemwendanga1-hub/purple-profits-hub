import { useState, useEffect } from "react";
import { Menu, X, User, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo_new.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .then(({ data }) => setIsAdmin(!!data?.length));
  }, [user]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto py-3 px-4 items-center justify-center flex flex-col gap-0">
        <img src={logo} alt="ZSauce LLC" className="h-36 md:h-44 cursor-pointer text-xl font-extrabold object-fill" onClick={() => scrollTo("hero")} />
        
        <div className="hidden md:flex items-center gap-8 mt-2">
          {[["Home","hero"],["Products","products"],["FAQ","faq"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-muted-foreground hover:text-foreground transition-colors font-medium">{label}</button>
          ))}
          <a href="sms:+16399949261" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Contact</a>
          <Link
            to={user ? "/account" : "/auth"}
            className="flex items-center gap-1.5 text-primary-light hover:text-primary transition-colors font-medium"
          >
            <User size={16} />
            {user ? "Account" : "Sign In"}
          </Link>
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
          <a href="sms:+16399949261" className="text-muted-foreground hover:text-foreground py-2">Contact</a>
          <Link
            to={user ? "/account" : "/auth"}
            className="flex items-center gap-1.5 text-primary-light hover:text-primary py-2"
            onClick={() => setOpen(false)}
          >
            <User size={16} />
            {user ? "Account" : "Sign In"}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
