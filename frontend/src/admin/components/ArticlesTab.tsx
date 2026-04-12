import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit, X } from "lucide-react";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { mediaService } from "@/services/media.service";
import { INDIAN_NAMES } from "../constants/adminConstants";

interface ArticlesTabProps {
  articles: any[];
  categories: any[];
  refreshData: () => void;
}

const ArticlesTab = ({ articles, categories, refreshData }: ArticlesTabProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // Form State
  const [artTitle, setArtTitle] = useState("");
  const [artExcerpt, setArtExcerpt] = useState("");
  const [artContent, setArtContent] = useState("");
  const [artCat, setArtCat] = useState("");
  const [artImage, setArtImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const startEdit = (article: any) => {
    setEditingArticle(article);
    setArtTitle(article.title);
    setArtExcerpt(article.excerpt || "");
    setArtContent(article.content);
    setArtCat(article.categoryId);
    // Note: We don't set artImage here because it's a file input
  };

  const cancelEdit = () => {
    setEditingArticle(null);
    setArtTitle("");
    setArtExcerpt("");
    setArtContent("");
    setArtCat("");
    setArtImage(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || !artCat) return toast.error("Title and category are required");

    setIsSubmitting(true);
    let uploadedImageUrl = editingArticle?.imageUrl || null;

    try {
      if (artImage) {
        const loadingToast = toast.loading("Uploading image...");
        uploadedImageUrl = await mediaService.uploadImage(artImage);
        toast.dismiss(loadingToast);
      }

      if (editingArticle) {
        // Update
        const res = await adminService.updateArticle(editingArticle.id, {
          title: artTitle,
          categoryId: artCat,
          excerpt: artExcerpt,
          content: artContent,
          imageUrl: uploadedImageUrl,
          published: true
        });
        if (res.success) {
          toast.success("Article updated!");
          cancelEdit();
          refreshData();
        }
      } else {
        // Create
        const randomAuthor = INDIAN_NAMES[Math.floor(Math.random() * INDIAN_NAMES.length)];
        const res = await adminService.createArticle({
          title: artTitle,
          categoryId: artCat,
          excerpt: artExcerpt,
          content: artContent,
          imageUrl: uploadedImageUrl,
          author: randomAuthor,
          published: true
        });
        if (res.success) {
          toast.success(`Article created! Author: ${randomAuthor}`);
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
    if (!confirm("Are you sure you want to delete this article?")) return;
    setIsSubmitting(true);
    try {
      await adminService.deleteArticle(id);
      toast.success("Article deleted!");
      refreshData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete article");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <Card className="shadow-md border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            {editingArticle ? "Edit Article" : "Create New Article"}
          </CardTitle>
          <CardDescription>
            {editingArticle ? "Make changes to your existing content." : "Publish a new story to your audience."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input disabled={isSubmitting} value={artTitle} onChange={(e) => setArtTitle(e.target.value)} placeholder="Article Title" required />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  disabled={isSubmitting}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={artCat}
                  onChange={(e) => setArtCat(e.target.value)}
                  required
                >
                  <option value="">Select Category...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <Label>Article Image Cover {editingArticle && "(Leave empty to keep current)"}</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    disabled={isSubmitting}
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setArtImage(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                <Label>Excerpt (Short summary)</Label>
                <Textarea disabled={isSubmitting} value={artExcerpt} onChange={(e) => setArtExcerpt(e.target.value)} placeholder="Brief summary for the card" />
              </div>
            </div>
            <div className="space-y-4 flex flex-col">
              <div className="flex-grow flex flex-col">
                <Label>Content</Label>
                <Textarea disabled={isSubmitting} className="h-full min-h-[150px]" value={artContent} onChange={(e) => setArtContent(e.target.value)} placeholder="Full article content..." required />
              </div>
              <div className="flex gap-2 self-end">
                {editingArticle && (
                  <Button type="button" variant="outline" onClick={cancelEdit} disabled={isSubmitting}>
                    <X className="w-4 h-4 mr-2"/> Cancel
                  </Button>
                )}
                <Button disabled={isSubmitting} type="submit" className="gap-2">
                  {isSubmitting ? "Processing..." : (
                    <>
                      {editingArticle ? <Edit className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
                      {editingArticle ? "Update Article" : "Publish Article"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <h2 className="font-headline text-xl mt-12 mb-6 font-semibold border-l-4 border-primary pl-4">Manage Articles</h2>
      <div className="grid grid-cols-1 gap-6">
        {articles.length === 0 ? (
          [1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-50 rounded-2xl animate-pulse" />
          ))
        ) : (
          articles.map(article => (
            <Card key={article.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 gap-6 hover:shadow-lg transition-all duration-300 border-none bg-white rounded-2xl group">
            <div className="flex gap-4 items-center w-full min-w-0">
              {article.imageUrl && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                  <img src={article.imageUrl} alt="cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg font-headline line-clamp-1 group-hover:text-primary transition-colors">{article.title}</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-body mt-1">
                  <span className="bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-medium">{article.category?.name || "Uncategorized"}</span>
                  <span className="hidden sm:inline opacity-30">|</span>
                  <span className="flex items-center gap-1 opacity-80"><Edit className="w-3 h-3" /> {article.author || "Staff"}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-start sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
              <Button disabled={isSubmitting} variant="outline" size="sm" className="flex-1 sm:flex-none rounded-lg" onClick={() => startEdit(article)}>
                <Edit className="w-4 h-4 sm:mr-2"/>
                <span className="sm:inline hidden">Edit</span>
              </Button>
              <Button disabled={isSubmitting} variant="destructive" size="sm" className="flex-1 sm:flex-none rounded-lg" onClick={() => handleDelete(article.id)}>
                <Trash2 className="w-4 h-4 sm:mr-2"/>
                <span className="sm:inline hidden">Delete</span>
              </Button>
            </div>
          </Card>
        )))}
        {articles.length === 0 && <p className="text-center text-gray-400 py-10 italic">Your articles list is empty.</p>}
      </div>
    </div>
  );
};

export default ArticlesTab;
