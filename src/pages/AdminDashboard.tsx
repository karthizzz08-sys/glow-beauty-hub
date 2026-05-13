import { useState, useEffect } from 'react';
import { Users, Heart, Home, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { adminService } from '../services/supabase';

interface DashboardStats {
  totalUsers: number;
  matrimonyProfiles: number;
  sangamDirectories: number;
  premiumMembers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    matrimonyProfiles: 0,
    sangamDirectories: 0,
    premiumMembers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-maroon-900 font-serif">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform, users, and content</p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {['overview', 'profiles', 'users', 'subscriptions'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold capitalize border-b-2 transition ${
                activeTab === tab
                  ? 'border-maroon-600 text-maroon-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {loading ? (
              <p className="text-center text-gray-500 py-12">Loading statistics...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Users</p>
                      <p className="text-3xl font-bold text-maroon-900">
                        {stats.totalUsers.toLocaleString()}
                      </p>
                    </div>
                    <Users className="w-12 h-12 text-gold-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Active members on platform</p>
                </div>

                {/* Matrimony Profiles */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Matrimony Profiles</p>
                      <p className="text-3xl font-bold text-maroon-900">
                        {stats.matrimonyProfiles.toLocaleString()}
                      </p>
                    </div>
                    <Heart className="w-12 h-12 text-red-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Registered matrimony members</p>
                </div>

                {/* Sangam Directory */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Sangam Entries</p>
                      <p className="text-3xl font-bold text-maroon-900">
                        {stats.sangamDirectories.toLocaleString()}
                      </p>
                    </div>
                    <Home className="w-12 h-12 text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Community directory entries</p>
                </div>

                {/* Premium Members */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Premium Members</p>
                      <p className="text-3xl font-bold text-maroon-900">
                        {stats.premiumMembers.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-12 h-12 text-green-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Active subscriptions</p>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-maroon-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-maroon-600 hover:bg-maroon-700 justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Profiles
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Review Flagged Accounts
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Subscriptions
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-maroon-900 mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Database Status</span>
                    <span className="text-green-600 font-semibold">✓ Healthy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">API Performance</span>
                    <span className="text-green-600 font-semibold">✓ Optimal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Storage Usage</span>
                    <span className="text-blue-600 font-semibold">45% used</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profiles Tab */}
        {activeTab === 'profiles' && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-maroon-900 mb-6">Manage Profiles</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">Sample Profile</td>
                  <td className="px-6 py-4">Matrimony</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Reject
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-maroon-900 mb-6">Manage Users</h3>
            <p className="text-gray-600">User management interface</p>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold text-maroon-900 mb-6">Manage Subscriptions</h3>
            <p className="text-gray-600">Subscription management interface</p>
          </div>
        )}
      </div>
    </div>
  );
}
