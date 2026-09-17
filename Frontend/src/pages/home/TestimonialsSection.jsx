import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import SectionHeading from '../../components/common/SectionHeading';
import RatingStars from '../../components/common/RatingStars';

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 sm:py-24 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Guest Reviews"
          title="Loved by Coffee Enthusiasts"
          description="Read what our neighborhood guests, authors, and daily coffee connoisseurs say about us."
        />

        {/* Testimonials Carousel Display */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl sm:rounded-[2.5rem] border border-cream-200/90 p-8 sm:p-12 shadow-soft-lg">
            
            <Quote className="w-12 h-12 text-coffee-300/40 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <RatingStars rating={current.rating} size="md" />

                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-espresso-900 leading-snug">
                  "{current.title}"
                </h3>

                <p className="text-base sm:text-lg text-warmgray-700 leading-relaxed italic">
                  {current.review}
                </p>

                <div className="pt-6 border-t border-cream-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-coffee-300/50"
                    />
                    <div>
                      <h4 className="text-base font-serif font-bold text-espresso-900">
                        {current.name}
                      </h4>
                      <p className="text-xs text-warmgray-500">{current.role}</p>
                    </div>
                  </div>

                  {current.favorite && (
                    <div className="text-xs text-warmgray-600 bg-cream-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
                      <span className="font-semibold text-espresso-900">Go-to order: </span>
                      {current.favorite}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center justify-end gap-2 pt-6 sm:absolute sm:bottom-12 sm:right-12">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-cream-100 hover:bg-espresso-900 hover:text-white text-espresso-900 flex items-center justify-center transition-colors border border-cream-200"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-cream-100 hover:bg-espresso-900 hover:text-white text-espresso-900 flex items-center justify-center transition-colors border border-cream-200"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-espresso-900' : 'w-2 bg-cream-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
