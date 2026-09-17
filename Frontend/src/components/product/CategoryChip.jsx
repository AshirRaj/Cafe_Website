import React from 'react';
import { motion } from 'framer-motion';

export const CategoryChip = ({
  category,
  isActive = false,
  onClick,
  showImage = false,
}) => {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 select-none ${
        isActive
          ? 'bg-espresso-900 text-cream-50 shadow-soft'
          : 'bg-white text-warmgray-700 hover:bg-cream-200/80 border border-cream-200/90'
      }`}
    >
      {showImage && category.image && (
        <img
          src={category.image}
          alt={category.name}
          className="w-6 h-6 rounded-full object-cover border border-white/20 shrink-0"
        />
      )}
      <span>{category.shortName || category.name}</span>
      {category.itemCount !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
            isActive ? 'bg-coffee-600 text-cream-50' : 'bg-cream-200 text-warmgray-600'
          }`}
        >
          {category.itemCount}
        </span>
      )}
    </motion.button>
  );
};

export default CategoryChip;
