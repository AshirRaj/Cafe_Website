import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Tag, Clock } from 'lucide-react';
import { IMAGES } from '../../assets/images/imageRegistry';
import Button from '../../components/common/Button';

export const SpecialPromoSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-espresso-900 via-espresso-800 to-coffee-700 text-cream-50 overflow-hidden shadow-soft-xl border border-espresso-700/60 p-8 sm:p-12 lg:p-16">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-coffee-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 border border-terracotta-400/30 text-terracotta-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                <span>Limited Time Promotion</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50 leading-tight">
                Afternoon Coffee & <br />
                <span className="text-terracotta-300 italic font-normal">Fresh Dessert Duo</span>
              </h2>

              <p className="text-sm sm:text-base text-cream-200/80 max-w-lg leading-relaxed">
                Enjoy 20% OFF on all handcrafted espresso beverages when paired with our warm Belgian brownies or New York cheesecakes. Available daily between 3 PM & 7 PM.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-cream-200/70 pt-2">
                <span className="flex items-center gap-1.5 bg-espresso-950/60 px-3 py-1.5 rounded-full border border-cream-200/10 font-mono">
                  <Tag className="w-3.5 h-3.5 text-terracotta-400" /> Use Code: AFTERNOON20
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-coffee-300" /> 3:00 PM – 7:00 PM Daily
                </span>
              </div>

              <div className="pt-3">
                <Link to="/offers">
                  <Button variant="terracotta" size="lg" icon={ArrowRight} iconPosition="right">
                    Explore Special Offers
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-5 relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-coffee-400/30"
              >
                <img
                  src={IMAGES.offerCombo}
                  alt="Coffee & Dessert Pairing"
                  className="w-full h-[280px] sm:h-[340px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-terracotta-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-soft uppercase tracking-wider">
                  Flat 20% Off
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialPromoSection;
