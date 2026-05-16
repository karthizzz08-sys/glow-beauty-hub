import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Heart, Users, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Protect route: redirect to login if not authenticated
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/home', { replace: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!user) {
    return null; // Show nothing while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-maroon-900 font-serif mb-2">
                Welcome back, {user.full_name}!
              </h1>
              <p className="text-gray-600">
                Email: <span className="font-semibold">{user.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Browse Matrimony */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="text-lg font-bold text-maroon-900 mb-2">Browse Profiles</h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore matrimony profiles and find your match
            </p>
            <button
              onClick={() => navigate('/browse')}
              className="w-full px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-lg transition"
            >
              Browse Now
            </button>
          </div>

          {/* Sangam Directory */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-maroon-900 mb-2">Community Directory</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect with community members and professionals
            </p>
            <button
              onClick={() => navigate('/sangam-directory')}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            >
              Explore Directory
            </button>
          </div>

          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-maroon-900 mb-2">Edit Profile</h3>
            <p className="text-gray-600 text-sm mb-4">
              Update your profile information and preferences
            </p>
            <button
              onClick={() => navigate('/profile/edit')}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-maroon-900 mb-4">Profile Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Account Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  {user.verified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-gray-700">User Type:</span>
                <span className="font-semibold capitalize">{user.user_type}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-gray-700">Member Since:</span>
                <span className="font-semibold">
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-maroon-900 mb-4">Next Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-gold-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Profile Created</p>
                  <p className="text-sm text-gray-600">Your account is ready to use</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Add Profile Photo</p>
                  <p className="text-sm text-gray-600">Upload a professional photo to attract matches</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Browse & Connect</p>
                  <p className="text-sm text-gray-600">Start exploring and sending interest to matches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
