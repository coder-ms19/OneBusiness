import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";
import { Search, Loader2 } from "lucide-react";
import { publicService } from "@/services/public.service";
import { toast } from "sonner";

const ArticlesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");

  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [artRes, catRes] = await Promise.all([
        publicService.getArticles(),
        publicService.getCategories()
      ]);
      
      if (artRes.success) {
        // Map backend objects to what ArticleCard expects
        const mappedArticles = artRes.data.map((a: any) => ({
          id: a.id,
          image: a.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
          title: a.title,
          category: a.category?.name || "Uncategorized",
          trending: false,
          excerpt: a.excerpt || "Click to read more about this article...",
          author: a.author || "Staff Writer",
          date: a.createdAt,
        }));
        setArticles(mappedArticles);
      }
      
      if (catRes.success) {
        setCategories(catRes.data.map((c: any) => c.name));
      }
    } catch (error) {
      toast.error("Failed to load articles");
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let result = articles;
    if (activeCategory !== "All") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, search, articles]);

  return (
    <div className="min-h-screen">
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Articles & News</h1>
          <p className="text-background/60 font-body mt-4 max-w-lg mx-auto">
            Stay updated with the latest business news, startup stories, and PR features.
          </p>
          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-background text-foreground font-body text-sm border-0 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 min-h-[50vh]">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams(cat === "All" ? {} : { category: cat })}
              className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground font-body py-20">No articles found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArticlesPage;
