import { useNavigate } from 'react-router-dom';
import { Heart, Users, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gold-600 via-maroon-500 to-maroon-700 py-20 overflow-hidden">
        {/* Luxury background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-slide-in-left">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight font-serif">
                Find Your Perfect Match
              </h1>
              <p className="text-xl text-gold-50">
                Welcome to Chettiar Connect - Your premier matrimony and community networking platform
              </p>
              <p className="text-lg text-gold-100">
                Connecting Chettiar families across the globe with premium matrimony services and community networking.
              </p>
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-gold-400 hover:bg-gold-500 text-maroon-900 font-semibold px-8 py-6 text-lg luxury-hover"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => navigate('/browse')}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-maroon-700 px-8 py-6 text-lg luxury-hover"
                >
                  Browse Profiles
                </Button>
              </div>
            </div>

            {/* Luxury Photo - Beautiful couple/wedding image visualization */}
            <div className="relative hidden md:block animate-slide-in-right">
              <div className="hero-image-container">
                {/* Luxury gradient frame */}
                <div className="w-full aspect-square bg-gradient-to-br from-gold-200 via-maroon-100 to-gold-100 rounded-2xl shadow-2xl overflow-hidden border-2 border-gold-300 relative">
                  {/* SVG Luxury visual - representing elegant couple */}
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Background gradient */}
                    <defs>
                      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#faf5ed', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#f0dcc4', stopOpacity: 1 }} />
                      </linearGradient>
                      <radialGradient id="glowGradient" cx="50%" cy="40%">
                        <stop offset="0%" style={{ stopColor: '#f5ebdb', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#c89456', stopOpacity: 0.2 }} />
                      </radialGradient>
                    </defs>

                    {/* Base */}
                    <rect width="400" height="400" fill="url(#heroGradient)" />

                    {/* Luxury frame */}
                    <circle cx="200" cy="200" r="160" fill="none" stroke="url(#glowGradient)" strokeWidth="3" opacity="0.6" />

                    {/* Decorative elements - gold accents */}
                    <circle cx="60" cy="60" r="8" fill="#c89456" opacity="0.6" />
                    <circle cx="340" cy="60" r="8" fill="#c89456" opacity="0.6" />
                    <circle cx="60" cy="340" r="8" fill="#c89456" opacity="0.6" />
                    <circle cx="340" cy="340" r="8" fill="#c89456" opacity="0.6" />

                    {/* Center heart with glow */}
                    <g transform="translate(200, 200)">
                      <circle cx="0" cy="0" r="90" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.3" />
                      <circle cx="0" cy="0" r="85" fill="none" stroke="#c89456" strokeWidth="1" opacity="0.2" />

                      {/* Luxury heart icon */}
                      <path d="M 0,-20 C -15,-35 -35,-35 -35,-15 C -35,5 -15,25 0,35 C 15,25 35,5 35,-15 C 35,-35 15,-35 0,-20" fill="#a53f3a" opacity="0.8" />

                      {/* Sparkle effects */}
                      <circle cx="-40" cy="-25" r="2" fill="#c89456" opacity="0.7" />
                      <circle cx="40" cy="-25" r="2" fill="#c89456" opacity="0.7" />
                      <circle cx="-30" cy="35" r="2" fill="#c89456" opacity="0.7" />
                      <circle cx="30" cy="35" r="2" fill="#c89456" opacity="0.7" />
                    </g>

                    {/* Decorative lines */}
                    <line x1="100" y1="40" x2="120" y2="40" stroke="#c89456" strokeWidth="2" opacity="0.4" />
                    <line x1="280" y1="40" x2="300" y2="40" stroke="#c89456" strokeWidth="2" opacity="0.4" />
                    <line x1="100" y1="360" x2="120" y2="360" stroke="#c89456" strokeWidth="2" opacity="0.4" />
                    <line x1="280" y1="360" x2="300" y2="360" stroke="#c89456" strokeWidth="2" opacity="0.4" />
                  </svg>

                  {/* Sparkle animation overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-gold-400 opacity-50 animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-maroon-900 font-serif animate-fade-in-up">
            Why Choose Chettiar Connect?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="luxury-card p-8 rounded-lg shadow-md luxury-hover" style={{ animationDelay: '0.1s' }}>
              <Shield className="w-12 h-12 text-gold-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-maroon-900">100% Verified</h3>
              <p className="text-gray-600">
                All profiles are verified to ensure authenticity and safety in our community.
              </p>
            </div>

            <div className="luxury-card p-8 rounded-lg shadow-md luxury-hover" style={{ animationDelay: '0.2s' }}>
              <Zap className="w-12 h-12 text-gold-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-maroon-900">Advanced Search</h3>
              <p className="text-gray-600">
                Find your perfect match with advanced filters for location, profession, and interests.
              </p>
            </div>

            <div className="luxury-card p-8 rounded-lg shadow-md luxury-hover" style={{ animationDelay: '0.3s' }}>
              <Users className="w-12 h-12 text-gold-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-maroon-900">Community Network</h3>
              <p className="text-gray-600">
                Connect with Chettiar families worldwide for events, celebrations, and networking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Modules Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-maroon-900 font-serif animate-fade-in-up">
            Our Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Matrimony Card */}
            <div className="bg-gradient-to-br from-gold-50 to-white p-8 rounded-lg border-2 border-gold-200 hover:border-gold-400 transition cursor-pointer luxury-hover animate-scale-in"
              onClick={() => navigate('/browse')}>
              <Heart className="w-16 h-16 text-maroon-500 mb-4 animate-float" />
              <h3 className="text-3xl font-bold mb-3 text-maroon-900 font-serif">Matrimony</h3>
              <p className="text-gray-600 mb-6">
                Premium matrimony profiles for eligible bachelors and bachelorettes. Find your life partner with our advanced matching system.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>✓ Verified profiles</li>
                <li>✓ Horoscope upload</li>
                <li>✓ Multiple photo gallery</li>
                <li>✓ Interest requests & messaging</li>
              </ul>
              <Button className="w-full bg-maroon-600 hover:bg-maroon-700">
                Browse Profiles
              </Button>
            </div>

            {/* Sangam Directory Card */}
            <div className="bg-gradient-to-br from-maroon-50 to-white p-8 rounded-lg border-2 border-maroon-200 hover:border-maroon-400 transition cursor-pointer luxury-hover animate-scale-in"
              onClick={() => navigate('/sangam-directory')}>
              <Users className="w-16 h-16 text-gold-600 mb-4 animate-float" />
              <h3 className="text-3xl font-bold mb-3 text-maroon-900 font-serif">Sangam Directory</h3>
              <p className="text-gray-600 mb-6">
                Connect with Chettiar community members worldwide. Share your contact details for weddings, events, and networking.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>✓ Community listing</li>
                <li>✓ Search by city & district</li>
                <li>✓ WhatsApp integration</li>
                <li>✓ Event networking</li>
              </ul>
              <Button className="w-full bg-gold-600 hover:bg-gold-700">
                View Directory
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Profiles Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-maroon-900 font-serif animate-fade-in-up">
            Recently Joined Profiles
          </h2>
          <div className="text-center">
            <p className="text-gray-600 mb-8 animate-fade-in-up">Discover newly registered members in our community</p>
            <Button
              onClick={() => navigate('/browse')}
              className="bg-maroon-600 hover:bg-maroon-700 px-8 py-3 text-lg luxury-hover"
            >
              View All Profiles
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-maroon-700 to-gold-600 text-white py-20 relative overflow-hidden">
        {/* Luxury background effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 font-serif animate-fade-in-up">Ready to Find Your Match?</h2>
          <p className="text-xl mb-10 text-gold-50 animate-fade-in-up">
            Join thousands of Chettiar families already connected on our platform
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up">
            <Button
              onClick={() => navigate('/register')}
              className="bg-gold-400 hover:bg-gold-500 text-maroon-900 font-semibold px-8 py-3 text-lg luxury-hover"
            >
              Register Now
            </Button>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="border-gold-200 text-gold-50 hover:bg-gold-100 px-8 py-3 text-lg luxury-hover"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
