import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/6.png" alt="Sahaba Travels" className="h-10 w-10 rounded-lg" />
              <span className="text-2xl font-bold">Sahaba Travels</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for memorable journeys and seamless forex solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/sahabatravels?utm_source=qr&igsh=MXV5NHljbnB5ZTg1dw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/share/1D2s39R4Tr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/message/2J43KE4HLAELJ1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-500" />
                <div>
                  <a href="tel:+919769047633" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                    +91 97690 47633
                  </a>
                  <br />
                  <a href="tel:+919082017919" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                    +91 90820 17919
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-500" />
                <a href="mailto:Info@sahabatravels.com" className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  Info@sahabatravels.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-orange-500 mt-1" />
                <p className="text-gray-300">
                  Shop no.2, Arsiwala Building,<br />
                  Dimtimkar Road, Nagpada,<br />
                  Mumbai - 400008
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get the latest travel deals and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">IATA Certified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Sahaba Travels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;