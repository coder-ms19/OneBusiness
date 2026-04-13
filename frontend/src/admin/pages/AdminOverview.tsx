import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, LayoutList, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { adminService } from "@/services/admin.service";

const AdminOverview = () => {
    const [stats, setStats] = useState({
        categories: 0,
        articles: 0,
        magazines: 12, // Just a placeholder for stats
        lastArticle: null as any
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [cats, arts, mags] = await Promise.all([
                    adminService.getCategories(),
                    adminService.getArticles(),
                    adminService.getMagazine()
                ]);

                if (cats.success && arts.success) {
                    setStats({
                        categories: cats.data.length,
                        articles: arts.data.length,
                        magazines: mags.success && mags.data ? 1 : 0, 
                        lastArticle: arts.data[0] || null
                    });
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: "Total Articles", value: stats.articles, icon: FileText, color: "text-blue-500", path: "/admin/articles" },
        { label: "Categories", value: stats.categories, icon: LayoutList, color: "text-purple-500", path: "/admin/categories" },
        // { label: "Magazine Setup", value: stats.magazines > 0 ? "Active" : "Pending", icon: BookOpen, color: "text-orange-500", path: "/admin/magazine" },
    ];

    return (
        <div className="space-y-6 md:space-y-12 animate-fade-in font-body">
            <header>
                <h1 className="text-xl md:text-3xl font-extrabold font-headline tracking-tight text-slate-800">Dashboard Overview</h1>
                <p className="text-xs md:text-base text-muted-foreground mt-1 max-w-2xl italic">
                    Welcome back. Here's your magazine overview.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {isLoading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
                    ))
                ) : (
                    cards.map((card) => (
                        <Card key={card.label} className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-[10px] md:text-xs font-bold font-body uppercase tracking-wider text-slate-400">
                                    {card.label}
                                </CardTitle>
                                <card.icon className={`w-4 h-4 ${card.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl md:text-3xl font-bold font-headline mb-2">{card.value}</div>
                                <Link to={card.path} className="text-[10px] md:text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all uppercase">
                                    Manage <ArrowRight className="w-3 h-3" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-base font-headline">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {isLoading ? (
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-gray-50 rounded animate-pulse" />
                                <div className="h-4 w-2/3 bg-gray-50 rounded animate-pulse" />
                            </div>
                       ) : stats.lastArticle ? (
                           <div className="flex gap-4 items-center">
                               {stats.lastArticle.imageUrl && (
                                   <img src={stats.lastArticle.imageUrl} className="w-12 h-12 object-cover rounded-lg" alt="" />
                               )}
                               <div>
                                   <p className="font-bold text-sm line-clamp-1">{stats.lastArticle.title}</p>
                                   <p className="text-[10px] text-muted-foreground">Last updated {new Date(stats.lastArticle.updatedAt).toLocaleDateString()}</p>
                               </div>
                           </div>
                       ) : (
                           <p className="text-sm text-muted-foreground italic">No recent articles found.</p>
                       )}
                    </CardContent>
                </Card>
                
                {/* <Card className="border-none shadow-sm rounded-2xl bg-[#237aad] text-white">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BookOpen className="w-24 h-24 rotate-12" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-base font-headline">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 relative z-10">
                        <Link to="/admin/articles">
                            <button className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
                                + Create New Article
                            </button>
                        </Link>
                        <Link to="/admin/magazine">
                            <button className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
                                ↺ Update Magazine Cover
                            </button>
                        </Link>
                    </CardContent>
                </Card> */}
            </div>
        </div>
    );
};

export default AdminOverview;
