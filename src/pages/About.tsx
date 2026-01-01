import { CheckCircle, Users, Globe, Award, Heart } from 'lucide-react';

const About = () => {
  const features = [
    'Personalized holiday planning tailored to your needs',
    'Transparent forex services with no hidden costs',
    'End-to-end solutions: flights, stays, visas, forex, and more',
    'Trusted by families, corporates, and solo travelers alike'
  ];

  const stats = [
    { icon: Users, number: '10,000+', label: 'Happy Travelers' },
    { icon: Globe, number: '50+', label: 'Destinations' },
    { icon: Award, number: '15+', label: 'Years Experience' },
    { icon: Heart, number: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sahaba Travels</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your journey to extraordinary experiences starts here
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Sahaba Travels, every journey is an opportunity to craft stories that last a lifetime. We blend personalised planning, transparent forex services, and reliable visa assistance to deliver travel that feels effortless. Our focus is on service, trust, and memorable experiences.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're planning a family vacation, a romantic honeymoon, a spiritual pilgrimage, or a business trip, we understand that each journey is unique. Our dedicated team works tirelessly to ensure every detail is perfect, from the moment you contact us until you return home with memories to cherish.
              </p>
            </div>
            <div className="relative">
              <div className="mb-6">
                <img 
                  src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Travel Planning"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600">Numbers that speak for our commitment to excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the most trusted travel partner for individuals and businesses, turning journeys into experiences that inspire.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-orange-600 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To deliver seamless travel and forex solutions with unmatched service, affordability, and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            At Sahaba Travels, we're not just travel agents – we're your travel partners. Our experienced team is dedicated to making your dreams come true, one journey at a time.
          </p>
          
          <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Create Your Perfect Journey?</h3>
            <p className="text-lg mb-6">
              Let us help you plan an unforgettable experience tailored just for you.
            </p>
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Start Planning Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;