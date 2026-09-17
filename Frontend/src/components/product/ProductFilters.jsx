import React from 'react';
import { Search, X, Check } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const ProductFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  dietaryFilter,
  onDietaryChange,
  availabilityOnly,
  onAvailabilityChange,
  sortBy,
  onSortChange,
  totalResults = 0,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-cream-200/90 p-4 sm:p-6 shadow-soft mb-8 space-y-4">
      {/* Top Row: Search + Dietary & Sort Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full lg:max-w-md">
          <Search className="w-4 h-4 text-warmgray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search coffee, tea, breakfast, croissants, burgers..."
            className="w-full bg-cream-50/70 border border-cream-300 rounded-2xl pl-10 pr-9 py-2.5 text-sm text-warmgray-900 placeholder:text-warmgray-400 focus:bg-white focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-500/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warmgray-400 hover:text-warmgray-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          
          {/* Veg / Non-Veg Toggle Pill */}
          <div className="inline-flex bg-cream-100 p-1 rounded-2xl border border-cream-200 text-xs">
            <button
              type="button"
              onClick={() => onDietaryChange('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-espresso-900 text-white shadow-soft'
                  : 'text-warmgray-600 hover:text-espresso-900'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => onDietaryChange('veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
                dietaryFilter === 'veg'
                  ? 'bg-sage-600 text-white shadow-soft'
                  : 'text-warmgray-600 hover:text-espresso-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sage-500 inline-block border border-white" />
              Veg Only
            </button>
            <button
              type="button"
              onClick={() => onDietaryChange('nonveg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
                dietaryFilter === 'nonveg'
                  ? 'bg-terracotta-600 text-white shadow-soft'
                  : 'text-warmgray-600 hover:text-espresso-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-terracotta-500 inline-block border border-white" />
              Non-Veg
            </button>
          </div>

          {/* Available Now Toggle */}
          <button
            type="button"
            onClick={() => onAvailabilityChange(!availabilityOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-semibold transition-all ${
              availabilityOnly
                ? 'bg-espresso-900 text-cream-50 border-espresso-900 shadow-soft'
                : 'bg-cream-50 border-cream-200 text-warmgray-700 hover:bg-cream-100'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center ${
                availabilityOnly ? 'bg-terracotta-400 border-terracotta-400 text-espresso-900' : 'border-warmgray-400'
              }`}
            >
              {availabilityOnly && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>Available Now</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-warmgray-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-cream-100 border border-cream-300 rounded-2xl px-3 py-2 text-xs font-semibold text-espresso-900 focus:outline-none focus:border-coffee-500 cursor-pointer"
            >
              <option value="popular">Popular First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs Scrollbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
        <button
          type="button"
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-espresso-900 text-cream-50 shadow-soft'
              : 'bg-cream-100 text-warmgray-700 hover:bg-cream-200 border border-cream-200'
          }`}
        >
          All Items
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-espresso-900 text-cream-50 shadow-soft'
                : 'bg-cream-100 text-warmgray-700 hover:bg-cream-200 border border-cream-200'
            }`}
          >
            <span>{cat.shortName || cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
