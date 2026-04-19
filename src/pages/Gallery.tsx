import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import facial from "@/assets/service-facial.jpg";
import hair from "@/assets/service-hair.jpg";
import bridal from "@/assets/service-bridal.jpg";
import hero from "@/assets/hero-beauty.jpg";

const images = [
  { src: hero, alt: "Spa interior", span: "md:col-span-2 md:row-span-2" },
  { src: bridal, alt: "Bridal makeup" },
  { src: g1, alt: "Nail art" },
  { src: g2, alt: "Eye makeup" },
  { src: g3, alt: "Salon interior" },
  { src: facial, alt: "Skincare" },
  { src: hair, alt: "Hair products" },
  { src: g4, alt: "Spa stones" },
];

const Gallery = () => {
  return (
    <div>
      <section className="gradient-soft py-20">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Moments of Glow</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Our Gallery</h1>
          <p className="text-muted-foreground">A glimpse into our serene studio and the artistry behind every transformation.</p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all group cursor-pointer ${img.span ?? ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-background font-serif text-xl">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
