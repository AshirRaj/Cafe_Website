import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, X, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';
import Button from '../common/Button';

export const CartSummary = ({ showCheckoutButton = true }) => {
  const {
    subtotal,
    discountAmount,
    appliedOffer,
    tax,
    deliveryFee,
    grandTotal,
    applyPromoCode,
    removePromoCode,
    orderType,
  } = useCart();

  const { addToast } = useToast();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyPromoCode(couponCode);
    if (res.success) {
      addToast(res.message, 'success');
      setCouponCode('');
    } else {
      addToast(res.message, 'error');
    }
  };

  const handleRemoveCoupon = () => {
    removePromoCode();
    addToast('Coupon removed', 'info');
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-7 shadow-soft space-y-5">
      <h3 className="text-lg font-serif font-semibold text-espresso-900 pb-3 border-b border-cream-200">
        Bill Summary
      </h3>

      {/* Free delivery bar if delivery is selected */}
      {orderType === 'delivery' && (
        <div className="p-3 bg-cream-100/80 rounded-2xl border border-cream-200 text-xs">
          <div className="flex items-center gap-2 mb-1.5 text-warmgray-700 font-medium">
            <Truck className="w-4 h-4 text-coffee-600" />
            {subtotal >= 500 ? (
              <span className="text-sage-700 font-semibold">🎉 You unlocked FREE doorstep delivery!</span>
            ) : (
              <span>
                Add <strong>{formatPrice(500 - subtotal)}</strong> more for FREE delivery
              </span>
            )}
          </div>
          <div className="w-full bg-cream-300 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-coffee-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Promo Code Input */}
      <form onSubmit={handleApplyCoupon} className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-warmgray-700">
          Have a Promo Code?
        </label>
        {appliedOffer ? (
          <div className="flex items-center justify-between p-3 bg-sage-100 border border-sage-600/30 rounded-2xl text-xs">
            <div className="flex items-center gap-2 text-sage-800 font-semibold">
              <Tag className="w-4 h-4 text-sage-600" />
              <span>{appliedOffer.code}</span>
              <span className="font-normal text-sage-700 text-[11px]">
                (-{formatPrice(discountAmount)})
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-warmgray-500 hover:text-terracotta-600 p-1"
              aria-label="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. AFTERNOON20"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="w-full bg-cream-50 border border-cream-300 rounded-2xl px-3.5 py-2 text-xs uppercase tracking-wider text-warmgray-900 focus:outline-none focus:border-coffee-500"
            />
            <Button type="submit" variant="secondary" size="sm" className="shrink-0">
              Apply
            </Button>
          </div>
        )}
      </form>

      {/* Financial Breakdown */}
      <div className="space-y-2.5 pt-2 border-t border-cream-200 text-sm">
        <div className="flex justify-between text-warmgray-600">
          <span>Items Subtotal</span>
          <span className="font-medium text-warmgray-900">{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-sage-700 font-medium">
            <span>Special Discount</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-warmgray-600">
          <span className="flex items-center gap-1">
            <span>GST / Taxes</span>
            <span className="text-[11px] text-warmgray-600">(5%)</span>
          </span>
          <span className="font-medium text-warmgray-900">{formatPrice(tax)}</span>
        </div>

        {orderType === 'delivery' && (
          <div className="flex justify-between text-warmgray-600">
            <span>Delivery Fee</span>
            <span className="font-medium text-warmgray-900">
              {deliveryFee === 0 ? <span className="text-sage-700 font-semibold">FREE</span> : formatPrice(deliveryFee)}
            </span>
          </div>
        )}

        <div className="pt-3 border-t border-cream-200 flex justify-between items-baseline">
          <span className="font-serif text-base font-semibold text-espresso-900">Grand Total</span>
          <span className="text-xl font-bold text-espresso-900">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <div className="pt-2">
          <Link to="/checkout" className="w-full block">
            <Button variant="primary" size="lg" className="w-full" icon={ArrowRight} iconPosition="right">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-warmgray-600 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-coffee-600" />
        <span>Freshly prepared on demand with contactless hygiene</span>
      </div>
    </div>
  );
};

export default CartSummary;
