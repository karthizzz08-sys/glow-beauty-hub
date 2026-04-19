import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <section className="gradient-soft py-20">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Say Hello</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Get in Touch</h1>
          <p className="text-muted-foreground">We'd love to hear from you — drop us a line or visit our studio.</p>
        </div>
      </section>

      <section className="container py-16 grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          {[
            { icon: Phone, label: "Phone", value: "+91 98765 43210" },
            { icon: Mail, label: "Email", value: "hello@glowbeauty.in" },
            { icon: MapPin, label: "Address", value: "12 Rosewood Lane, Bandra West, Mumbai 400001" },
            { icon: Clock, label: "Hours", value: "Daily · 10:00 AM – 8:00 PM" },
          ].map((c, i) => (
            <Card key={i} className="p-6 border-0 shadow-soft flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                <c.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{c.label}</p>
                <p className="font-medium">{c.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 border-0 shadow-elegant">
          <h2 className="font-serif text-3xl mb-6">Send a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cname">Name</Label>
              <Input id="cname" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="mt-1.5 h-12" />
            </div>
            <div>
              <Label htmlFor="cemail">Email</Label>
              <Input id="cemail" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="mt-1.5 h-12" />
            </div>
            <div>
              <Label htmlFor="cmsg">Message</Label>
              <Textarea id="cmsg" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" rows={5} className="mt-1.5" />
            </div>
            <Button type="submit" size="lg" className="w-full h-12 rounded-full gradient-hero text-primary-foreground">
              <Send className="mr-2 w-4 h-4" /> Send Message
            </Button>
          </form>
        </Card>
      </section>
    </div>
  );
};

export default Contact;
