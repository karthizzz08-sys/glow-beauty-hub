import { Card } from "@/components/ui/card";
import { Heart, Award, Users, Sparkles } from "lucide-react";
import salonImg from "@/assets/gallery-3.jpg";

const staff = [
  { name: "Aisha Khan", role: "Founder & Lead Stylist", bio: "15+ years of experience in bridal & editorial makeup." },
  { name: "Riya Mehta", role: "Senior Esthetician", bio: "Certified skincare specialist trained in advanced facial therapies." },
  { name: "Neha Kapoor", role: "Hair Spa Expert", bio: "Hair-care artisan with a passion for healthy, lustrous hair." },
];

const About = () => {
  return (
    <div>
      <section className="gradient-soft py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Our Story</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">A space made for you</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2014, Glow Beauty Parlour was born from a simple belief — beauty is about feeling at home in your own skin. What started as a small studio has grown into a beloved sanctuary where artistry, comfort, and care come together.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every treatment we offer is rooted in expertise, premium ingredients, and a deep respect for your individuality.
            </p>
          </div>
          <div className="relative">
            <img src={salonImg} alt="Glow studio interior" loading="lazy" width={800} height={800} className="rounded-3xl shadow-elegant w-full" />
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-elegant hidden md:block">
              <p className="font-serif text-3xl text-primary">10+</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Years of glow</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20 grid md:grid-cols-4 gap-6">
        {[
          { icon: Heart, num: "5K+", label: "Happy Clients" },
          { icon: Award, num: "10+", label: "Years Experience" },
          { icon: Users, num: "12", label: "Expert Stylists" },
          { icon: Sparkles, num: "30+", label: "Treatments" },
        ].map((s, i) => (
          <Card key={i} className="p-6 text-center border-0 shadow-soft">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center mx-auto mb-3">
              <s.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="font-serif text-3xl text-gradient">{s.num}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </section>

      <section className="gradient-soft py-20">
        <div className="container">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">The Team</p>
            <h2 className="font-serif text-4xl md:text-5xl">Meet our artists</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {staff.map((s, i) => (
              <Card key={i} className="p-8 text-center border-0 shadow-soft hover:shadow-elegant transition-all">
                <div className="w-24 h-24 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center text-primary-foreground font-serif text-3xl">
                  {s.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="font-serif text-2xl mb-1">{s.name}</h3>
                <p className="text-xs uppercase tracking-wider text-primary mb-3">{s.role}</p>
                <p className="text-sm text-muted-foreground">{s.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
