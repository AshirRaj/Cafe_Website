import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Heart, ArrowUpRight } from 'lucide-react';
import { CAFE_INFO } from '../../data/cafeInfo';

export const Footer = () => {
  return (
    <footer className="bg-espresso-900 text-cream-100 border-t border-espresso-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-espresso-700/60">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-coffee-600 text-cream-50 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-cream-50" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-cream-50">
                  CAFE ADDA
                </span>
                <span className="text-[10px] tracking-[0.2em] text-coffee-300 font-semibold uppercase">
                  Bhubaneswar
                </span>
              </div>
            </div>
            <p className="text-sm text-warmgray-400 max-w-sm leading-relaxed">
              {CAFE_INFO.shortDescription} Crafted with 100% shade-grown Indian Arabica beans and honest, real ingredients.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-coffee-600 text-warmgray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-coffee-600 text-warmgray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-espresso-800 hover:bg-coffee-600 text-warmgray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-300">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-warmgray-300">
              <li>
                <Link to="/" className="hover:text-cream-50 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-cream-50 transition-colors">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-cream-50 transition-colors">
                  Special Offers & Combos
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cream-50 transition-colors">
                  Our Roastery Story
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="hover:text-cream-50 transition-colors">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cream-50 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Menu categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-300">
              Menu Highlights
            </h4>
            <ul className="space-y-2 text-sm text-warmgray-300">
              <li>
                <Link to="/menu?category=coffee" className="hover:text-cream-50 transition-colors">
                  Single-Origin Coffees
                </Link>
              </li>
              <li>
                <Link to="/menu?category=snacks" className="hover:text-cream-50 transition-colors">
                  Quick Bites & Snacks
                </Link>
              </li>
              <li>
                <Link to="/menu?category=breakfast" className="hover:text-cream-50 transition-colors">
                  All-Day Breakfast
                </Link>
              </li>
              <li>
                <Link to="/menu?category=sandwiches" className="hover:text-cream-50 transition-colors">
                  Artisanal Sourdough
                </Link>
              </li>
              <li>
                <Link to="/menu?category=desserts" className="hover:text-cream-50 transition-colors">
                  Fresh Bakery & Desserts
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-300">
              Visit Us
            </h4>
            <div className="space-y-2.5 text-xs text-warmgray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <p>
                  {CAFE_INFO.address.street}, {CAFE_INFO.address.area}, {CAFE_INFO.address.city}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-terracotta-400 shrink-0" />
                <p>{CAFE_INFO.contact.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-terracotta-400 shrink-0" />
                <p>Mon-Sun: 07:30 AM – 11:00 PM</p>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-xs font-medium text-coffee-300 hover:text-white"
                >
                  Get Directions <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warmgray-400">
          <p>© {new Date().getFullYear()} Cafe Adda. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Crafted with passion for authentic coffee</span>
            <span>•</span>
            <span>FSSAI Lic. #11223344009988</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
