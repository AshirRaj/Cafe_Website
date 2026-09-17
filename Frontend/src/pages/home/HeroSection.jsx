import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Sparkles, Award, Clock } from 'lucide-react';
import Button from '../../components/common/Button';
import { IMAGES } from '../../assets/images/imageRegistry';
import videoCafe from '../../assets/Videocafe.mp4';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-28 text-cream-50 bg-espresso-900">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.5] sm:scale-[1.2] lg:scale-105 filter brightness-[0.70]"
        >
          <source src={videoCafe} type="video/mp4" />
        </video>
        {/* Seamless warm coffee overlay for crisp text legibility without black bars */}
        <div className="absolute inset-0 bg-espresso-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50/10 backdrop-blur-md border border-cream-200/20 text-cream-100 text-xs font-semibold uppercase tracking-wider shadow-soft"
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
              <span>Specialty Coffee & Artisan Bakery</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-cream-50 tracking-tight leading-[1.12]"
            >
              Good Coffee. <br className="hidden sm:inline" />
              <span className="text-terracotta-300 italic font-normal">Great Moments.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-cream-200/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Freshly brewed single-origin coffee, handcrafted gourmet delicacies, and a cozy space worth staying for. Sourced ethically from shade-grown Indian estates.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/menu">
                <Button variant="terracotta" size="lg" icon={ArrowRight} iconPosition="right">
                  Explore Menu
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="secondary" size="lg">
                  Order Now
                </Button>
              </Link>
            </motion.div>

            {/* Trust highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 sm:pt-6 border-t border-cream-200/20 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-cream-100 font-bold text-sm sm:text-base">
                  <Award className="w-4 h-4 text-terracotta-400 shrink-0" />
                  <span>100% Arabica</span>
                </div>
                <p className="text-[11px] text-cream-300/70">Single estate beans</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-cream-100 font-bold text-sm sm:text-base">
                  <Clock className="w-4 h-4 text-terracotta-400 shrink-0" />
                  <span>Fresh Daily</span>
                </div>
                <p className="text-[11px] text-cream-300/70">Baked in-house</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-cream-100 font-bold text-sm sm:text-base">
                  <Coffee className="w-4 h-4 text-terracotta-400 shrink-0" />
                  <span>SCA Certified</span>
                </div>
                <p className="text-[11px] text-cream-300/70">Master Baristas</p>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Main Image Frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-soft-xl border-4 border-white/20 bg-espresso-900/60 backdrop-blur-sm">
                <img
                  src={IMAGES.heroCup}
                  alt="Artisan Latte Art"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent" />
              </div>

              {/* Floating Rating Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-espresso-900/90 backdrop-blur-md p-4 rounded-3xl shadow-elevated border border-cream-200/20 max-w-[200px] text-cream-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-terracotta-400">4.9★</span>
                  <div className="text-[11px] text-cream-200/80 leading-tight">
                    <span>Over 50,000+ happy coffee lovers</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Signature Tag */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-4 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md text-espresso-900 px-4 py-3 rounded-2xl shadow-elevated text-xs border border-cream-200"
              >
                <p className="font-semibold text-terracotta-600 uppercase tracking-widest text-[9px]">
                  Chef's Special
                </p>
                <p className="font-serif text-sm font-medium mt-0.5 text-espresso-950">Vanilla Bean Latte</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
