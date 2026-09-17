import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const EmptyCart = () => {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-cream-200/80 border border-cream-300 flex items-center justify-center text-coffee-600 shadow-soft"
      >
        <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
      </motion.div>

      <h2 className="text-2xl font-serif font-semibold text-espresso-900 mb-2">
        Your cup is empty
      </h2>
      <p className="text-sm text-warmgray-600 mb-8 leading-relaxed">
        Looks like you haven’t added any handcrafted coffees or delicious café treats to your order yet.
      </p>

      <Link to="/menu">
        <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
          Explore Our Menu
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
