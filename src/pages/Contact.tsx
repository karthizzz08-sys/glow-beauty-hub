import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle2, Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.subject || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitted(true);
    toast.success('Message sent! We\'ll get back to you soon.');
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-20">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-maroon-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700">
            Have questions? We'd love to hear from you. Contact our support team anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-maroon-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-maroon-900 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-700">support@chettiarconnect.com</p>
                  <p className="text-gray-600 text-sm">We reply within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-maroon-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-maroon-900 mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-700">+91 9876 543 210</p>
                  <p className="text-gray-600 text-sm">Monday - Friday, 10 AM - 6 PM IST</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-maroon-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-maroon-900 mb-1">
                    Address
                  </h3>
                  <p className="text-gray-700">Chettiar Connect Inc.</p>
                  <p className="text-gray-600 text-sm">123 Heritage Street, Mumbai, India 400001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 shadow-lg border border-gold-200">
            {submitted ? (
              <div className="text-center py-12 animate-scale-in">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-500 to-maroon-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-maroon-900 mb-3">
                  Thank You!
                </h2>
                <p className="text-gray-700 mb-2">
                  We've received your message, {form.name}!
                </p>
                <p className="text-gray-600">
                  Our team will get back to you shortly at {form.email}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-maroon-900">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-maroon-900">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-maroon-900">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-maroon-900">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="What is this about?"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-maroon-900">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us more..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-600 to-maroon-600 text-white hover:from-gold-700 hover:to-maroon-700 font-semibold py-3"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg p-12 shadow-md">
          <h2 className="font-serif text-3xl font-bold text-maroon-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg text-maroon-900 mb-3">
                How do I create an account?
              </h3>
              <p className="text-gray-700">
                Visit our registration page and fill in your basic details. You'll receive an OTP on your email to verify your account.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-maroon-900 mb-3">
                Is my information safe?
              </h3>
              <p className="text-gray-700">
                Yes! We use industry-leading encryption and security measures to protect your personal information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-maroon-900 mb-3">
                What is the verification process?
              </h3>
              <p className="text-gray-700">
                Every profile is manually verified by our team to ensure authenticity and safety for all members.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-maroon-900 mb-3">
                How do premium memberships work?
              </h3>
              <p className="text-gray-700">
                Premium memberships unlock advanced search features, unlimited interests, and priority support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
