import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Badge from '../common/Badge';
import QuantitySelector from '../common/QuantitySelector';
import { formatPrice } from '../../utils/formatters';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const itemTotal = item.unitPrice * item.quantity;

  return (
    <div className="py-4 sm:py-5 border-b border-cream-200 flex gap-3 sm:gap-4 items-start sm:items-center justify-between">
      {/* Product Image & Info */}
      <div className="flex gap-3 sm:gap-4 items-start sm:items-center">
        <Link to={`/menu/${item.id}`} className="shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-cream-200 bg-cream-100"
          />
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant={item.isVeg ? 'veg' : 'nonveg'} />
            <Link
              to={`/menu/${item.id}`}
              className="text-sm sm:text-base font-serif font-semibold text-espresso-900 hover:text-coffee-600 transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
          </div>

          <div className="text-xs text-warmgray-500">
            <span>Unit: {formatPrice(item.unitPrice)}</span>
            {item.basePrice !== item.unitPrice && (
              <span className="text-coffee-600 ml-1.5">(incl. custom add-ons)</span>
            )}
          </div>

          {/* Add-ons list */}
          {item.selectedAddOns && item.selectedAddOns.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {item.selectedAddOns.map((addon) => (
                <span
                  key={addon.id}
                  className="text-[10px] bg-cream-200/90 text-warmgray-700 px-2 py-0.5 rounded-full font-medium"
                >
                  +{addon.name} ({formatPrice(addon.price)})
                </span>
              ))}
            </div>
          )}

          {/* Custom instructions */}
          {item.instructions && (
            <p className="text-[11px] italic text-warmgray-500">
              Note: "{item.instructions}"
            </p>
          )}
        </div>
      </div>

      {/* Stepper, Total & Remove */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-6 shrink-0">
        <QuantitySelector
          quantity={item.quantity}
          size="sm"
          onIncrease={() => onUpdateQuantity(item.key, 1)}
          onDecrease={() => onUpdateQuantity(item.key, -1)}
        />

        <div className="text-right min-w-[70px]">
          <span className="text-sm sm:text-base font-bold text-espresso-900">
            {formatPrice(itemTotal)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.key)}
          className="p-1.5 text-warmgray-400 hover:text-terracotta-600 transition-colors rounded-lg hover:bg-terracotta-100"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
