import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Users, Heart, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { matrimonyService } from '../services/supabase';
import { CITIES, PROFESSIONS, EDUCATION_LEVELS } from '../constants';
import { calculateAge } from '../utils/helpers';

interface MatrimonyProfile {
  id: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  city: string;
  profession: string;
  education: string;
  profile_photo_url?: string;
  is_premium: boolean;
  verified: boolean;
}

export default function BrowseProfiles() {
  const [profiles, setProfiles] = useState<MatrimonyProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: '',
    city: '',
    profession: '',
    education: '',
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const { data, error } = await matrimonyService.searchProfiles(filters);
        if (!error) {
          setProfiles(data || []);
        }
      } catch (err) {
        console.error('Error fetching profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-gold-600 to-maroon-600 text-white py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold font-serif mb-2">Browse Matrimony Profiles</h1>
          <p className="text-gold-50">Find your perfect match among verified profiles</p>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-4">
              <h3 className="text-xl font-bold text-maroon-900 mb-6 font-serif">Filters</h3>

              {/* Gender Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Genders</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              {/* City Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Cities</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Profession Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Profession</label>
                <select
                  value={filters.profession}
                  onChange={(e) => setFilters({ ...filters, profession: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Professions</option>
                  {PROFESSIONS.map(prof => (
                    <option key={prof} value={prof}>{prof}</option>
                  ))}
                </select>
              </div>

              {/* Education Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Education</label>
                <select
                  value={filters.education}
                  onChange={(e) => setFilters({ ...filters, education: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Education</option>
                  {EDUCATION_LEVELS.map(edu => (
                    <option key={edu} value={edu}>{edu}</option>
                  ))}
                </select>
              </div>

              <Button className="w-full bg-maroon-600 hover:bg-maroon-700">
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Profiles Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading profiles...</p>
              </div>
            ) : profiles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No profiles found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group"
                  >
                    {/* Image */}
                    <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                      {profile.profile_photo_url ? (
                        <img
                          src={profile.profile_photo_url}
                          alt={profile.full_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold-100 to-maroon-100">
                          <Users className="w-16 h-16 text-gray-300" />
                        </div>
                      )}

                      {/* Premium Badge */}
                      {profile.is_premium && (
                        <div className="absolute top-3 right-3 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          ⭐ Premium
                        </div>
                      )}

                      {/* Verification Badge */}
                      {profile.verified && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white p-1 rounded-full">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-maroon-900 mb-1">
                        {profile.full_name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {calculateAge(profile.date_of_birth)} years old
                      </p>

                      {/* Details */}
                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-gold-500" />
                          {profile.city}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 text-gold-500" />
                          {profile.profession}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Search className="w-4 h-4 text-gold-500" />
                          {profile.education}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-maroon-600 hover:bg-maroon-700">
                          <Heart className="w-4 h-4 mr-2" />
                          Interest
                        </Button>
                        <Button className="flex-1" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
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
