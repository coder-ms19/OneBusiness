import { Target, Eye, Zap } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-foreground text-background py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">About OneBusiness India</h1>
          <p className="text-background/60 font-body mt-6 text-lg leading-relaxed">
            We are India's premier digital magazine and PR platform — dedicated to helping brands, founders, and businesses 
            build authority through powerful media presence.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="space-y-12">
          <div>
            <h2 className="font-headline text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              OneBusiness India was born from a simple belief: every business has a story worth telling. 
              We bridge the gap between ambitious brands and the audiences they deserve. Through our monthly 
              digital magazine, curated PR features, and in-depth business journalism, we give founders and 
              companies a platform to shine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Mission", desc: "Helping brands build authority through strategic media presence and compelling storytelling." },
              { icon: Eye, title: "Vision", desc: "To become India's most trusted digital platform for business news and brand features." },
              { icon: Zap, title: "Impact", desc: "200+ brands featured, 50K+ monthly readers, and a growing community of business leaders." },
            ].map((item) => (
              <div key={item.title} className="border border-border rounded-lg p-6 hover-lift">
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-headline font-bold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-body mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
