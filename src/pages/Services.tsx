import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Check, Heart, Users, Crown, Search, MapPin, MessageCircle } from 'lucide-react';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  cta: string;
  route: string;
  color: string;
}

const services: Service[] = [
  {
    id: 1,
    icon: <Heart className="w-8 h-8" />,
    title: 'Premium Matrimony',
    description: 'Find your perfect life partner from verified profiles across the Chettiar community.',
    features: [
      'Verified & authenticated profiles',
      'Advanced search filters',
      'Interest request system',
      'View & shortlist profiles',
      '24/7 customer support'
    ],
    cta: 'Browse Profiles',
    route: '/browse',
    color: 'from-maroon-600 to-red-600'
  },
  {
    id: 2,
    icon: <Users className="w-8 h-8" />,
    title: 'Sangam Community Directory',
    description: 'Connect with your community for networking, events, and professional opportunities.',
    features: [
      'Community member directory',
      'Search by location & profession',
      'Event information',
      'Direct WhatsApp contact',
      'Community network expansion'
    ],
    cta: 'Explore Directory',
    route: '/sangam-directory',
    color: 'from-gold-600 to-orange-600'
  },
  {
    id: 3,
    icon: <Crown className="w-8 h-8" />,
    title: 'Premium Membership',
    description: 'Unlock exclusive features for faster matches and priority support.',
    features: [
      'Unlimited interests',
      'Advanced search',
      'Priority support',
      'Featured profile badge',
      'View who liked you'
    ],
    cta: 'View Plans',
    route: '/membership',
    color: 'from-yellow-600 to-gold-600'
  }
];

const tiers = [
  {
    name: 'Basic',
    price: '₹2,999',
    duration: '3 months',
    description: 'Perfect for getting started',
    features: [
      'Basic profile visibility',
      'Send interests (5 per day)',
      'View profile views',
      'Email support',
      'Standard search'
    ],
    highlighted: false
  },
  {
    name: 'Premium',
    price: '₹5,999',
    duration: '6 months',
    description: 'Most popular choice',
    features: [
      'Enhanced profile visibility',
      'Unlimited interests',
      'Advanced search filters',
      'Priority email support',
      'Featured profile option',
      'Monthly profile refresh'
    ],
    highlighted: true
  },
  {
    name: 'Platinum',
    price: '₹9,999',
    duration: '12 months',
    description: 'Maximum reach & support',
    features: [
      'Premium profile visibility',
      'Unlimited interests',
      'All advanced filters',
      '24/7 phone support',
      'Featured profile (12 months)',
      'Monthly profile refresh',
      'Dedicated relationship manager'
    ],
    highlighted: false
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-maroon-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Chettiar Connect offers comprehensive solutions for connecting with your community and finding your life partner.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="p-8 border border-gold-200 hover:border-gold-400 transition-all hover:shadow-lg"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} text-white flex items-center justify-center mb-6`}>
                {service.icon}
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-2xl font-bold text-maroon-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={() => navigate(service.route)}
                className={`w-full bg-gradient-to-r ${service.color} text-white hover:shadow-lg`}
              >
                {service.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gradient-to-br from-maroon-50 to-gold-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-maroon-900 text-center mb-12">
            Membership Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => (
              <Card
                key={idx}
                className={`p-8 border-2 transition-all ${
                  tier.highlighted
                    ? 'border-gold-600 bg-white shadow-lg scale-105'
                    : 'border-gold-200 hover:border-gold-400'
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-gradient-to-r from-gold-600 to-maroon-600 text-white py-2 px-4 rounded-full inline-block mb-4 text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <h3 className="font-serif text-2xl font-bold text-maroon-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gold-600 font-semibold mb-4">{tier.description}</p>

                <div className="mb-6">
                  <p className="font-serif text-4xl font-bold text-maroon-900">
                    {tier.price}
                  </p>
                  <p className="text-gray-600 text-sm">{tier.duration}</p>
                </div>

                <Button
                  onClick={() => navigate('/browse')}
                  className={`w-full mb-8 ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-gold-600 to-maroon-600 text-white'
                      : 'border-maroon-600 text-maroon-600 hover:bg-maroon-50'
                  }`}
                  variant={tier.highlighted ? 'default' : 'outline'}
                >
                  Get Started
                </Button>

                <ul className="space-y-3">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Chettiar Connect */}
      <section className="py-20 container max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-4xl font-bold text-maroon-900 text-center mb-12">
          Why Choose Chettiar Connect?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-1">
                  Verified Profiles
                </h3>
                <p className="text-gray-700">
                  Every member is manually verified to ensure authenticity and safety.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-1">
                  Community Focused
                </h3>
                <p className="text-gray-700">
                  Built exclusively for the Chettiar community.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-1">
                  Privacy Protected
                </h3>
                <p className="text-gray-700">
                  Your data is encrypted and never shared without consent.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-1">
                  Advanced Matching
                </h3>
                <p className="text-gray-700">
                  Smart algorithms help you find compatible matches.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-1">
                  Expert Support
                </h3>
                <p className="text-gray-700">
                  Dedicated support team for all your queries.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maroon-900 mb-1">
                  5000+ Success Stories
                </h3>
                <p className="text-gray-700">
                  Join thousands of happy couples from our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-maroon-600">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gold-100 text-lg mb-8">
            Join thousands of verified members from the Chettiar community today.
          </p>
          <Button
            onClick={() => navigate('/register')}
            className="bg-white text-maroon-600 hover:bg-gold-50 font-semibold px-8 py-3"
            size="lg"
          >
            Create Your Profile
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
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
