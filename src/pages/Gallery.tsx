import { Heart, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SuccessStory {
  id: number;
  bride: string;
  groom: string;
  city: string;
  matchDate: string;
  weddingDate: string;
  story: string;
  photo: string;
}

const stories: SuccessStory[] = [
  {
    id: 1,
    bride: 'Priya Chettiar',
    groom: 'Arun Chettiar',
    city: 'Chennai',
    matchDate: '2023-06',
    weddingDate: '2023-12',
    story: 'Met through Chettiar Connect and found the perfect match. We share the same values and traditions. It was love at first sight!',
    photo: '👰💍'
  },
  {
    id: 2,
    bride: 'Divya Chettiar',
    groom: 'Vikram Chettiar',
    city: 'Bangalore',
    matchDate: '2023-08',
    weddingDate: '2024-02',
    story: 'We couldn\'t believe how well-matched we were. Chettiar Connect truly understands our community and connected us perfectly.',
    photo: '💒❤️'
  },
  {
    id: 3,
    bride: 'Anjali Chettiar',
    groom: 'Karthik Chettiar',
    city: 'Mumbai',
    matchDate: '2023-09',
    weddingDate: '2024-03',
    story: 'Six months of chatting turned into a lifetime together. We\'re grateful to Chettiar Connect for bringing us together!',
    photo: '💕🎉'
  },
  {
    id: 4,
    bride: 'Raveena Chettiar',
    groom: 'Sanjay Chettiar',
    city: 'Delhi',
    matchDate: '2023-10',
    weddingDate: '2024-04',
    story: 'The community connection made all the difference. We understood each other\'s background and traditions immediately.',
    photo: '👫✨'
  },
  {
    id: 5,
    bride: 'Meera Chettiar',
    groom: 'Rohan Chettiar',
    city: 'Pune',
    matchDate: '2023-11',
    weddingDate: '2024-05',
    story: 'Best decision ever! The platform made finding someone compatible and verified so easy.',
    photo: '💑🌟'
  },
  {
    id: 6,
    bride: 'Sneha Chettiar',
    groom: 'Aman Chettiar',
    city: 'Hyderabad',
    matchDate: '2023-12',
    weddingDate: '2024-06',
    story: 'We bonded over shared interests and community values. Chettiar Connect helped us find our forever!',
    photo: '💍🎊'
  }
];

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 via-white to-maroon-50 py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-maroon-600" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-maroon-900 mb-4">
            Success Stories
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Real stories from our community members who found love and connection through Chettiar Connect.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gold-100 hover:border-gold-300"
            >
              {/* Photo Section */}
              <div className="bg-gradient-to-br from-gold-500 to-maroon-600 p-8 text-center text-6xl">
                {story.photo}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-serif text-xl font-bold text-maroon-900 mb-1">
                    {story.bride} & {story.groom}
                  </h3>
                  <p className="text-gold-600 font-semibold text-sm">{story.city}</p>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{story.story}</p>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    <span>Matched: {new Date(story.matchDate + '-01').toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-maroon-600" />
                    <span>Married: {new Date(story.weddingDate + '-01').toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-gold-600 text-gold-600 hover:bg-gold-50"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Read Full Story
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-maroon-600">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-white text-center">
            <div>
              <p className="font-serif text-5xl font-bold mb-2">5000+</p>
              <p className="text-gold-100">Successful Matches</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold mb-2">2000+</p>
              <p className="text-gold-100">Weddings Celebrated</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold mb-2">50+</p>
              <p className="text-gold-100">Cities Connected</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl font-bold text-maroon-900 mb-6">
          Ready to Write Your Success Story?
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Join thousands of verified members and find your perfect match on Chettiar Connect.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-gold-600 to-maroon-600 text-white hover:from-gold-700 hover:to-maroon-700 font-semibold px-8 py-3"
            size="lg"
          >
            Get Started Today
          </Button>
          <Button
            onClick={() => navigate('/browse')}
            variant="outline"
            className="border-maroon-600 text-maroon-600 hover:bg-maroon-50 font-semibold px-8 py-3"
            size="lg"
          >
            Browse Profiles
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
