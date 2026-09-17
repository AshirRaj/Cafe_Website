import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/categories';
import SectionHeading from '../../components/common/SectionHeading';
import { ArrowRight } from 'lucide-react';

export const QuickCategories = () => {
  return (
    <section className="py-16 sm:py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Artisan Selections"
          title="Explore by Category"
          description="From single-origin pour-overs to gourmet sandwiches and decadent bakery delights."
        />

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <Link
                to={`/menu?category=${cat.id}`}
                className="group relative flex flex-col bg-white rounded-3xl border border-cream-200/90 p-4 sm:p-5 shadow-soft hover:shadow-soft-lg hover:border-coffee-400/50 transition-all duration-300 h-full overflow-hidden"
              >
                {/* Category Thumbnail */}
                <div className="relative h-28 sm:h-36 w-full rounded-2xl overflow-hidden mb-4 bg-cream-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-espresso-900/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-semibold text-espresso-900 group-hover:text-coffee-600 transition-colors">
                      {cat.shortName || cat.name}
                    </h3>
                    <p className="text-xs text-warmgray-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-cream-100 flex items-center justify-between text-xs font-semibold text-warmgray-600 group-hover:text-coffee-600">
                    <span>{cat.itemCount} Items</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickCategories;
