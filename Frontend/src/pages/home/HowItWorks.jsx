import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Sliders, CreditCard, UtensilsCrossed } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';

const STEPS = [
  {
    step: '01',
    title: 'Choose Your Favorite',
    desc: 'Browse our curated menu of single-origin roasts, brews, sourdoughs, and artisan desserts.',
    icon: Coffee,
  },
  {
    step: '02',
    title: 'Customize Your Cup',
    desc: 'Choose your roast profile, milk choice, sweetness level, or gourmet toppings to your taste.',
    icon: Sliders,
  },
  {
    step: '03',
    title: 'Dine-in, Takeaway, or Delivery',
    desc: 'Pick your table number for contactless table service, or grab a quick pickup on the go.',
    icon: CreditCard,
  },
  {
    step: '04',
    title: 'Savor & Enjoy',
    desc: 'Freshly prepared and delivered piping hot to your table or doorstep in minutes.',
    icon: UtensilsCrossed,
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20 bg-cream-100/40 border-t border-cream-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Simple & Seamless"
          title="How It Works"
          description="Enjoying your favorite brew and bakery treats at Cafe Adda is effortlessly simple."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200/90 shadow-soft flex flex-col relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream-100 text-coffee-600 flex items-center justify-center border border-cream-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-cream-300">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-semibold text-espresso-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-warmgray-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
