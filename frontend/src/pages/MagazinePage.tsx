import { magazines } from "@/data/mockData";
import magazineCover from "@/assets/magazine-cover.jpg";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

const MagazinePage = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Digital Magazine</h1>
          <p className="text-background/60 font-body mt-4 max-w-lg mx-auto">
            Browse all editions of OneBusiness India — your gateway to business insights and founder stories.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {magazines.map((mag, i) => (
            <div key={mag.id} className="group hover-lift">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={i === 0 ? magazineCover : mag.coverImage}
                    alt={mag.issue}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-headline font-bold text-lg text-card-foreground">{mag.issue}</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">
                    {new Date(mag.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  </p>
                  <div className="flex flex-col xs:flex-row gap-3 mt-4">
                    <Button variant="hero" size="sm" className="flex-1 w-full xs:w-auto">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 w-full xs:w-auto">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MagazinePage;
