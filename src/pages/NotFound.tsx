import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-maroon-50 flex items-center justify-center">
      <div className="text-center px-6 py-12 max-w-2xl mx-auto">
        <div className="mb-6">
          <p className="font-serif text-9xl font-bold text-maroon-900 mb-2">404</p>
          <p className="text-5xl font-serif text-gold-600 mb-4">Oops!</p>
        </div>

        <h1 className="font-serif text-4xl font-bold text-maroon-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg leading-relaxed">
          The page you're looking for seems to have wandered off. But don't worry, we'll help you find your way back to Chettiar Connect.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            asChild
            className="bg-gradient-to-r from-gold-600 to-maroon-600 text-white hover:from-gold-700 hover:to-maroon-700"
            size="lg"
          >
            <Link className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-maroon-600 text-maroon-600 hover:bg-maroon-50"
            size="lg"
          >
            <Link to="/browse">Browse Profiles</Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg border border-gold-200 shadow-md">
          <h3 className="font-semibold text-maroon-900 mb-3">Need Help?</h3>
          <p className="text-gray-600 text-sm">
            If you believe this is a mistake, please{' '}
            <a href="mailto:support@chettiarconnect.com" className="text-maroon-600 hover:underline font-semibold">
              contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
