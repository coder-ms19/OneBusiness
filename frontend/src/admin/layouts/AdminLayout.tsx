import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  LogOut, 
  FileText, 
  LayoutList, 
  ImageIcon, 
  LayoutDashboard,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/auth/admin/login");
    toast.success("Logged out successfully");
  };

  const navItems = [
    { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Articles", path: "/admin/articles", icon: FileText },
    { label: "Categories", path: "/admin/categories", icon: LayoutList },
    // { label: "Cover Image", path: "/admin/magazine", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? "bg-primary text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-slate-900 text-white p-3 flex justify-between items-center sticky top-0 z-50">
        <span className="font-bold text-sm tracking-tight uppercase">Admin Panel</span>
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-white/10"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[52px] left-0 right-0 bg-slate-900 border-t border-white/5 z-40 p-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path 
                    ? "bg-primary text-white" 
                    : "text-slate-300 active:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/5 mt-2">
                <Button 
                    variant="ghost" 
                    onClick={handleLogout} 
                    className="w-full justify-start gap-3 text-red-400 hover:bg-red-500/10 text-sm py-5"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Actual Content */}
      <main className="flex-1 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
