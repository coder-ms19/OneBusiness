import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="text-background/60 font-body mt-4 max-w-lg mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold text-foreground">Get in Touch</h2>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "" },
                // { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                { icon: MapPin, label: "Location", value: "" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground font-body">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-primary-foreground px-6 py-3 rounded-lg font-body font-medium text-sm hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a> */}
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="text-center py-16 animate-fade-up">
                <h3 className="font-headline text-xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground font-body mt-2">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-body font-medium text-foreground mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:ring-2 focus:ring-primary outline-none transition resize-none"
                  />
                </div>
                <Button variant="hero" size="lg" type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
