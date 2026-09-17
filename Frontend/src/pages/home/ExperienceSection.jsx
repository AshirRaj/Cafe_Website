import React from 'react';
import { motion } from 'framer-motion';
import { Armchair, Coffee, HeartHandshake, Sparkles } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { CAFE_INFO } from '../../data/cafeInfo';

const ICONS = {
  Armchair,
  Coffee,
  HeartHandshake,
  Sparkles,
};

export const ExperienceSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-cream-100/60 border-t border-cream-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="The Atmosphere"
          title="More Than Coffee, It’s an Experience."
          description="Every detail from our acoustic playlists to custom-fired ceramic mugs is curated to bring stillness and warmth to your day."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CAFE_INFO.features.map((feat, idx) => {
            const Icon = ICONS[feat.icon] || Sparkles;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.35 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200/80 shadow-soft hover:shadow-soft-lg hover:border-coffee-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center mb-5 border border-cream-200">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-espresso-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-warmgray-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
