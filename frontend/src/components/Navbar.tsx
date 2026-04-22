import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  // { label: "Magazine", path: "/magazine" },
  { label: "Articles", path: "/articles" },
  { label: "Directory", path: "/user/articles" },
  { label: "Get Featured", path: "/get-featured" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdminLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-headline font-bold tracking-tight text-foreground">
            One<span className="text-primary">Business</span>
          </span>
          <span className="text-xs font-body font-medium text-muted-foreground tracking-widest uppercase">India</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium font-body transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/articles">
            <Search className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          </Link>
          
          {/* Desktop Auth */}
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-3 ml-4 border-l pl-4 border-border">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm" className="font-body">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="font-body text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="ml-4 border-l pl-4 border-border">
              <Link to="/auth/admin/login">
                <Button variant="default" size="sm" className="font-body">Login</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="flex flex-col p-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium font-body py-2 transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="border-t border-border mt-2 pt-4 flex flex-col gap-2">
              {isAdminLoggedIn ? (
                <>
                  <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full justify-start font-body">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start font-body text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => { handleLogout(); setOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth/admin/login" onClick={() => setOpen(false)}>
                  <Button variant="default" className="w-[20%] justify-start font-body">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
