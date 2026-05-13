import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gold-200 bg-maroon-900 text-white">
      <div className="container max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-maroon-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-serif text-xl font-bold text-gold-300">Chettiar</div>
              <div className="text-[9px] uppercase tracking-[0.15em] text-gold-200">
                Connect
              </div>
            </div>
          </Link>
          <p className="text-sm text-gray-300 italic">
            Connecting Chettiar families worldwide through matrimony and community networking.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-serif text-lg font-bold mb-4 text-gold-300">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link
                to="/"
                className="hover:text-gold-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="hover:text-gold-300 transition-colors"
              >
                Browse Profiles
              </Link>
            </li>
            <li>
              <Link
                to="/sangam-directory"
                className="hover:text-gold-300 transition-colors"
              >
                Sangam Directory
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-lg font-bold mb-4 text-gold-300">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 text-gold-400" />
              <a href="tel:+918888888888" className="hover:text-gold-300">
                +91 88888 88888
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-gold-400" />
              <a
                href="mailto:info@chettiarconnect.com"
                className="hover:text-gold-300"
              >
                info@chettiarconnect.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-gold-400" />
              <span>Chennai, Tamil Nadu, India</span>
            </li>
          </ul>
        </div>

        {/* Social & Hours */}
        <div>
          <h4 className="font-serif text-lg font-bold mb-4 text-gold-300">
            Follow
          </h4>
          <div className="flex gap-3 mb-6">
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center hover:bg-gold-400 transition-all"
            >
              <Instagram className="w-4 h-4 text-maroon-900" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center hover:bg-gold-400 transition-all"
            >
              <Facebook className="w-4 h-4 text-maroon-900" />
            </a>
          </div>
          <p className="text-xs text-gray-400">
            Available 24/7 for your queries
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold-700 py-6">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
            <p>
              © {new Date().getFullYear()} Chettiar Connect. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gold-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gold-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gold-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
