import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Award, Heart, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CAFE_INFO } from '../../data/cafeInfo';
import { IMAGES } from '../../assets/images/imageRegistry';
import SectionHeading from '../../components/common/SectionHeading';

export const AboutPage = () => {
  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen space-y-16 sm:space-y-24">
      
      {/* 1. Header Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Craft & Heritage"
          title="The Story Behind Cafe Adda"
          description="A dedication to honest craft, sustainable shade-grown Indian coffee, and spaces designed for soulful connection."
        />

        <div className="relative rounded-[2.5rem] overflow-hidden shadow-soft-xl border-4 border-white h-[350px] sm:h-[480px]">
          <img
            src={IMAGES.heroBanner}
            alt="Cafe Adda Roastery & Coffee Bar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/20 to-transparent flex items-end p-8 sm:p-12">
            <div className="text-cream-50 max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-terracotta-400 font-semibold">
                Est. 2016 • Bhubaneswar
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
                Where every bean is roasted with reverence.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Philosophy & Farm to Cup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-600 bg-terracotta-100 px-3.5 py-1 rounded-full">
              Our Sourcing Standard
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-espresso-900 leading-tight">
              Direct Trade. <br />
              <span className="text-coffee-600 italic font-normal">Shade-Grown Arabica.</span>
            </h2>

            <p className="text-sm sm:text-base text-warmgray-600 leading-relaxed">
              We travel directly to high-altitude estates in Chikmagalur, the Bababudangiri ranges, and Araku Valley. Our beans grow under dense canopy forests alongside cardamom, pepper vines, and citrus trees—giving our coffee its unmistakable natural sweetness and low acidity.
            </p>

            <div className="space-y-3 text-sm text-warmgray-700">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0" />
                <span>100% ripe red coffee cherries hand-sorted on African raised drying beds</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0" />
                <span>Small batch roasting on custom drum roasters calibrated weekly</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0" />
                <span>Fair pricing paid directly to smallholder farm communities</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-soft border border-cream-200 h-64">
              <img
                src={IMAGES.coffeeBeans}
                alt="Roasted Coffee Beans"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-soft border border-cream-200 h-64 mt-6">
              <img
                src={IMAGES.roastery}
                alt="Roasting Drum"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Numbers & Statistics */}
      <div className="bg-espresso-900 text-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {CAFE_INFO.stats.map((st, i) => (
              <div key={i} className="space-y-1">
                <p className="text-4xl sm:text-5xl font-serif font-bold text-terracotta-400">
                  {st.value}
                </p>
                <p className="text-xs sm:text-sm text-cream-200/80 uppercase tracking-wider font-semibold">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. The Artisans & Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Behind The Bar"
          title="Meet Our Master Artisans"
          description="Passionate baristas, culinary chefs, and certified roasters who make every visit special."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAFE_INFO.team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-cream-200/90 overflow-hidden shadow-soft p-5 text-center space-y-4"
            >
              <div className="h-64 rounded-2xl overflow-hidden bg-cream-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-espresso-900">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-coffee-600 uppercase tracking-wider mt-0.5">
                  {member.role}
                </p>
                <p className="text-xs text-warmgray-600 mt-2 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Ambient Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <SectionHeading
          subtitle="Atmosphere"
          title="Captured Moments"
          description="A glimpse into the warmth, sunlight, and quiet moments that define Cafe Adda."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl overflow-hidden h-48 sm:h-64 shadow-soft">
            <img src={IMAGES.latteArt} alt="Latte Art" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden h-48 sm:h-64 shadow-soft">
            <img src={IMAGES.cafeInterior} alt="Cafe Interior" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden h-48 sm:h-64 shadow-soft">
            <img src={IMAGES.almondCroissant} alt="Croissant" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden h-48 sm:h-64 shadow-soft">
            <img src={IMAGES.coldBrew} alt="Cold Brew" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
