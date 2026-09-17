import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';
import SectionHeading from '../../components/common/SectionHeading';
import Button from '../../components/common/Button';
import { ArrowRight } from 'lucide-react';

export const PopularPicks = () => {
  // Filter popular items
  const popularItems = PRODUCTS.filter((p) => p.isPopular).slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-cream-100/50 border-y border-cream-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            subtitle="Guest Favorites"
            title="Customer Favorites"
            description="Our most cherished coffees and artisanal bites, handcrafted daily."
            align="left"
            className="mb-0"
          />
          <Link to="/menu" className="self-start md:self-auto">
            <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
              View Complete Menu
            </Button>
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPicks;
