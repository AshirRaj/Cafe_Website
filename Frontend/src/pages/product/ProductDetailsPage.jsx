import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Flame,
  Check,
  ShoppingBag,
  Heart,
  Share2,
  Sparkles,
  Info,
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import RatingStars from '../../components/common/RatingStars';
import QuantitySelector from '../../components/common/QuantitySelector';
import Button from '../../components/common/Button';
import ProductCard from '../../components/product/ProductCard';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const product = useMemo(() => {
    return (
      PRODUCTS.find((p) => p.id === productId || p.slug === productId) ||
      PRODUCTS[0]
    );
  }, [productId]);

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  // Toggle Add-on checkbox
  const handleToggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Calculated Unit & Total Price
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = product.price + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAddOns, specialInstructions);
    addToast(
      `Added ${quantity}x ${product.name} to your cart (${formatPrice(totalPrice)})`,
      'success'
    );
  };

  // Related products
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  }, [product]);

  return (
    <div className="py-8 sm:py-14 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-warmgray-600 hover:text-espresso-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </button>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white rounded-3xl sm:rounded-[2.5rem] border border-cream-200/90 p-6 sm:p-10 lg:p-12 shadow-soft">
          
          {/* Left: Product Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-cream-100 border border-cream-200 shadow-soft h-[360px] sm:h-[460px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant={product.isVeg ? 'veg' : 'nonveg'} />
                {product.isPopular && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-espresso-900/90 text-cream-50 backdrop-blur-xs px-3 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5 text-terracotta-400" /> Bestseller
                  </span>
                )}
              </div>

              {/* Action Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsFavorited(!isFavorited);
                    addToast(isFavorited ? 'Removed from favorites' : 'Saved to favorites!', 'info');
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                    isFavorited
                      ? 'bg-terracotta-500 text-white'
                      : 'bg-white/90 text-warmgray-700 hover:text-terracotta-600'
                  }`}
                  aria-label="Save item"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* Micro Attributes */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-cream-50 p-3 rounded-2xl border border-cream-200">
                <span className="text-warmgray-500 block text-[10px] uppercase font-semibold">Prep Time</span>
                <span className="font-bold text-espresso-900 flex items-center justify-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-coffee-600" /> {product.prepTime || '5-8 mins'}
                </span>
              </div>
              <div className="bg-cream-50 p-3 rounded-2xl border border-cream-200">
                <span className="text-warmgray-500 block text-[10px] uppercase font-semibold">Calories</span>
                <span className="font-bold text-espresso-900 block mt-0.5">
                  {product.calories || '140 kcal'}
                </span>
              </div>
              <div className="bg-cream-50 p-3 rounded-2xl border border-cream-200">
                <span className="text-warmgray-500 block text-[10px] uppercase font-semibold">Diet Type</span>
                <span className="font-bold text-espresso-900 block mt-0.5">
                  {product.isVeg ? 'Vegetarian' : 'Non-Veg'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Customization Options */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-coffee-600">
                  {product.categoryName || product.category}
                </span>
                <RatingStars rating={product.rating} count={product.ratingCount} size="sm" />
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-espresso-900 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-espresso-900">
                  {formatPrice(unitPrice)}
                </span>
                {addOnsTotal > 0 && (
                  <span className="text-xs text-warmgray-500">
                    (Base {formatPrice(product.price)} + {formatPrice(addOnsTotal)} add-ons)
                  </span>
                )}
              </div>

              {/* Full Description */}
              <p className="text-sm text-warmgray-600 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Ingredients List */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mt-5 p-4 rounded-2xl bg-cream-50 border border-cream-200/90 text-xs">
                  <span className="font-bold text-warmgray-800 uppercase tracking-wider text-[10px] block mb-1.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-coffee-600" /> Pure Ingredients & Notes
                  </span>
                  <p className="text-warmgray-600 leading-normal">
                    {product.ingredients.join(' • ')}
                  </p>
                </div>
              )}

              {/* Add-ons Selector */}
              {product.addOns && product.addOns.length > 0 && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-warmgray-800">
                      Customize with Add-ons
                    </h3>
                    <span className="text-[11px] text-warmgray-500">Optional</span>
                  </div>

                  <div className="space-y-2">
                    {product.addOns.map((addon) => {
                      const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => handleToggleAddOn(addon)}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                            isChecked
                              ? 'bg-cream-100 border-coffee-500 text-espresso-900 shadow-xs'
                              : 'bg-white border-cream-200 text-warmgray-700 hover:bg-cream-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? 'bg-espresso-900 border-espresso-900 text-white'
                                  : 'border-warmgray-300 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span>{addon.name}</span>
                          </div>
                          <span className="font-bold text-espresso-900">
                            +{formatPrice(addon.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Barista Instructions */}
              <div className="mt-6 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-800">
                  Special Notes for Barista / Kitchen
                </label>
                <input
                  type="text"
                  placeholder="e.g. Less sugar, extra hot, no ice..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-cream-50/70 border border-cream-300 rounded-2xl px-3.5 py-2.5 text-xs text-warmgray-900 focus:bg-white focus:outline-none focus:border-coffee-500"
                />
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-6 border-t border-cream-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-xs font-semibold text-warmgray-600 sm:hidden">Quantity:</span>
                <QuantitySelector
                  quantity={quantity}
                  size="md"
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="flex-grow sm:flex-grow-0"
                icon={ShoppingBag}
                iconPosition="left"
              >
                Add to Cart • {formatPrice(totalPrice)}
              </Button>
            </div>
          </div>
        </div>

        {/* Pairing Suggestions */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <h3 className="text-2xl font-serif font-bold text-espresso-900 mb-6">
              Pairs Deliciously With
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
