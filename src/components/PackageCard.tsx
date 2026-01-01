import { Link } from 'react-router-dom';
import { Clock, IndianRupee, MapPin, ArrowRight } from 'lucide-react';

interface PackageCardProps {
  name: string;
  category: string;
  duration: string;
  price: string;
  highlights?: string[];
  customImage?: string;
  updatedAt?: string;
}

const PackageCard = ({ name, category, duration, price, highlights = [], customImage, updatedAt }: PackageCardProps) => {
  // Function to get appropriate image based on package name
  const getPackageImage = (packageName: string) => {
    const name = packageName.toLowerCase();

    // Umrah Packages - Mecca/Medina
    if (name.includes('umrah') || name.includes('azmat') || name.includes('rehmat') || name.includes('khidmat')) {
      return 'https://images.pexels.com/photos/4668228/pexels-photo-4668228.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Kashmir - Dal Lake, Mountains, Houseboats
    if (name.includes('kashmir')) {
      return 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Kerala - Backwaters, Houseboats
    if (name.includes('kerala')) {
      return 'https://images.pexels.com/photos/12347782/pexels-photo-12347782.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Dubai - Burj Khalifa, Skyline
    if (name.includes('dubai')) {
      return 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Azerbaijan - Baku, Flame Towers
    if (name.includes('azerbaijan')) {
      return 'https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Indonesia - Temples, Rice Terraces
    if (name.includes('indonesia')) {
      return 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Turkey - Hot Air Balloons, Cappadocia
    if (name.includes('turkey')) {
      return 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Rajasthan - Palaces, Desert
    if (name.includes('rajasthan')) {
      return 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Manali - Snow Mountains, Valleys
    if (name.includes('manali')) {
      return 'https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Maldives - Turquoise Water, Overwater Bungalows
    if (name.includes('maldives')) {
      return 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Bali - Beach, Temples
    if (name.includes('bali')) {
      return 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Thailand - Beaches, Temples
    if (name.includes('thailand')) {
      return 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Vietnam - Ha Long Bay
    if (name.includes('vietnam')) {
      return 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Mysore - Palace
    if (name.includes('mysore')) {
      return 'https://images.pexels.com/photos/12347788/pexels-photo-12347788.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Goa - Beach, Palm Trees
    if (name.includes('goa')) {
      return 'https://images.pexels.com/photos/3015857/pexels-photo-3015857.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Kedarnath - Himalayan Temple
    if (name.includes('kedarnath')) {
      return 'https://images.pexels.com/photos/14977937/pexels-photo-14977937.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Badrinath - Mountain Temple
    if (name.includes('badrinath')) {
      return 'https://images.pexels.com/photos/17150550/pexels-photo-17150550.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Char Dham - Himalayan Pilgrimage
    if (name.includes('dham')) {
      return 'https://images.pexels.com/photos/15964177/pexels-photo-15964177.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Jagannath Puri - Temple
    if (name.includes('jagannath') || name.includes('puri')) {
      return 'https://images.pexels.com/photos/12347790/pexels-photo-12347790.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Ajmer - Dargah, Rajasthan Architecture
    if (name.includes('ajmer')) {
      return 'https://images.pexels.com/photos/12347791/pexels-photo-12347791.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
    }

    // Default travel image
    return 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
  };

  const imageUrl = customImage
    ? `${customImage.split('?')[0]}?t=${updatedAt || Date.now()}`
    : getPackageImage(name);

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <div className="h-48 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          key={imageUrl}
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <IndianRupee className="h-4 w-4 mr-2" />
            <span className="text-sm font-semibold">{price}</span>
          </div>
        </div>
        
        {highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-center">
                  <MapPin className="h-3 w-3 mr-2 text-orange-500" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Link
          to="/contact"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center group-hover:bg-orange-500"
        >
          Enquire Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;