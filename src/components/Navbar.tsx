import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { id: 'home', to: '/', label: 'Home' },
  { id: 'browse', to: '/browse', label: 'Browse Profiles' },
  { id: 'sangam', to: '/sangam-directory', label: 'Sangam Directory' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/95 border-b border-gold-200">
      <div className="container max-w-6xl mx-auto px-4 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setOpen(false)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-maroon-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-xl font-bold text-maroon-900">Chettiar</div>
            <div className="text-[9px] uppercase tracking-[0.15em] text-gold-600 font-semibold">
              Connect
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium relative transition-colors hover:text-maroon-700',
                  isActive ? 'text-maroon-700' : 'text-gray-600'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-maroon-600 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-maroon-600 text-maroon-600 hover:bg-maroon-50"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-gold-500 to-maroon-600 text-white hover:from-gold-600 hover:to-maroon-700"
              >
                Register for Free
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gold-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="w-6 h-6 text-maroon-900" />
          ) : (
            <Menu className="w-6 h-6 text-maroon-900" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gold-200 bg-white animate-fade-in">
          <nav className="container max-w-6xl mx-auto px-4 flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    isActive
                      ? 'bg-gold-100 text-maroon-700'
                      : 'hover:bg-gold-50 text-gray-700'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile CTA */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gold-200">
              {user ? (
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate('/login');
                      setOpen(false);
                    }}
                    variant="outline"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setOpen(false);
                    }}
                    className="bg-gradient-to-r from-gold-500 to-maroon-600 text-white"
                  >
                    Register for Free
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
