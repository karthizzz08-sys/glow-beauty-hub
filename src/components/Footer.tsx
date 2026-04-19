import { Link } from "react-router-dom";
import { Sparkles, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border/50 bg-secondary/40">
      <div className="container py-16 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-serif text-2xl font-semibold text-gradient">Glow</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Beauty Parlour</div>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground italic">Enhancing Your Natural Beauty.</p>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-4 text-foreground">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/booking" className="hover:text-primary transition-colors">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-4 text-foreground">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-primary" /> +91 98765 43210</li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-primary" /> hello@glowbeauty.in</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary" /> 12 Rosewood Lane, Mumbai 400001</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl mb-4 text-foreground">Follow</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:gradient-hero hover:text-primary-foreground transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:gradient-hero hover:text-primary-foreground transition-all">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Open daily · 10:00 – 20:00</p>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Glow Beauty Parlour. Made with love.
      </div>
    </footer>
  );
};

export default Footer;
