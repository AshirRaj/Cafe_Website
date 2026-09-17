import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-warmgray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-warmgray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-cream-50/70 border border-cream-300 rounded-2xl px-4 py-3 text-sm text-warmgray-900 placeholder:text-warmgray-400 transition-all duration-200 focus:bg-white focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-500/20 disabled:opacity-50 disabled:bg-cream-100 ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-terracotta-500 focus:border-terracotta-500 focus:ring-terracotta-500/20' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-terracotta-600 font-medium">{error}</p>}
    </div>
  );
};

export const Textarea = ({
  label,
  error,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-warmgray-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full bg-cream-50/70 border border-cream-300 rounded-2xl px-4 py-3 text-sm text-warmgray-900 placeholder:text-warmgray-400 transition-all duration-200 focus:bg-white focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-500/20 disabled:opacity-50 disabled:bg-cream-100 ${
          error ? 'border-terracotta-500 focus:border-terracotta-500 focus:ring-terracotta-500/20' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-terracotta-600 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
