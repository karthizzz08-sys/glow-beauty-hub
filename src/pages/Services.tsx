import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import facialImg from "@/assets/service-facial.jpg";
import hairImg from "@/assets/service-hair.jpg";
import bridalImg from "@/assets/service-bridal.jpg";

const services = [
  {
    img: facialImg,
    title: "Facial",
    price: "₹799",
    duration: "60 min",
    desc: "A pampering deep-cleanse with steam, exfoliation, and a custom mask to leave skin radiant.",
    perks: ["Skin analysis", "Steam & extraction", "Custom mask", "Hydration boost"],
  },
  {
    img: hairImg,
    title: "Hair Spa",
    price: "₹999",
    duration: "75 min",
    desc: "A nourishing treatment that restores moisture, shine, and strength to dull, tired hair.",
    perks: ["Scalp massage", "Hair mask", "Steam therapy", "Blow-dry finish"],
  },
  {
    img: bridalImg,
    title: "Bridal Makeup",
    price: "₹1499",
    duration: "120 min",
    desc: "Long-lasting, photo-perfect bridal looks tailored to your style and outfit.",
    perks: ["Trial session", "HD makeup", "Hair styling", "Touch-up kit"],
  },
];

const Services = () => {
  return (
    <div>
      <section className="gradient-soft py-20">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Our Menu</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Beauty Services</h1>
          <p className="text-muted-foreground">Carefully curated treatments for every skin, every mood, every moment.</p>
        </div>
      </section>

      <section className="container py-16 space-y-10">
        {services.map((s, i) => (
          <Card key={i} className={`grid md:grid-cols-2 gap-0 overflow-hidden border-0 shadow-soft hover:shadow-elegant transition-all ${i % 2 ? "md:[direction:rtl]" : ""}`}>
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-12 [direction:ltr] flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.duration}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="text-primary font-semibold">{s.price}</span>
              </div>
              <h2 className="font-serif text-4xl mb-3">{s.title}</h2>
              <p className="text-muted-foreground mb-6">{s.desc}</p>
              <ul className="grid grid-cols-2 gap-2 mb-8">
                {s.perks.map((p, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" /> {p}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="rounded-full gradient-hero text-primary-foreground w-fit">
                <Link to="/booking">Book Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Services;
