import { useState, useEffect } from "react";
import { adminService } from "@/services/admin.service";
import { toast } from "sonner";
import CategoriesTab from "../components/CategoriesTab";
import { Loader2, LayoutList } from "lucide-react";

const AdminCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const catsRes = await adminService.getCategories();
      if (catsRes.success) setCategories(catsRes.data);
    } catch (error) {
      toast.error("Failed to load categories data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
        <div className="mb-6 md:mb-10">
            <h1 className="text-xl md:text-3xl font-bold font-headline flex items-center gap-2">
                <LayoutList className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                Manage Categories
            </h1>
            <p className="text-[11px] md:text-sm text-muted-foreground mt-1 font-body italic">Organize your content sectors.</p>
        </div>
        <CategoriesTab 
            categories={categories} 
            refreshData={fetchData} 
        />
    </div>
  );
};

export default AdminCategories;
