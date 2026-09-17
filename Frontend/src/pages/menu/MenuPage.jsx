import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import SectionHeading from '../../components/common/SectionHeading';
import ProductFilters from '../../components/product/ProductFilters';
import ProductGrid from '../../components/product/ProductGrid';

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'nonveg'
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'rating'

  // Synchronize state with URL category parameter
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDietaryFilter('all');
    setAvailabilityOnly(false);
    setSortBy('popular');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Real-time filtering and sorting calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !product.isVeg) return false;
      if (dietaryFilter === 'nonveg' && product.isVeg) return false;

      // Availability filter
      if (availabilityOnly && !product.isAvailable) return false;

      // Search query filter across name, ingredients, category, and description
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description?.toLowerCase().includes(query);
        const matchesCat = product.categoryName?.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
        const matchesIngredients = product.ingredients?.some((i) => i.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesIngredients) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      return 0;
    });
  }, [selectedCategory, dietaryFilter, availabilityOnly, searchQuery, sortBy]);

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <SectionHeading
          subtitle="Handcrafted Selections"
          title="The Artisan Menu"
          description="Explore our specialty coffees, slow cold brews, freshly baked Viennoiserie, gourmet sandwiches, and all-day delicacies."
        />

        {/* Filter Controls Component */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          dietaryFilter={dietaryFilter}
          onDietaryChange={setDietaryFilter}
          availabilityOnly={availabilityOnly}
          onAvailabilityChange={setAvailabilityOnly}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredProducts.length}
        />

        {/* Status Count & Reset shortcut */}
        <div className="flex items-center justify-between mb-6 text-xs text-warmgray-500 px-1">
          <span>
            Showing <strong className="text-espresso-900">{filteredProducts.length}</strong> delicacies
          </span>
          {(searchQuery || selectedCategory !== 'all' || dietaryFilter !== 'all' || availabilityOnly) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-terracotta-600 hover:underline font-semibold"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Product Grid Component */}
        <ProductGrid
          products={filteredProducts}
          onResetFilters={handleResetFilters}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default MenuPage;
