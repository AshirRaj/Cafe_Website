import { IMAGES } from '../assets/images/imageRegistry';

export const CAFE_INFO = {
  name: 'Cafe Adda',
  tagline: 'Good Coffee. Great Moments.',
  shortDescription: 'Freshly brewed single-origin specialty coffees, handcrafted gourmet delicacies, and a soulful space worth staying for.',
  address: {
    street: 'Plot No. 12, Janpath Road, Saheed Nagar',
    area: 'Saheed Nagar / Patia',
    city: 'Bhubaneswar, Odisha',
    pincode: '751007',
    landmark: 'Near Rama Devi University, Janpath',
    googleMapUrl: 'https://maps.google.com/?q=Saheed+Nagar+Bhubaneswar',
  },
  contact: {
    phone: '+91 (674) 254-8822',
    mobile: '+91 98450 12345',
    email: 'hello@cafeadda.in',
    reservations: 'reserve@cafeadda.in',
  },
  timings: [
    { days: 'Monday – Friday', hours: '07:30 AM – 11:00 PM' },
    { days: 'Saturday & Sunday', hours: '07:00 AM – 11:30 PM' },
    { days: 'Kitchen Closes', hours: '10:30 PM Daily' },
  ],
  stats: [
    { label: 'Years of Craft', value: '10+' },
    { label: 'Happy Guests', value: '50K+' },
    { label: 'Signature Items', value: '25+' },
    { label: 'Coffee Awards', value: '8' },
  ],
  features: [
    {
      title: 'Cozy Atmosphere',
      description: 'Sunlit corners, artisanal wood accents, curated jazz, and high-speed Wi-Fi designed for focus and conversations.',
      icon: 'Armchair',
    },
    {
      title: 'Ethical Direct-Trade Beans',
      description: 'Sourced directly from certified shade-grown estates in Chikmagalur, Coorg, and Araku Valley.',
      icon: 'Coffee',
    },
    {
      title: 'Handcrafted With Love',
      description: 'Every beverage is calibrated for grind size, water TDS, extraction time, and temperature by master baristas.',
      icon: 'HeartHandshake',
    },
    {
      title: 'Warm & Intuitive Service',
      description: 'Thoughtful hospitality whether you are popping in for a quick morning takeaway or savoring an evening dinner.',
      icon: 'Sparkles',
    },
  ],
  tables: [
    { id: 'T1', name: 'Table 1 (Window Nook)', capacity: '2 Guests', section: 'Window View' },
    { id: 'T2', name: 'Table 2 (Window Nook)', capacity: '2 Guests', section: 'Window View' },
    { id: 'T3', name: 'Table 3 (Sunlit Lounge)', capacity: '4 Guests', section: 'Main Lounge' },
    { id: 'T4', name: 'Table 4 (Sunlit Lounge)', capacity: '4 Guests', section: 'Main Lounge' },
    { id: 'T5', name: 'Table 5 (Barista Counter)', capacity: '1-2 Guests', section: 'Brew Bar' },
    { id: 'T6', name: 'Table 6 (Quiet Corner)', capacity: '2 Guests', section: 'Work Corner' },
    { id: 'T7', name: 'Table 7 (Bookshelf Alcove)', capacity: '4 Guests', section: 'Library' },
    { id: 'T8', name: 'Table 8 (Garden Patio)', capacity: '6 Guests', section: 'Outdoor Patio' },
    { id: 'T9', name: 'Table 9 (Garden Patio)', capacity: '4 Guests', section: 'Outdoor Patio' },
    { id: 'T10', name: 'Table 10 (Family Booth)', capacity: '6 Guests', section: 'Main Lounge' },
  ],
  team: [
    {
      name: 'Vikram Joshi',
      role: 'Head Barista & Roaster',
      image: IMAGES.teamRoaster,
      bio: 'SCA-certified roaster with 12 years of coffee bean calibration and cupping expertise.',
    },
    {
      name: 'Chef Elena Morris',
      role: 'Executive Pastry Chef',
      image: IMAGES.teamChef,
      bio: 'Le Cordon Bleu graduate crafting sourdough breads, lamination, and signature desserts.',
    },
    {
      name: 'Karan Singhal',
      role: 'Master Beverage Architect',
      image: IMAGES.teamBarista1,
      bio: 'Champion of regional cold brew infusions and delicate botanical tea blends.',
    },
  ],
  faqs: [
    {
      q: 'Do you offer vegan and lactose-free milk options?',
      a: 'Yes! We offer fresh oat milk, almond milk, and soy milk across all coffee and tea beverages.',
    },
    {
      q: 'Can I reserve a table in advance?',
      a: 'Absolutely! You can choose Dine-In during checkout or book via our Contact / Table reservation form.',
    },
    {
      q: 'Do you have dedicated work-friendly tables with charging plugs?',
      a: 'Yes, our Library and Work Corner sections feature dedicated high-speed universal charging ports and ergonomic seating.',
    },
    {
      q: 'Is there parking available at the café?',
      a: 'We have dedicated valet parking and spacious two-wheeler parking available during all open hours.',
    },
  ],
};
