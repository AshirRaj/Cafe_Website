import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';
import Button from '../common/Button';

export const ProductGrid = ({ products, onResetFilters, searchQuery }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-cream-200 p-8 max-w-lg mx-auto shadow-soft">
        <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-warmgray-400 mx-auto mb-4 border border-cream-200">
          <Coffee className="w-8 h-8 text-coffee-600" />
        </div>
        <h3 className="text-xl font-serif font-semibold text-espresso-900 mb-1">
          No matching delicacies found
        </h3>
        <p className="text-xs text-warmgray-500 mb-6 leading-relaxed">
          {searchQuery
            ? `We couldn't find any items matching "${searchQuery}". Try searching for coffee, teas, or sandwiches.`
            : 'No menu items match your active filters. Try adjusting your dietary or category selection.'}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          icon={RotateCcw}
          iconPosition="left"
        >
          Reset All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id || product.slug}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
