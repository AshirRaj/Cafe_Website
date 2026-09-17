import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

export const FinalCTASection = () => {
  return (
    <section className="py-20 sm:py-28 bg-cream-50 relative overflow-hidden">
      {/* Subtle decorative circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-coffee-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-terracotta-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-3xl bg-espresso-900 text-cream-50 mx-auto flex items-center justify-center shadow-soft-lg"
        >
          <Coffee className="w-8 h-8 text-coffee-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-serif font-bold text-espresso-900 leading-tight"
        >
          Your next favorite cup is waiting.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-warmgray-600 max-w-xl mx-auto leading-relaxed"
        >
          Whether you’re stepping in for a quick morning flat white or staying for an afternoon sourdough feast, we are ready to welcome you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link to="/menu">
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Order Online Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              Book a Table
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
