import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-headline font-bold mb-3">
              One<span className="text-primary">Business</span>{" "}
              <span className="text-sm font-body font-normal tracking-widest uppercase opacity-70">India</span>
            </h3>
            <p className="text-sm opacity-70 font-body max-w-sm leading-relaxed">
              India's premier digital magazine and PR platform helping brands build authority through powerful media presence.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
              {/* <Link to="/magazine" className="hover:text-primary transition-colors">Magazine</Link> */}
              <Link to="/articles" className="hover:text-primary transition-colors">Articles</Link>
              <Link to="/get-featured" className="hover:text-primary transition-colors">Get Featured</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-3">Connect</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
              <a href="mailto:contact@onebusinessindia.com" className="hover:text-primary transition-colors">contact@onebusinessindia.com</a>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact Form</Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs opacity-50 font-body">
          © {new Date().getFullYear()} OneBusiness India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
