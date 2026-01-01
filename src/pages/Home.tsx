import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Building2, CreditCard, FileText, Star, Phone, MessageCircle } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import PackageCard from '../components/PackageCard';
import VisaCarousel from '../components/VisaCarousel';
import { supabase } from '../lib/supabase';
import type { Package } from '../lib/supabase';

const Home = () => {
  const [popularPackages, setPopularPackages] = useState<Package[]>([]);
  const [quickEnquiry, setQuickEnquiry] = useState({ name: '', email: '', message: '' });
  const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);
  const [quickEnquiryStatus, setQuickEnquiryStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchPopularPackages();
  }, []);

  const fetchPopularPackages = async () => {
    try {
      const featuredSlugs = [
        'dubai-extravaganza',
        'kashmir-heaven',
        'maldives-honeymoon',
        'azmat-umrah'
      ];

      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .in('slug', featuredSlugs)
        .limit(4);

      if (error) throw error;

      const orderedData = featuredSlugs
        .map(slug => data?.find(pkg => pkg.slug === slug))
        .filter((pkg): pkg is Package => pkg !== undefined);

      setPopularPackages(orderedData);
    } catch (error) {
      console.error('Error fetching popular packages:', error);
    }
  };

  const handleQuickEnquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuickEnquiry({ ...quickEnquiry, [e.target.name]: e.target.value });
  };

  const handleQuickEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuick(true);
    setQuickEnquiryStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: quickEnquiry.name,
          email: quickEnquiry.email,
          phone: '',
          message: quickEnquiry.message
        }]);

      if (error) throw error;

      setQuickEnquiryStatus('success');
      setQuickEnquiry({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setQuickEnquiryStatus('error');
    } finally {
      setIsSubmittingQuick(false);
    }
  };

  const services = [
    {
      icon: Globe,
      title: 'International & Domestic Holidays',
      description: 'Discover breathtaking locations across the globe or closer to home. Our handpicked packages are designed to match every mood, from family vacations to luxury escapes.'
    },
    {
      icon: Building2,
      title: 'Corporate Travel Solutions',
      description: 'Business trips should be efficient and stress-free. We handle end-to-end corporate travel plans with precision, so you can focus on what matters most — your business.'
    },
    {
      icon: CreditCard,
      title: 'Forex Services',
      description: 'Travel without worries about currency. We provide transparent and competitive forex services to make your international trips smooth and convenient.'
    },
    {
      icon: FileText,
      title: 'Visa Assistance',
      description: 'Simplifying one of the toughest parts of traveling, our team ensures quick and reliable visa processing so that your travel plans remain hassle-free.'
    }
  ];

  const testimonials = [
    {
      text: "Sahaba Travels made our family trip to Dubai so smooth — from booking to forex to visa, everything was handled perfectly.",
      author: "Aisha Khan",
      location: "Mumbai"
    },
    {
      text: "I trust Sahaba for all my business trips. They take care of everything before I even ask.",
      author: "Rajesh Sharma",
      location: "Corporate Traveler"
    },
    {
      text: "Their Umrah packages are exceptional. The attention to detail and spiritual guidance made our pilgrimage truly memorable.",
      author: "Mohammed Ali",
      location: "Delhi"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Where Journeys Begin and<br />
            <span className="text-orange-400">Currencies Align</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            At Sahaba Travels, we bring your dream journeys to life while making your travel stress-free with reliable forex and visa solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/packages"
              className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Explore Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <img 
                src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Travel Planning"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Sahaba Travels</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Sahaba Travels, we believe that every journey is more than just reaching a destination — it's about creating memories that last forever. From curated international getaways to smooth forex services, we are your trusted partner in travel. Our focus is to make every trip seamless, affordable, and unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Core Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive travel solutions designed to make your journey effortless and memorable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Popular Packages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most booked and loved packages, designed to suit every traveler's needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                name={pkg.name}
                category={pkg.category || 'Featured'}
                duration={pkg.duration || 'Varies'}
                price={pkg.price || 'On Request'}
                highlights={pkg.highlights || []}
                customImage={pkg.image_url || undefined}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/packages"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              View All Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Visa Prices Section */}
      <VisaCarousel />

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Our Travelers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex text-orange-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8">Get in touch with us for personalized travel solutions</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Enquiry</h3>
              <form onSubmit={handleQuickEnquiry} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={quickEnquiry.name}
                  onChange={handleQuickEnquiryChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={quickEnquiry.email}
                  onChange={handleQuickEnquiryChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={quickEnquiry.message}
                  onChange={handleQuickEnquiryChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                ></textarea>
                {quickEnquiryStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                    Thank you! We'll get back to you soon.
                  </div>
                )}
                {quickEnquiryStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    Error submitting. Please try again.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmittingQuick}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingQuick ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Quick Access Buttons */}
            <div className="space-y-6">
              <div className="text-white text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-4">Or Connect Directly</h3>
                <p className="text-lg mb-8">Choose your preferred way to reach us</p>
              </div>
              
              <div className="space-y-4">
                <a
                  href="https://wa.me/message/2J43KE4HLAELJ1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center lg:justify-start space-x-4 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className="font-semibold">WhatsApp Us</span>
                </a>
                
                <a
                  href="tel:+919769047633"
                  className="flex items-center justify-center lg:justify-start space-x-4 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Phone className="h-6 w-6" />
                  <span className="font-semibold">Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;