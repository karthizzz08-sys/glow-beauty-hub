import { Heart, Shield, Users, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: 'Trust & Authenticity',
      description: 'Every profile is verified and authentic, ensuring genuine connections.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your personal information is protected with industry-leading encryption.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We celebrate Chettiar heritage and bring the community together.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Modern technology meets traditional values in our platform.'
    }
  ];

  const stats = [
    { num: '10K+', label: 'Verified Members' },
    { num: '5K+', label: 'Successful Matches' },
    { num: '50+', label: 'Cities Connected' },
    { num: '100%', label: 'Secure & Safe' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-maroon-900 mb-6">
            About Chettiar Connect
          </h1>
          <p className="text-xl text-gray-700 mb-4 leading-relaxed">
            Chettiar Connect is a premium matrimony platform and community directory designed exclusively for the Chettiar community.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We blend modern technology with traditional values, creating meaningful connections that celebrate our heritage and strengthen our bonds.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-12 border-l-4 border-gold-600">
          <h2 className="font-serif text-3xl font-bold text-maroon-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            To empower the Chettiar community by creating a safe, verified, and trusted platform where meaningful relationships are formed. We honor our traditions while embracing modern connectivity, enabling our community to thrive both personally and professionally.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether seeking a life partner or expanding your professional network, Chettiar Connect is your gateway to authentic connections.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-maroon-50 to-gold-50">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-maroon-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-maroon-600 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-maroon-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 container max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="font-serif text-4xl font-bold text-gold-600 mb-2">
                {stat.num}
              </p>
              <p className="text-gray-700 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-maroon-900 text-center mb-12">
            Why Choose Chettiar Connect?
          </h2>
          <div className="space-y-6 text-gray-700">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-2">
                  Verified & Authentic Profiles
                </h3>
                <p>
                  Every member is thoroughly verified to ensure authenticity and safety.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-2">
                  Community Focused
                </h3>
                <p>
                  Built exclusively for the Chettiar community, celebrating our unique heritage and traditions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-2">
                  Advanced Search & Matching
                </h3>
                <p>
                  Sophisticated algorithms help you find compatible matches based on your preferences.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-2">
                  Premium Support
                </h3>
                <p>
                  Dedicated support team to help you navigate your journey on Chettiar Connect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-maroon-600">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">
            Ready to Connect?
          </h2>
          <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of verified members from the Chettiar community and find meaningful connections.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate('/register')}
              className="bg-white text-maroon-600 hover:bg-gold-50 font-semibold px-8 py-3"
              size="lg"
            >
              Get Started Today
            </Button>
            <Button
              onClick={() => navigate('/browse')}
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
              size="lg"
            >
              Browse Profiles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
