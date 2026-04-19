import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Calendar } from "lucide-react";
import { toast } from "sonner";

const Booking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", time: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service || !form.date || !form.time) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitted(true);
    toast.success("Appointment requested! We'll confirm shortly.");
  };

  return (
    <div className="gradient-soft min-h-[calc(100vh-5rem)] py-16">
      <div className="container max-w-2xl">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">Reserve Your Visit</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-3">Book an Appointment</h1>
          <p className="text-muted-foreground">Tell us a little about you — we'll take care of the rest.</p>
        </div>

        <Card className="p-8 md:p-10 border-0 shadow-elegant">
          {submitted ? (
            <div className="text-center py-10 animate-scale-in">
              <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="font-serif text-3xl mb-3">Thank you, {form.name}!</h2>
              <p className="text-muted-foreground mb-2">Your <span className="text-primary font-medium">{form.service}</span> appointment is requested for</p>
              <p className="text-foreground font-medium mb-6">{form.date} at {form.time}</p>
              <p className="text-sm text-muted-foreground mb-6">We'll call you on {form.phone} to confirm.</p>
              <Button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", service: "", date: "", time: "" }); }} variant="outline" className="rounded-full">
                Book another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="mt-1.5 h-12" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="mt-1.5 h-12" />
              </div>
              <div>
                <Label>Service</Label>
                <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                  <SelectTrigger className="mt-1.5 h-12">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facial – ₹799">Facial – ₹799</SelectItem>
                    <SelectItem value="Hair Spa – ₹999">Hair Spa – ₹999</SelectItem>
                    <SelectItem value="Bridal Makeup – ₹1499">Bridal Makeup – ₹1499</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1.5 h-12" />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="mt-1.5 h-12" />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full h-12 rounded-full gradient-hero text-primary-foreground text-base">
                <Calendar className="mr-2 w-4 h-4" /> Request Appointment
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Booking;
