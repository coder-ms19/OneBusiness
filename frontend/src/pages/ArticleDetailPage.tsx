import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, Facebook, Twitter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicService } from "@/services/public.service";
import { toast } from "sonner";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticleData(id);
    }
  }, [id]);

  const fetchArticleData = async (articleId: string) => {
    setIsLoading(true);
    try {
      const res = await publicService.getArticle(articleId);
      if (res.success && res.data) {
        setArticle(res.data);
      } else {
        setArticle(null);
      }
    } catch (error) {
      toast.error("Failed to fetch article details");
      setArticle(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-8 max-w-3xl animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded mb-8" />
        <div className="h-6 w-20 bg-primary/20 rounded mb-4" />
        <div className="h-10 w-full bg-gray-200 rounded mb-4" />
        <div className="h-10 w-2/3 bg-gray-200 rounded mb-6" />
        <div className="h-4 w-48 bg-gray-100 rounded mb-8" />
        <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg mb-8" />
        <div className="space-y-4">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-3/4 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold text-foreground">Article Not Found</h1>
          <Link to="/articles" className="text-primary font-body mt-4 inline-block hover:underline">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  // Safely grab values with fallbacks
  const imageUrl = article.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop";
  const categoryName = article.category?.name || "Uncategorized";
  const authorName = article.author || "Staff Writer";
  const publishedDate = new Date(article.createdAt).toLocaleDateString("en-IN", { 
    day: "numeric", month: "long", year: "numeric" 
  });

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.excerpt || `Check out this article: ${article.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in">
        <Link to="/articles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Articles
        </Link>

        <div>
          <span className="bg-primary text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
            {categoryName}
          </span>
        </div>

        <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground mt-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground font-body">
          <span className="font-medium text-foreground">{authorName}</span>
          <span>·</span>
          <span>{publishedDate}</span>
        </div>

        <img
          src={imageUrl}
          alt={article.title}
          className="w-full rounded-lg mt-8 aspect-[16/9] object-cover shadow-lg"
          loading="lazy"
        />

        {article.images && article.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {article.images.map((img: string, index: number) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                 <img 
                   src={img} 
                   alt={`${article.title} gallery ${index + 1}`} 
                   className="w-full h-full object-cover "
                   
                 />
              </div>
            ))}
          </div>
        )}

        {article.excerpt && (
          <div className="text-lg font-body mt-8 font-medium italic text-foreground/80 border-l-4 border-primary pl-6 py-2 bg-secondary/30 rounded-r-lg">
            {article.excerpt}
          </div>
        )}

        <div className="prose prose-lg max-w-none mt-10 font-body text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-headline font-bold uppercase tracking-wider text-muted-foreground">Share Story:</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300" 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  title="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300" 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  title="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300" 
                  onClick={handleShare}
                  title="More Share Options"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Link to="/articles">
              <Button variant="ghost" size="sm" className="font-body text-muted-foreground hover:text-primary">
                Explore More Stories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
