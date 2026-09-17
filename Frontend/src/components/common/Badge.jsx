import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default' | 'sage' | 'terracotta' | 'coffee' | 'veg' | 'nonveg'
  size = 'md',
  className = '',
}) => {
  if (variant === 'veg') {
    return (
      <span className={`inline-flex items-center justify-center p-0.5 border-2 border-sage-600 rounded-sm bg-white ${className}`} title="Vegetarian">
        <span className="w-2 h-2 rounded-full bg-sage-600" />
      </span>
    );
  }

  if (variant === 'nonveg') {
    return (
      <span className={`inline-flex items-center justify-center p-0.5 border-2 border-terracotta-600 rounded-sm bg-white ${className}`} title="Non-Vegetarian">
        <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-terracotta-600" />
      </span>
    );
  }

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold tracking-wide',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-medium',
  };

  const variantStyles = {
    default: 'bg-cream-200 text-espresso-800 border border-cream-300',
    sage: 'bg-sage-100 text-sage-700 border border-sage-600/20',
    terracotta: 'bg-terracotta-100 text-terracotta-700 border border-terracotta-500/20',
    coffee: 'bg-coffee-100 text-coffee-700 border border-coffee-300',
    dark: 'bg-espresso-900 text-cream-50',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
