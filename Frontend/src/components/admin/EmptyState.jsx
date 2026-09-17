import React from 'react';
import { motion } from 'framer-motion';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-2xl border border-dashed border-cream-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-6 ${className}`}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-cream-100 border border-cream-200 text-coffee-600 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-lg font-bold font-serif text-espresso-800 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-warmgray-600 mb-6 max-w-sm leading-relaxed">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-espresso-800 hover:bg-espresso-700 text-cream-50 font-medium text-sm rounded-xl shadow-soft hover:shadow transition-all"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
