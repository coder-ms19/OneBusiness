import React, { useEffect, useState } from "react";
import { publicService } from "@/services/public.service";
import { ArticleCard } from "@/components/ArticleCard";
import { Loader2, BookOpen, Layers } from "lucide-react";
import { toast } from "sonner";

const UserArticles = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, artRes] = await Promise.all([
          publicService.getCategories(),
          publicService.getArticles(),
        ]);

        if (catRes.success) {
          setCategories(catRes.data);
        } else {
          toast.error("Failed to fetch categories");
        }

        if (artRes.success) {
          const mapped = artRes.data.map((a: any) => ({
            id: a.id,
            image: a.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
            title: a.title,
            category: a.category?.name || "Uncategorized",
            trending: false,
            excerpt: a.excerpt || "Click to read more about this article...",
            author: a.author || "Staff Writer",
            date: a.createdAt,
          }));
          setArticles(mapped);
        } else {
          toast.error("Failed to fetch articles");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while loading content");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="bg-foreground text-background py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-[10px] font-semibold mb-6 border border-primary/30 uppercase tracking-widest">
            <Layers className="w-3 h-3" />
            <span>Complete Directory</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-headline mb-4 tracking-tight">
            Categorical <span className="text-primary">Insights</span>
          </h1>
          <p className="text-background/60 text-sm md:text-lg max-w-xl mx-auto font-body leading-relaxed italic">
            Archive of business journalism correctly categorized for your industry.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        {loading ? (
             <div className="space-y-20">
                {[1, 2].map(i => (
                    <div key={i} className="animate-pulse">
                         <div className="h-4 w-24 bg-gray-100 rounded mb-4" />
                         <div className="h-8 md:h-10 w-48 md:w-64 bg-gray-200 rounded mb-10" />
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(j => (
                                <div key={j} className="h-72 bg-gray-50 rounded-2xl" />
                            ))}
                         </div>
                    </div>
                ))}
             </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-xl text-muted-foreground">No categories found yet.</p>
          </div>
        ) : (
          categories.map((category) => {
            const categoryArticles = articles.filter(
              (a) => a.category === category.name
            );
            
            if (categoryArticles.length === 0) return null;

            return (
              <section key={category.id} className="mb-24 last:mb-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div className="space-y-2">
                    <span className="text-primary font-bold text-sm tracking-widest uppercase">Explore</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{category.name}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground pb-1">
                    <span className="font-medium text-foreground">{categoryArticles.length}</span>
                    <span className="text-sm">Articles in this section</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryArticles.map((article) => (
                    <div key={article.id} className="animate-fade-up">
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
                <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </section>
            );
          })
        )}
      </main>

      {/* Quick Jump Sidebar Or Bottom Nav? Let's stick to this clean layout */}
    </div>
  );
};

export default UserArticles;
