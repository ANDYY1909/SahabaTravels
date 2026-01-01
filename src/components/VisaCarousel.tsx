import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VisaCard from './VisaCard';

const VisaCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const visas = [
    { country: 'Dubai', countryCode: 'ae', price: '₹7,300' },
    { country: 'Singapore', countryCode: 'sg', price: '₹3,380' },
    { country: 'US', countryCode: 'us', price: '₹19,500' },
    { country: 'UK', countryCode: 'gb', price: '₹21,500' },
    { country: 'Schengen Visa', countryCode: 'eu', price: '₹17,500' },
    { country: 'Oman', countryCode: 'om', price: '₹6,500' },
    { country: 'Qatar', countryCode: 'qa', price: '₹3,500' },
    { country: 'Russia', countryCode: 'ru', price: '₹6,500' },
    { country: 'Turkey', countryCode: 'tr', price: '₹5,900' },
    { country: 'Georgia', countryCode: 'ge', price: '₹4,500' },
    { country: 'Azerbaijan', countryCode: 'az', price: '₹3,500' },
    { country: 'Bahrain', countryCode: 'bh', price: '₹3,800' },
    { country: 'Vietnam', countryCode: 'vn', price: '₹3,000' },
    { country: 'Indonesia', countryCode: 'id', price: '₹3,500' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Popular Visa Prices</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Competitive visa processing rates for your international travel needs
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-600 hover:text-white hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {visas.map((visa, index) => (
              <VisaCard
                key={index}
                country={visa.country}
                countryCode={visa.countryCode}
                price={visa.price}
              />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-600 hover:text-white hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          Swipe or scroll horizontally to view more
        </div>
      </div>
    </section>
  );
};

export default VisaCarousel;
