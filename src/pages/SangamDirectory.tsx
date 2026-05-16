import { useState, useEffect } from 'react';
import { Phone, MapPin, Briefcase, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { communityMembersService } from '../services/supabase';
import { CITIES } from '../constants';

interface CommunityMember {
  id: string;
  name: string;
  city: string;
  district: string;
  phone: string;
  profession: string;
  created_at: string;
}

interface RegistrationForm {
  name: string;
  city: string;
  district: string;
  phone: string;
  profession: string;
}

interface FormErrors {
  [key: string]: string;
}

const DISTRICTS = ['Thanjavur', 'Tiruchirapalli', 'Salem', 'Coimbatore', 'Erode', 'Tiruppur', 'Madurai', 'Dindigul', 'Virudhunagar', 'Tuticorin', 'Tirunelveli', 'Kanyakumari', 'Villupuram', 'Vellore', 'Ranipet', 'Krishnagiri', 'Dharmapuri', 'Chengalpattu', 'Kanchipuram', 'Tiruvallur', 'Chennai'];

export default function SangamDirectory() {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    district: '',
  });
  const [formData, setFormData] = useState<RegistrationForm>({
    name: '',
    city: '',
    district: '',
    phone: '',
    profession: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    fetchMembers();
  }, [filters]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await communityMembersService.searchMembers(filters);
      if (!error && data) {
        setMembers(data || []);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.district) errors.district = 'District is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone must be 10 digits';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setRegistrationLoading(true);

      const { data, error } = await communityMembersService.createMember(formData);

      if (error) {
        setFormErrors({ submit: error.message || 'Failed to register' });
      } else {
        setSuccessMessage('Successfully registered in community directory!');
        setFormData({
          name: '',
          city: '',
          district: '',
          phone: '',
          profession: '',
        });
        setFormErrors({});

        // Refresh members
        await fetchMembers();

        setTimeout(() => {
          setShowRegistrationModal(false);
          setSuccessMessage('');
        }, 2000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setFormErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setRegistrationLoading(false);
    }
  };

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Register Your Details</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="p-1 hover:bg-white/20 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {successMessage && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 font-semibold">{successMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Select city</option>
                    {CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {formErrors.city && <p className="text-red-600 text-xs mt-1">{formErrors.city}</p>}
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    District *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Select district</option>
                    {DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                  {formErrors.district && <p className="text-red-600 text-xs mt-1">{formErrors.district}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {formErrors.phone && <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>}
                </div>

                {/* Profession */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profession
                  </label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="Your profession"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {formErrors.submit && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-800 text-sm">{formErrors.submit}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    disabled={registrationLoading}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold disabled:opacity-50"
                  >
                    {registrationLoading ? 'Registering...' : 'Register'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-10">
        <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold font-serif mb-2">Community Directory</h1>
            <p className="text-white/90">Connect with community members</p>
          </div>
          <button
            onClick={() => setShowRegistrationModal(true)}
            className="bg-white text-yellow-600 font-bold px-6 py-3 rounded-lg hover:bg-yellow-50 shadow-lg"
          >
            Register Your Details
          </button>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Filters</h3>

              {/* City Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">All Cities</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* District Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">District</label>
                <select
                  value={filters.district}
                  onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">All Districts</option>
                  {DISTRICTS.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setFilters({ city: '', district: '' })}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Directory Cards */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Loading directory...</p>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No members found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border-l-4 border-yellow-500"
                  >
                    {/* Member Info */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {member.name}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold">{member.city}, {member.district}</span>
                      </div>

                      {/* Profession */}
                      {member.profession && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Briefcase className="w-5 h-5 text-yellow-600" />
                          <span>{member.profession}</span>
                        </div>
                      )}

                      {/* Phone */}
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-5 h-5 text-yellow-600" />
                        <span className="font-mono">{member.phone}</span>
                      </div>
                    </div>

                    {/* Call Button */}
                    <button
                      onClick={() => handleCallClick(member.phone)}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
