import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';
import Badge from '../common/Badge';
import RatingStars from '../common/RatingStars';
import AddToCartButton from './AddToCartButton';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleQuickAdd = () => {
    addToCart(product, 1);
    addToast(`Added 1x ${product.name} to your cart`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-white rounded-3xl border border-cream-200/90 shadow-soft hover:shadow-soft-lg hover:border-coffee-300/60 overflow-hidden flex flex-col h-full transition-all duration-300"
    >
      {/* Product Image Container */}
      <div
        onClick={() => navigate(`/menu/${product.id}`)}
        className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer bg-cream-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <Badge variant={product.isVeg ? 'veg' : 'nonveg'} />
          {product.isPopular && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-espresso-900/90 text-cream-50 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-soft">
              <Flame className="w-3 h-3 text-terracotta-400" /> Popular
            </span>
          )}
        </div>

        {/* Prep time badge */}
        {product.prepTime && (
          <div className="absolute bottom-2.5 right-2.5 bg-espresso-900/80 backdrop-blur-xs text-cream-100 text-[10px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1">
            <Clock className="w-3 h-3 text-coffee-300" /> {product.prepTime}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-coffee-600">
              {product.categoryName || product.category}
            </span>
            <RatingStars rating={product.rating} count={product.ratingCount} size="xs" />
          </div>

          {/* Title */}
          <Link to={`/menu/${product.id}`} className="block group-hover:text-coffee-600 transition-colors">
            <h3 className="text-base sm:text-lg font-serif font-semibold text-espresso-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-warmgray-600 line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Bottom Price & Add to Cart */}
        <div className="pt-4 mt-3 border-t border-cream-200/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-warmgray-600">Price</span>
            <span className="text-base sm:text-lg font-bold text-espresso-900 font-sans">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/menu/${product.id}`}
              className="text-xs font-semibold text-warmgray-600 hover:text-espresso-900 underline-offset-2 hover:underline px-1 py-1"
            >
              Details
            </Link>
            <AddToCartButton onClick={handleQuickAdd} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
