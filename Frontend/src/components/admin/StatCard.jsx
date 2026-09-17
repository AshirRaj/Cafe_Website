import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  colorScheme = 'coffee'
}) => {
  const iconBg = {
    coffee: 'bg-coffee-100 text-coffee-700 border-coffee-200',
    terracotta: 'bg-terracotta-100 text-terracotta-700 border-terracotta-200',
    sage: 'bg-sage-100 text-sage-700 border-sage-200',
    espresso: 'bg-espresso-800 text-cream-50 border-espresso-700',
    cream: 'bg-cream-200 text-espresso-800 border-cream-300'
  }[colorScheme] || 'bg-coffee-100 text-coffee-700 border-coffee-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-cream-200/80 rounded-2xl p-5 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-warmgray-600">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold font-sans text-espresso-800 mt-1">{value}</h3>
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between text-xs">
          {trend && (
            <span
              className={`font-semibold flex items-center gap-1 ${
                trendPositive ? 'text-sage-700' : 'text-terracotta-600'
              }`}
            >
              {trendPositive ? '↑' : '↓'} {trend}
            </span>
          )}
          {subtitle && <span className="text-warmgray-600 truncate">{subtitle}</span>}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
