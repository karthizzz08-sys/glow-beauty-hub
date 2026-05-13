import { useState, useEffect } from 'react';
import { Phone, MapPin, Briefcase, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { sangamDirectoryService } from '../services/supabase';
import { CITIES, DISTRICTS, FUNCTION_TYPES } from '../constants';

interface DirectoryEntry {
  id: string;
  name: string;
  family_name: string;
  phone_number: string;
  whatsapp_number: string;
  city: string;
  district: string;
  profession: string;
  photo_url?: string;
  function_types: string[];
  description: string;
}

const DISTRICTS = ['Chennai', 'Thiruvallur', 'Kanchipuram', 'Ranipet', 'Vellore', 'Tiruppur', 'Erode'];

export default function SangamDirectory() {
  const [entries, setEntries] = useState<DirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    district: '',
    profession: '',
  });

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const { data, error } = await sangamDirectoryService.searchEntries(filters);
        if (!error) {
          setEntries(data || []);
        }
      } catch (err) {
        console.error('Error fetching directory entries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [filters]);

  const handleWhatsAppClick = (phone: string) => {
    const message = 'Hello! I found you on Chettiar Connect Sangam Directory.';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-maroon-600 to-gold-600 text-white py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold font-serif mb-2">Sangam Community Directory</h1>
          <p className="text-maroon-50">Connect with Chettiar families worldwide</p>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-4">
              <h3 className="text-xl font-bold text-maroon-900 mb-6 font-serif">Search</h3>

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

              {/* District Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">District</label>
                <select
                  value={filters.district}
                  onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Districts</option>
                  {DISTRICTS.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              {/* Profession Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Profession</label>
                <input
                  type="text"
                  value={filters.profession}
                  onChange={(e) => setFilters({ ...filters, profession: e.target.value })}
                  placeholder="Search profession..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <Button className="w-full bg-maroon-600 hover:bg-maroon-700">
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Directory Entries */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading directory...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No entries found matching your search</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Photo */}
                      <div className="md:col-span-1">
                        <div className="aspect-square rounded-lg bg-gradient-to-br from-gold-100 to-maroon-100 flex items-center justify-center overflow-hidden">
                          {entry.photo_url ? (
                            <img
                              src={entry.photo_url}
                              alt={entry.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-4xl">👤</div>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="md:col-span-2 space-y-3">
                        <div>
                          <h3 className="text-2xl font-bold text-maroon-900">
                            {entry.name}
                          </h3>
                          <p className="text-gray-600">
                            {entry.family_name && `Family: ${entry.family_name}`}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="w-4 h-4 text-gold-500" />
                            <span>{entry.city}, {entry.district}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Briefcase className="w-4 h-4 text-gold-500" />
                            <span>{entry.profession || 'Not specified'}</span>
                          </div>
                        </div>

                        {entry.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {entry.description}
                          </p>
                        )}

                        {/* Function Types */}
                        {entry.function_types && entry.function_types.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {entry.function_types.map(func => (
                              <span
                                key={func}
                                className="px-2 py-1 bg-maroon-100 text-maroon-700 text-xs rounded-full"
                              >
                                {func}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Contact Actions */}
                      <div className="md:col-span-1 flex flex-col gap-3">
                        <Button
                          onClick={() => handleCallClick(entry.phone_number)}
                          className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </Button>
                        {entry.whatsapp_number && (
                          <Button
                            onClick={() => handleWhatsAppClick(entry.whatsapp_number)}
                            className="w-full bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Entry CTA */}
        <div className="mt-16 bg-gradient-to-r from-gold-100 to-maroon-100 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-maroon-900 mb-3">Add Your Entry</h3>
          <p className="text-gray-700 mb-6">
            Register your family in the Sangam Directory and connect with community members worldwide.
          </p>
          <Button className="bg-maroon-600 hover:bg-maroon-700">
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
}
