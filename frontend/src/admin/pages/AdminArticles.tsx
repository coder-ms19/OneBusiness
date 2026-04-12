import { useState, useEffect } from "react";
import { adminService } from "@/services/admin.service";
import { toast } from "sonner";
import ArticlesTab from "../components/ArticlesTab";
import { Loader2, FileText } from "lucide-react";

const AdminArticles = () => {
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
      toast.error("Failed to load articles data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
        <div className="mb-6 md:mb-10">
            <h1 className="text-xl md:text-3xl font-bold font-headline flex items-center gap-2">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                Manage Articles
            </h1>
            <p className="text-[11px] md:text-sm text-muted-foreground mt-1 font-body italic">Create and publish stories.</p>
        </div>
        <ArticlesTab 
            articles={articles} 
            categories={categories} 
            refreshData={fetchData} 
        />
    </div>
  );
};

export default AdminArticles;
