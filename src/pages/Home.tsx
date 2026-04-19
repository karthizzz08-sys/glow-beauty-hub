import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Star, Heart, Award, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-beauty.jpg";
import facialImg from "@/assets/service-facial.jpg";
import hairImg from "@/assets/service-hair.jpg";
import bridalImg from "@/assets/service-bridal.jpg";

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Glow Beauty Parlour spa" width={1600} height={1024} className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        <div className="container relative py-24 md:py-36 text-primary-foreground">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/20 backdrop-blur border border-background/30 text-xs uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3 h-3" /> Premium Beauty Studio
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-[1.05] mb-6">
              Enhancing Your <em className="not-italic text-accent">Natural Beauty</em>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl mb-8 leading-relaxed">
              A serene escape where expert care meets timeless elegance. Discover treatments crafted to make you radiate confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-background text-primary hover:bg-background/90 shadow-elegant text-base px-8 h-12">
                <Link to="/booking">Book Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-background/60 text-primary-foreground hover:bg-background/10 text-base px-8 h-12">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container py-20 grid md:grid-cols-3 gap-6">
        {[
          { icon: Award, title: "10+ Years Expertise", desc: "Trusted by thousands of happy clients across the city." },
          { icon: Heart, title: "Premium Products", desc: "Only top-tier, skin-safe brands curated by our experts." },
          { icon: Sparkles, title: "Serene Ambience", desc: "A calming retreat designed for your complete relaxation." },
        ].map((f, i) => (
          <Card key={i} className="p-8 border-0 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1 bg-card">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center mb-4">
              <f.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-serif text-2xl mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </Card>
        ))}
      </section>

      {/* Services preview */}
      <section className="gradient-soft py-20">
        <div className="container">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Signature Services</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Treatments crafted with love</h2>
            <p className="text-muted-foreground">A curated menu of beauty rituals to refresh, restore, and reveal your glow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: facialImg, title: "Facial", price: "₹799", desc: "Deep-cleansing rituals for luminous, healthy skin." },
              { img: hairImg, title: "Hair Spa", price: "₹999", desc: "Nourishing treatments to revive shine and strength." },
              { img: bridalImg, title: "Bridal Makeup", price: "₹1499", desc: "Flawless looks for your most special day." },
            ].map((s, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-soft hover:shadow-elegant transition-all group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl">{s.title}</h3>
                    <span className="text-primary font-semibold">{s.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                  <Button asChild variant="ghost" className="px-0 hover:bg-transparent text-primary hover:text-primary/80">
                    <Link to="/booking">Book Now <ArrowRight className="ml-1 w-4 h-4" /></Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/services">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Kind Words</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Loved by our guests</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Priya Sharma", text: "The bridal makeup was absolutely stunning. I felt like the most beautiful version of myself on my wedding day.", role: "Bride" },
            { name: "Anjali Verma", text: "Their hair spa is heavenly. My hair has never felt so silky and healthy. I'm a regular now!", role: "Regular Client" },
            { name: "Meera Iyer", text: "Such a relaxing experience. The staff is so warm and skilled — every visit feels like a mini vacation.", role: "Skincare Client" },
          ].map((t, i) => (
            <Card key={i} className="p-8 border-0 shadow-soft bg-card">
              <div className="flex gap-1 mb-4 text-accent">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-foreground/80 italic leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact strip */}
      <section className="container pb-10">
        <div className="rounded-3xl overflow-hidden gradient-hero p-10 md:p-14 text-primary-foreground grid md:grid-cols-2 gap-8 items-center shadow-elegant">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-3">Ready to glow?</h2>
            <p className="text-primary-foreground/90 mb-6 max-w-md">Reserve your seat at our studio and let us pamper you with the care you deserve.</p>
            <Button asChild size="lg" className="rounded-full bg-background text-primary hover:bg-background/90">
              <Link to="/booking">Book Your Visit</Link>
            </Button>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-3 bg-background/15 backdrop-blur p-4 rounded-2xl">
              <Phone className="w-5 h-5" /> <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 bg-background/15 backdrop-blur p-4 rounded-2xl">
              <Mail className="w-5 h-5" /> <span>hello@glowbeauty.in</span>
            </div>
            <div className="flex items-center gap-3 bg-background/15 backdrop-blur p-4 rounded-2xl">
              <MapPin className="w-5 h-5" /> <span>12 Rosewood Lane, Mumbai</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
