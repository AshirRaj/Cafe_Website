import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';

export const AddToCartButton = ({
  onClick,
  isSmall = false,
  className = '',
  disabled = false,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || justAdded) return;

    setJustAdded(true);
    onClick && onClick();

    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 overflow-hidden select-none ${
        justAdded
          ? 'bg-sage-600 text-white'
          : 'bg-cream-100 hover:bg-espresso-900 text-espresso-900 hover:text-white border border-cream-300'
      } ${
        isSmall
          ? 'w-9 h-9 p-0'
          : 'px-4 py-2 text-xs sm:text-sm gap-1.5'
      } ${className}`}
      aria-label="Add to cart"
    >
      <AnimatePresence mode="wait">
        {justAdded ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-1"
          >
            <Check className={isSmall ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
            {!isSmall && <span>Added</span>}
          </motion.div>
        ) : (
          <motion.div
            key="plus"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-1"
          >
            <Plus className={isSmall ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
            {!isSmall && <span>Add</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AddToCartButton;
