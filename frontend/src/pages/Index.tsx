import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/ArticleCard";
import { magazines } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";
import magazineCover from "@/assets/magazine-cover.jpg";
import { ArrowRight, TrendingUp, BookOpen, Users, Award, Loader2 } from "lucide-react";
import { publicService } from "@/services/public.service";

const Index = () => {
  const [dynArticles, setDynArticles] = useState<any[]>([]);
  const [dynCategories, setDynCategories] = useState<any[]>([]);
  const [dynMagazine, setDynMagazine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artRes, catRes, magRes] = await Promise.all([
          publicService.getArticles(),
          publicService.getCategories(),
          publicService.getMagazine(),
        ]);
        if (artRes.success) {
          const mapped = artRes.data.map((a: any) => ({
            id: a.id,
            image: a.imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
            title: a.title,
            category: a.category?.name || "Uncategorized",
            trending: a.trending || false,
            featured: a.featured || false,
            excerpt: a.excerpt || "Click to read more about this article...",
            author: a.author || "Staff Writer",
            date: a.createdAt,
          }));
          setDynArticles(mapped);
        }
        if (catRes.success) {
          setDynCategories(catRes.data);
        }
        if (magRes.success) {
          setDynMagazine(magRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch Index data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredArticles = dynArticles.filter((a) => a.featured);
  const trendingArticles = dynArticles.filter((a) => a.trending).slice(0, 3);
  const latestMagazine = magazines[0];



  const currentMonthYear = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="OneBusiness India" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-up">
          <div className="inline-block bg-primary/20 text-primary-foreground text-[10px] sm:text-xs font-body font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-primary/30">
            India's Premier Business Platform
          </div>
          <h1 className="font-headline text-3xl md:text-6xl lg:text-7xl font-bold text-background leading-tight max-w-4xl mx-auto">
            Where Brands Become{" "}
            <span className="text-primary">Authorities</span>
          </h1>
          <p className="text-background/70 font-body text-base md:text-xl mt-4 sm:mt-6 max-w-2xl mx-auto">
            Digital Magazine • PR Features • Business News
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 px-6 sm:px-0">
            <Link to="/get-featured" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="w-full px-8">
                Get Featured <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/magazine" className="w-full sm:w-auto">
              <Button variant="hero-outline" size="lg" className="w-full px-8 border-background/30 text-background hover:bg-background hover:text-foreground">
                Read Magazine
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center">
            {[
              { icon: BookOpen, label: "Magazine Issues", value: "12+" },
              { icon: Users, label: "Brands Featured", value: "200+" },
              { icon: TrendingUp, label: "Monthly Readers", value: "50K+" },
              { icon: Award, label: "PR Stories", value: "500+" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <s.icon className="h-5 w-5 text-primary mb-1" />
                <span className="text-xl sm:text-2xl font-headline font-bold text-foreground">{s.value}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-body uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-headline text-3xl font-bold text-foreground text-center mb-10">Explore Categories</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dynCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/articles?category=${encodeURIComponent(cat.name)}`}
                className="group border border-border rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <span className="font-body font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Latest Stories */}
      <section className="container mx-auto px-4 ">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-headline text-3xl font-bold text-foreground flex items-center gap-3">
            Latest Stories
          </h2>
          <Link to="/user/articles" className="text-primary font-body font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-primary/20" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dynArticles.slice(0, 6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {dynArticles.length === 0 && (
              <p className="text-center text-muted-foreground py-10 font-body">No articles found.</p>
            )}
          </>
        )}
      </section>

      {/* Trending */}
      {trendingArticles.length > 0 && (
        <section className="bg-secondary/50 border-y border-border">
          <div className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline text-3xl font-bold text-foreground flex items-center gap-3">
                <TrendingUp className="h-7 w-7 text-primary" /> Trending Now
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Magazine Section */}
      <section className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-primary text-xs font-body font-semibold uppercase tracking-widest">Latest Issue</span>
              <h2 className="font-headline text-3xl md:text-4xl font-bold mt-3 text-background">
                {currentMonthYear} Edition
              </h2>
              <p className="text-background/60 font-body mt-4 leading-relaxed max-w-md">
                Discover the stories of India's most innovative businesses, founders, and brands shaping the future of commerce.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/magazine" className="w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="w-full">Read Now</Button>
                </Link>
                <Link to="/magazine" className="w-full sm:w-auto">
                  <Button variant="hero-outline" size="lg" className="w-full border-background/30 text-background hover:bg-background hover:text-foreground">
                    All Issues
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={dynMagazine?.imageUrl || magazineCover}
                alt="Latest Magazine Issue"
                className="rounded-lg shadow-2xl max-w-[320px] w-full hover-lift"
                loading="lazy"
                width={640}
                height={900}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Get Featured CTA */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready to Build Your Brand Authority?
          </h2>
          <p className="text-primary-foreground/80 font-body mt-4 max-w-lg mx-auto">
            Get featured in OneBusiness India magazine and reach thousands of business leaders, investors, and decision-makers.
          </p>
          <Link to="/get-featured">
            <Button size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90 font-semibold px-10">
              Apply to Get Featured <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
