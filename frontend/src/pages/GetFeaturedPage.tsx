import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const GetFeaturedPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">Get Featured</h1>
          <p className="text-primary-foreground/80 font-body mt-4 max-w-lg mx-auto">
            Showcase your brand to thousands of business leaders, investors, and decision-makers through OneBusiness India.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-xl">
        {submitted ? (
          <div className="text-center animate-fade-up py-16">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-headline text-2xl font-bold text-foreground">Application Submitted!</h2>
            <p className="text-muted-foreground font-body mt-3">
              We'll review your application and get back to you within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Your Name", name: "name", type: "text", placeholder: "John Doe" },
              { label: "Business Name", name: "business", type: "text", placeholder: "Your Company" },
              { label: "Email", name: "email", type: "email", placeholder: "you@company.com" },
              { label: "Phone", name: "phone", type: "tel", placeholder: "+91 9876543210" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary outline-none transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Tell us about your business</label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Describe your brand, achievements, and why you should be featured..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary outline-none transition resize-none"
              />
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full">
              Apply to Get Featured <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )}
      </section>
    </div>
  );
};

export default GetFeaturedPage;
