import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Coffee, Sparkles, Clock, Phone, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Offers', path: '/offers', badge: 'New' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-50/90 backdrop-blur-md shadow-soft py-3.5 border-b border-cream-200/80'
            : 'bg-cream-50/60 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-espresso-900 text-cream-50 flex items-center justify-center shadow-soft group-hover:bg-coffee-600 transition-colors duration-300">
              <Coffee className="w-5 h-5 text-coffee-300 group-hover:text-cream-50 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-espresso-900 leading-none">
                CAFE ADDA
              </span>
              <span className="text-[10px] tracking-[0.2em] text-coffee-600 font-semibold uppercase mt-0.5">
                Bhubaneswar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-espresso-900 font-semibold'
                      : 'text-warmgray-600 hover:text-espresso-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-1.5">
                      {link.name}
                      {link.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-terracotta-500 text-white rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-espresso-900 hover:bg-cream-200/70 transition-colors"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-espresso-900" />
              {totalItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-terracotta-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-soft"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </Link>

            <Link to="/menu">
              <Button variant="primary" size="md">
                Order Now
              </Button>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-espresso-900 hover:bg-cream-200"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-espresso-900 hover:bg-cream-200 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-espresso-900/60 z-40 md:hidden backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-18 left-4 right-4 bg-cream-50 border border-cream-200 rounded-3xl p-6 shadow-soft-xl z-50 md:hidden flex flex-col gap-4"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-espresso-900 text-cream-50 font-semibold'
                          : 'text-warmgray-700 hover:bg-cream-100'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-terracotta-500 text-white rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-2 border-t border-cream-200 flex flex-col gap-2.5">
                <Link to="/menu" className="w-full">
                  <Button variant="primary" size="lg" className="w-full">
                    Explore Menu & Order
                  </Button>
                </Link>
                <div className="flex items-center justify-between text-xs text-warmgray-500 px-2 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 7:30 AM – 11:00 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> +91 98450 12345
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
