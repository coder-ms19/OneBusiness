import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, Edit, X } from "lucide-react";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";

interface CategoriesTabProps {
  categories: any[];
  refreshData: () => void;
}

const CategoriesTab = ({ categories, refreshData }: CategoriesTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Form State
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");

  const startEdit = (category: any) => {
    setEditingCategory(category);
    setCatName(category.name);
    setCatDesc(category.description || "");
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setCatName("");
    setCatDesc("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName) return toast.error("Name is required");
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        const res = await adminService.updateCategory(editingCategory.id, { 
          name: catName, 
          description: catDesc 
        });
        if (res.success) {
          toast.success("Category updated!");
          cancelEdit();
          refreshData();
        }
      } else {
        const res = await adminService.createCategory({ 
          name: catName, 
          description: catDesc 
        });
        if (res.success) {
          toast.success("Category created!");
          cancelEdit();
          refreshData();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This cannot be undone if articles exist.")) return;
    setIsSubmitting(true);
    try {
      await adminService.deleteCategory(id);
      toast.success("Category deleted!");
      refreshData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <Card className="shadow-md border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            {editingCategory ? "Edit Category" : "Create Category"}
          </CardTitle>
          <CardDescription>
            {editingCategory ? "Update the category details." : "Add a new category to organize articles."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-grow space-y-2">
              <Label>Category Name</Label>
              <Input disabled={isSubmitting} value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="e.g. Featured Startups" required />
            </div>
            <div className="flex-grow space-y-2">
              <Label>Description</Label>
              <Input disabled={isSubmitting} value={catDesc} onChange={(e) => setCatDesc(e.target.value)} placeholder="Optional description..." />
            </div>
            <div className="flex gap-2">
              {editingCategory && (
                <Button type="button" variant="outline" onClick={cancelEdit} disabled={isSubmitting}>
                  <X className="w-4 h-4 mr-2"/> Cancel
                </Button>
              )}
              <Button disabled={isSubmitting} type="submit" className="gap-2 w-full md:w-auto">
                {isSubmitting ? "Processing..." : (
                  <>
                    {editingCategory ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
                    {editingCategory ? "Update" : "Create"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <h2 className="font-headline text-xl mt-12 mb-6 font-semibold border-l-4 border-primary pl-4">Manage Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.length === 0 ? (
            [1, 2, 3, 4].map(i => (
                <div key={i} className="h-28 bg-gray-50 rounded-2xl animate-pulse" />
            ))
        ) : (
            categories.map(cat => (
                <Card key={cat.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-6 hover:shadow-lg transition-all duration-300 border-none bg-white rounded-2xl group">
            <div className="w-full min-w-0">
              <h3 className="font-bold text-lg font-headline group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-sm text-muted-foreground font-body mt-1 line-clamp-2">{cat.description || "No description provided"}</p>
              {cat._count && (
                  <div className="flex items-center gap-2 mt-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground font-medium font-body">Articles: {cat._count.articles}</span>
                  </div>
              )}
            </div>
            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 border-t sm:border-t-0 pt-4 sm:pt-0">
              <Button disabled={isSubmitting} variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => startEdit(cat)}><Edit className="w-4 h-4"/></Button>
              <Button disabled={isSubmitting} variant="destructive" size="sm" className="flex-1 sm:flex-none" onClick={() => handleDelete(cat.id)}><Trash2 className="w-4 h-4"/></Button>
            </div>
          </Card>
            ))
        )}
        {categories.length === 0 && <p className="text-center text-gray-400 col-span-2 py-10">No categories found.</p>}
      </div>
    </div>
  );
};

export default CategoriesTab;
