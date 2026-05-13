import { useNavigate } from 'react-router-dom';
import { Heart, Users, Home, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gold-600 via-maroon-500 to-maroon-700 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
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
                  className="bg-gold-400 hover:bg-gold-500 text-maroon-900 font-semibold px-8 py-6 text-lg"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => navigate('/browse')}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-maroon-700 px-8 py-6 text-lg"
                >
                  Browse Profiles
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="w-full aspect-square bg-gold-100 rounded-full flex items-center justify-center">
                <Heart className="w-32 h-32 text-maroon-500" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-maroon-900 font-serif">
            Why Choose Chettiar Connect?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <Shield className="w-12 h-12 text-gold-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-maroon-900">100% Verified</h3>
              <p className="text-gray-600">
                All profiles are verified to ensure authenticity and safety in our community.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <Zap className="w-12 h-12 text-gold-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-maroon-900">Advanced Search</h3>
              <p className="text-gray-600">
                Find your perfect match with advanced filters for location, profession, and interests.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
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
          <h2 className="text-4xl font-bold text-center mb-16 text-maroon-900 font-serif">
            Our Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Matrimony Card */}
            <div className="bg-gradient-to-br from-gold-50 to-white p-8 rounded-lg border-2 border-gold-200 hover:border-gold-400 transition cursor-pointer"
              onClick={() => navigate('/browse')}>
              <Heart className="w-16 h-16 text-maroon-500 mb-4" />
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
            <div className="bg-gradient-to-br from-maroon-50 to-white p-8 rounded-lg border-2 border-maroon-200 hover:border-maroon-400 transition cursor-pointer"
              onClick={() => navigate('/sangam-directory')}>
              <Users className="w-16 h-16 text-gold-600 mb-4" />
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
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-maroon-900 font-serif">
            Recently Joined Profiles
          </h2>
          <div className="text-center">
            <p className="text-gray-600 mb-8">Discover newly registered members in our community</p>
            <Button
              onClick={() => navigate('/browse')}
              className="bg-maroon-600 hover:bg-maroon-700 px-8 py-3 text-lg"
            >
              View All Profiles
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-maroon-700 to-gold-600 text-white py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 font-serif">Ready to Find Your Match?</h2>
          <p className="text-xl mb-10 text-gold-50">
            Join thousands of Chettiar families already connected on our platform
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate('/register')}
              className="bg-gold-400 hover:bg-gold-500 text-maroon-900 font-semibold px-8 py-3 text-lg"
            >
              Register Now
            </Button>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="border-gold-200 text-gold-50 hover:bg-gold-100 px-8 py-3 text-lg"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
