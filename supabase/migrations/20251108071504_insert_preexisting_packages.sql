/*
  # Insert Pre-existing Travel Packages

  Adds 30 pre-existing travel packages from various categories:
  - 3 Umrah packages
  - 8 Family packages  
  - 10 Honeymoon packages
  - 5 Religious travel packages
  
  These packages were previously hardcoded in the app and are now being migrated to the database 
  for management through the admin panel. Each package includes name, slug, duration, price, and description.
*/

INSERT INTO packages (name, slug, description, duration, price) VALUES
  ('Azmat Umrah', 'azmat-umrah', '5-Star Hotels, VIP Transport, Guided Tours', 'Varies', 'On Request'),
  ('Rehmat Umrah', 'rehmat-umrah', '4-Star Hotels, Group Transport, Religious Guidance', 'Varies', 'On Request'),
  ('Khidmat Umrah', 'khidmat-umrah', '3-Star Hotels, Shared Transport, Basic Services', 'Varies', 'On Request'),
  ('Kashmir Paradise', 'kashmir-paradise', 'Dal Lake, Gulmarg, Pahalgam', 'Varies', 'On Request'),
  ('Kerala Backwaters', 'kerala-backwaters', 'Houseboat Stay, Munnar Hills, Kochi Tour', 'Varies', 'On Request'),
  ('Dubai Extravaganza', 'dubai-extravaganza', 'Desert Safari, Burj Khalifa, Dubai Mall', 'Varies', 'On Request'),
  ('Azerbaijan Discovery', 'azerbaijan-discovery', 'Baku City Tour, Fire Temple, Caspian Sea', 'Varies', 'On Request'),
  ('Indonesia Adventure', 'indonesia-adventure', 'Jakarta Tour, Bogor Gardens, Cultural Sites', 'Varies', 'On Request'),
  ('Turkey Delights', 'turkey-delights', 'Istanbul Tour, Cappadocia, Pamukkale', 'Varies', 'On Request'),
  ('Rajasthan Royalty', 'rajasthan-royalty', 'Jaipur Palace, Udaipur Lakes, Desert Camp', 'Varies', 'On Request'),
  ('Manali Mountains', 'manali-mountains', 'Snow Activities, Rohtang Pass, Solang Valley', 'Varies', 'On Request'),
  ('Maldives Romance', 'maldives-romance', 'Water Villa, Private Beach, Spa Treatment', 'Varies', 'On Request'),
  ('Bali Bliss', 'bali-bliss', 'Beach Resort, Temple Tours, Couples Spa', 'Varies', 'On Request'),
  ('Thailand Romance', 'thailand-romance', 'Phuket Beach, Bangkok City, Island Hopping', 'Varies', 'On Request'),
  ('Vietnam Serenity', 'vietnam-serenity', 'Ha Long Bay, Ho Chi Minh, Romantic Cruise', 'Varies', 'On Request'),
  ('Dubai Luxury', 'dubai-luxury', '7-Star Hotel, Private Tours, Romantic Dinner', 'Varies', 'On Request'),
  ('Kashmir Heaven', 'kashmir-heaven', 'Houseboat Stay, Shikara Ride, Mountain Views', 'Varies', 'On Request'),
  ('Kerala Tranquility', 'kerala-tranquility', 'Tree House, Backwater Cruise, Ayurvedic Spa', 'Varies', 'On Request'),
  ('Mysore Elegance', 'mysore-elegance', 'Palace Tour, Garden Walks, Cultural Shows', 'Varies', 'On Request'),
  ('Manali Romance', 'manali-romance', 'Cozy Cottages, Valley Views, Adventure Activities', 'Varies', 'On Request'),
  ('Goa Beaches', 'goa-beaches', 'Beach Resort, Water Sports, Sunset Cruise', 'Varies', 'On Request'),
  ('Kedarnath Pilgrimage', 'kedarnath-pilgrimage', 'Temple Visit, Helicopter Service, Spiritual Guidance', 'Varies', 'On Request'),
  ('Badrinath Journey', 'badrinath-journey', 'Sacred Temple, Mountain Views, Religious Ceremonies', 'Varies', 'On Request'),
  ('Char Dham Yatra', 'char-dham-yatra', 'Four Sacred Sites, Complete Circuit, Spiritual Experience', 'Varies', 'On Request'),
  ('Jagannath Puri', 'jagannath-puri', 'Temple Darshan, Beach Stay, Cultural Tours', 'Varies', 'On Request'),
  ('Ajmer Sharif', 'ajmer-sharif', 'Dargah Visit, Spiritual Sessions, Local Culture', 'Varies', 'On Request')
ON CONFLICT (slug) DO NOTHING;