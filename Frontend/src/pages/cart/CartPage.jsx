import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import EmptyCart from '../../components/cart/EmptyCart';
import Button from '../../components/common/Button';

export const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItemsCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24 bg-cream-50 min-h-screen">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb / Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-semibold text-warmgray-600 hover:text-espresso-900 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Browsing Menu
            </Link>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso-900">
              Your Order Basket ({totalItemsCount})
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-warmgray-500 hover:text-terracotta-600 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Items
          </button>
        </div>

        {/* Layout: Items List & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items Container */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-8 shadow-soft divide-y divide-cream-200">
            {items.map((item) => (
              <CartItem
                key={item.key}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Bill Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <CartSummary showCheckoutButton={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
