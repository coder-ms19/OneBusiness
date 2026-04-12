import { Link } from "react-router-dom";
import type { Article } from "@/data/mockData";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/articles/${article.id}`} className="group block hover-lift">
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-primary text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
              {article.category}
            </span>
            {article.trending && (
              <span className="bg-foreground text-background text-xs font-body font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
                Trending
              </span>
            )}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-headline font-bold text-lg leading-tight text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-[11px] sm:text-xs text-muted-foreground font-body">
            <span className="font-medium text-foreground">{article.author}</span>
            <span className="hidden xs:inline">·</span>
            <span className="w-full xs:w-auto">{new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
