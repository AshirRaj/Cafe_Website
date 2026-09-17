import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({
  quantity = 1,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) => {
  const sizeStyles = {
    sm: {
      btn: 'w-6 h-6 p-1',
      text: 'w-6 text-xs font-semibold',
      icon: 'w-3 h-3',
      wrap: 'p-0.5',
    },
    md: {
      btn: 'w-8 h-8 p-1.5',
      text: 'w-8 text-sm font-semibold',
      icon: 'w-3.5 h-3.5',
      wrap: 'p-1',
    },
    lg: {
      btn: 'w-10 h-10 p-2',
      text: 'w-10 text-base font-semibold',
      icon: 'w-4 h-4',
      wrap: 'p-1.5',
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  return (
    <div className={`inline-flex items-center bg-cream-100 rounded-full border border-cream-300 ${currentSize.wrap} ${className}`}>
      <motion.button
        whileTap={{ scale: 0.88 }}
        type="button"
        disabled={quantity <= min}
        onClick={onDecrease}
        className={`flex items-center justify-center rounded-full text-warmgray-700 hover:bg-white hover:text-espresso-900 transition-colors disabled:opacity-40 disabled:hover:bg-transparent ${currentSize.btn}`}
        aria-label="Decrease quantity"
      >
        <Minus className={currentSize.icon} />
      </motion.button>
      <span className={`text-center text-espresso-900 select-none ${currentSize.text}`}>
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.88 }}
        type="button"
        disabled={quantity >= max}
        onClick={onIncrease}
        className={`flex items-center justify-center rounded-full text-warmgray-700 hover:bg-white hover:text-espresso-900 transition-colors disabled:opacity-40 disabled:hover:bg-transparent ${currentSize.btn}`}
        aria-label="Increase quantity"
      >
        <Plus className={currentSize.icon} />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;
