import { useState, useEffect } from 'react';
import PackageCard from '../components/PackageCard';
import { supabase } from '../lib/supabase';
import type { Package } from '../lib/supabase';

const Packages = () => {
  const [dbPackages, setDbPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [packageImages, setPackageImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const featuredSlugs = [
        'azmat-umrah',
        'rehmat-umrah',
        'khidmat-umrah',
        'ajmer-sharif',
        'char-dham-yatra',
        'rajasthan-royalty',
        'kashmir-heaven',
        'manali-mountains',
        'kerala-tranquility',
        'dubai-extravaganza',
        'azerbaijan-discovery',
        'thailand-romance'
      ];

      // Fetch all packages for image mapping
      const { data: allPackages, error: allError } = await supabase
        .from('packages')
        .select('*');

      if (allError) throw allError;

      // Get featured packages
      const orderedData = featuredSlugs
        .map(slug => allPackages?.find(pkg => pkg.slug === slug))
        .filter((pkg): pkg is Package => pkg !== undefined);

      setDbPackages(orderedData);

      // Create image map from ALL packages
      const imageMap: Record<string, string> = {};
      allPackages?.forEach((pkg: Package) => {
        if (pkg.image_url) {
          imageMap[pkg.name] = `${pkg.image_url}?t=${pkg.updated_at}`;
        }
      });
      setPackageImages(imageMap);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };
  const packageCategories = {
    'Umrah Packages': [
      {
        name: 'Azmat Umrah',
        category: 'Umrah',
        duration: '15 Days / 14 Nights - 7N Makkah, 7N Madina',
        price: 'Starting From 94,500/-',
        highlights: ['Flights', 'Accommodation', 'Meals', 'Visa', 'Ziarat', 'All sightseeing', 'All transfers']
      },
      {
        name: 'Rehmat Umrah',
        category: 'Umrah',
        duration: '15 Days / 14 Nights - 9N Makkah, 5N Madina',
        price: 'Starting From 86,500/-',
        highlights: ['Flights', 'Accommodation', 'Meals', 'Visa', 'Ziarat', 'All sightseeing', 'All transfers']
      },
      {
        name: 'Khidmat Umrah',
        category: 'Umrah',
        duration: '15 Days / 14 Nights - 9N Makkah, 5N Madina',
        price: 'Starting From 75,000/-',
        highlights: ['Flights', 'Accommodation', 'Meals', 'Visa', 'Ziarat', 'All sightseeing', 'All transfers']
      }
    ],
    'Family Packages': [
      {
        name: 'Mesmerizing Kashmir',
        category: 'Family',
        duration: '5 Nights / 6 Days - Pahalgam (2) – Gulmarg (1) – Srinagar (2)',
        price: 'Starting From 19,500/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      },
      {
        name: 'Magnificent Kerala',
        category: 'Family',
        duration: '7 Nights / 8 Days - Munnar (2) – Thekkady (1) – Alleppey (1) – Kovalam (2) – Cochin (1)',
        price: 'Starting From 32,666/-',
        highlights: ['Accommodation', 'Meals', 'All sightseeing', 'Transportation', 'Houseboat (Alleppey)']
      },
      {
        name: 'Dubai Extravaganza',
        category: 'Family',
        duration: '4 Nights / 5 Days - Dubai (2N) – Ras Al Khaimah (2N)',
        price: 'Starting From 32,990/-',
        highlights: ['Accommodation', 'Breakfast', 'All sightseeing', 'Desert Safari', 'Cruise Dinner', 'Transportation']
      },
      {
        name: 'Azerbaijan Tour',
        category: 'Family',
        duration: '5 Nights / 6 Days - Shahdag – Gabala – Baku',
        price: 'Starting From 45,000/-',
        highlights: ['English speaking driver', 'Breakfast', 'Transportation', 'All sightseeing', 'Tickets (Fire Temple, Burning Mountain, Gobustan Museum, Mud Volcano taxi, Cable cars)']
      },
      {
        name: 'Best of Thailand',
        category: 'Family',
        duration: '5 Nights / 6 Days - Phuket (2) – Krabi (2) – Bangkok (1)',
        price: 'Starting From 29,990/-',
        highlights: ['Accommodation', 'Breakfast', 'Bangkok temple tour', 'All sightseeing']
      },
      {
        name: 'Essential Thailand',
        category: 'Family',
        duration: '4 Nights / 5 Days - Pattaya (2) – Bangkok (2)',
        price: 'Starting From 18,990/-',
        highlights: ['Accommodation', 'Breakfast', 'Bangkok temple tour', 'All sightseeing', 'Transportation']
      },
      {
        name: 'Highlights of Turkey',
        category: 'Family',
        duration: '7 Nights / 8 Days - Istanbul (2) – Cappadocia (2) – Kusadasi (3)',
        price: 'Starting From 1,18,880/-',
        highlights: ['Accommodation', 'Breakfast + Lunch', 'All sightseeing', 'Transportation']
      },
      {
        name: 'Turkey Delight',
        category: 'Family',
        duration: '7 Nights / 8 Days - Istanbul (2) – Cappadocia (2) – Antalya (2)',
        price: 'Starting From 1,08,990/-',
        highlights: ['Accommodation', 'Breakfast + Lunch', 'All sightseeing', 'Transportation']
      },
      {
        name: 'Forts & Palaces of Rajasthan',
        category: 'Family',
        duration: 'Jaipur – Ranthambore – Udaipur – Jodhpur – Jaisalmer',
        price: 'Starting From 36,990/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      },
      {
        name: 'Grand Himachal with Amritsar',
        category: 'Family',
        duration: '11 Nights / 12 Days - Shimla (2) – Manali (3) – Dharamshala (2) – Dalhousie (2) – Amritsar (2)',
        price: 'Starting From 51,440/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      },
      {
        name: 'Ultimate Bali',
        category: 'Family',
        duration: '7 Nights / 8 Days - Kuta (3) – Gili Island (2) – Ubud (2)',
        price: 'Starting From 48,990/-',
        highlights: ['Accommodation', 'Breakfast', 'All sightseeing', 'Transportation']
      },
      {
        name: 'Hill & Lakes Trails',
        category: 'Family',
        duration: 'Mount Abu – Udaipur',
        price: 'Starting From 13,800/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      }
    ],
    'Honeymoon Packages': [
      {
        name: 'Bali Delight',
        category: 'Honeymoon',
        duration: '4 Nights / 5 Days - Seminyak (4)',
        price: 'Starting From 22,990/-',
        highlights: ['Accommodation', 'Breakfast', 'All sightseeing', 'Transportation']
      },
      {
        name: 'Exclusive Thailand',
        category: 'Honeymoon',
        duration: '5 Nights / 6 Days - Phuket (3) – Bangkok (2)',
        price: 'Starting From 24,990/-',
        highlights: ['Accommodation', 'Breakfast', 'Bangkok temple tour', 'All sightseeing', 'Transportation']
      },
      {
        name: 'Highlights of Vietnam',
        category: 'Honeymoon',
        duration: '6 Nights / 7 Days - Hanoi (2) – Ha Long Bay (1) – Ho Chi Minh (3)',
        price: 'Starting From 61,990/-',
        highlights: ['Accommodation', 'Breakfast', 'All sightseeing', 'Transportation']
      },
      {
        name: 'Da Nang & Hoi An',
        category: 'Honeymoon',
        duration: '3 Nights / 4 Days - Da Nang (2) – Hoi An (1)',
        price: 'Starting From 27,666/-',
        highlights: ['Accommodation', 'Breakfast', 'All sightseeing', 'Transportation']
      },
      {
        name: 'Dubai Luxury',
        category: 'Honeymoon',
        duration: '5 Nights / 6 Days - Dubai (4) – Yas Island (1)',
        price: 'Starting From 45,990/-',
        highlights: ['Accommodation', 'Breakfast', 'All sightseeing', 'Desert Safari', 'Cruise Dinner', 'Transportation']
      },
      {
        name: 'Kashmir Escape',
        category: 'Honeymoon',
        duration: '4 Nights / 5 Days - Srinagar (4)',
        price: 'Starting From 19,500/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      },
      {
        name: 'Seaside Kerala',
        category: 'Honeymoon',
        duration: '4 Nights / 5 Days - Cochin (1) – Alleppey (1) – Kovalam (2)',
        price: 'Starting From 21,999/-',
        highlights: ['Accommodation', 'Meals', 'All sightseeing', 'Transportation', 'Houseboat (Alleppey)']
      },
      {
        name: 'Thrilling Karnataka',
        category: 'Honeymoon',
        duration: '5 Nights / 6 Days - Coorg (3) – Mysore (2)',
        price: 'Starting From 29,990/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      },
      {
        name: 'Manali Getaway',
        category: 'Honeymoon',
        duration: '3 Nights / 4 Days - Manali (3)',
        price: 'Starting From 12,666/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      },
      {
        name: 'Incredible Goa',
        category: 'Honeymoon',
        duration: '3 Nights / 4 Days',
        price: 'Starting From 10,490/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      },
      {
        name: 'Wonders of Himachal',
        category: 'Honeymoon',
        duration: '5 Nights / 6 Days - Shimla (2) – Manali (3)',
        price: 'Starting From 23,990/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      }
    ],
    'Religious Travel Packages': [
      {
        name: 'Char Dham Yatra',
        category: 'Religious',
        duration: '10 Nights / 11 Days - Haridwar – Barkot – Uttarkashi – Guptkashi – Badrinath – Rudraprayag – Haridwar',
        price: 'Starting From 85,000/-',
        highlights: ['Accommodation', 'All sightseeing', 'Breakfast + Dinner', 'Transportation', 'Helicopter service to Kedarnath']
      },
      {
        name: 'Golden Triangle Tour',
        category: 'Religious',
        duration: '2N Delhi – 1N Agra – 3N Jaipur / Ajmer Sharif Dargah',
        price: 'Starting From 25,874/-',
        highlights: ['Breakfast + Dinner', 'All sightseeing', 'Transportation', 'Accommodation', 'Tour guide']
      }
    ]
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Holiday Packages</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Choose from our curated categories of travel. Each package is designed with your convenience and comfort in mind.
          </p>
        </div>
      </section>

      {/* Custom Uploaded Packages */}
      {!loading && dbPackages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {dbPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  name={pkg.name}
                  category="Featured"
                  duration={pkg.duration || 'Varies'}
                  price={pkg.price || 'On Request'}
                  highlights={Array.isArray(pkg.highlights) ? pkg.highlights : (pkg.description ? [pkg.description] : [])}
                  customImage={pkg.image_url || undefined}
                  updatedAt={pkg.updated_at}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(packageCategories).map(([category, packages], categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {packages.map((pkg, index) => (
                  <PackageCard
                    key={index}
                    {...pkg}
                    customImage={packageImages[pkg.name]}
                  />
                ))}
              </div>
              {categoryIndex < Object.entries(packageCategories).length - 1 && (
                <hr className="my-16 border-gray-200" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Book Your Dream Package?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Get in touch with us for detailed information and personalized quotes for any package.
          </p>
          <a
            href="/contact"
            className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-200 inline-block shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contact Us Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Packages;