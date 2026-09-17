import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../../assets/images/imageRegistry';
import { CAFE_INFO } from '../../data/cafeInfo';
import Button from '../../components/common/Button';

export const AboutSnippet = () => {
  return (
    <section className="py-16 sm:py-24 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Dual Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-[2.5rem] overflow-hidden shadow-soft-xl border-4 border-white">
                <img
                  src={IMAGES.cafeInterior}
                  alt="Cafe Adda Ambience"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
              </div>

              {/* Offset Small Image */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-52 h-52 rounded-3xl overflow-hidden border-4 border-white shadow-soft-xl">
                <img
                  src={IMAGES.baristaPouring}
                  alt="Barista Pouring Latte"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Experience Badge */}
              <div className="absolute top-6 left-6 bg-espresso-900/90 backdrop-blur-md text-cream-50 p-4 rounded-2xl shadow-elevated">
                <p className="text-2xl font-serif font-bold text-terracotta-400">10+ Years</p>
                <p className="text-[11px] text-cream-200">Artisan Coffee Craft</p>
              </div>
            </div>
          </div>

          {/* Right: Story & Stats */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-600 bg-terracotta-100 px-3.5 py-1 rounded-full">
              Our Story & Ethos
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-espresso-900 leading-tight">
              Rooted in Passion, <br />
              <span className="text-coffee-600 italic font-normal">Dedicated to Perfection.</span>
            </h2>

            <p className="text-sm sm:text-base text-warmgray-600 leading-relaxed">
              Founded in 2016, Cafe Adda was born out of a simple aspiration: to celebrate the pure, unadulterated terroir of Indian estate-grown coffee beans while providing a warm, mindful gathering sanctuary.
            </p>

            <div className="space-y-3 pt-2 text-sm text-warmgray-700">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0" />
                <span>Direct-trade micro-lot coffee beans roasted fresh weekly</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0" />
                <span>Zero artificial syrups — all vanillas and fruit purees made from scratch</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0" />
                <span>Organic sourdough breads and Viennoiserie pastries baked at dawn</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-cream-200">
              {CAFE_INFO.stats.slice(0, 3).map((st, i) => (
                <div key={i}>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-espresso-900">
                    {st.value}
                  </p>
                  <p className="text-xs text-warmgray-500 mt-0.5">{st.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
                  Read Our Full Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
