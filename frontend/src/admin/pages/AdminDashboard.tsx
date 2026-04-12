import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, FileText, LayoutList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminService } from "@/services/admin.service";
import ArticlesTab from "../components/ArticlesTab";
import CategoriesTab from "../components/CategoriesTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [catsRes, artsRes] = await Promise.all([
        adminService.getCategories(),
        adminService.getArticles()
      ]);
      if (catsRes.success) setCategories(catsRes.data);
      if (artsRes.success) setArticles(artsRes.data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/auth/admin/login");
    toast.success("Logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-headline animate-pulse">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-bold">Initializing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Admin Header */}
      <header className="bg-foreground text-background py-6 sticky top-0 z-10 shadow-xl border-b border-primary/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="font-headline text-2xl font-bold tracking-tight">OneBusiness <span className="text-primary">Admin</span></h1>
            <p className="text-sm opacity-70 font-body">Manage your magazine ecosystem content</p>
          </div>
          <Button variant="secondary" onClick={handleLogout} className="font-body gap-2 hover:bg-red-50 hover:text-red-500 transition-all">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-10 bg-white shadow-sm p-1 rounded-xl border border-border">
            <TabsTrigger value="articles" className="font-body rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
              <FileText className="w-4 h-4 mr-2"/> Articles
            </TabsTrigger>
            <TabsTrigger value="categories" className="font-body rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
              <LayoutList className="w-4 h-4 mr-2"/> Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <ArticlesTab 
              articles={articles} 
              categories={categories} 
              refreshData={fetchData} 
            />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesTab 
              categories={categories} 
              refreshData={fetchData} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
