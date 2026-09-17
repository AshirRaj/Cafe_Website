import React from 'react';
import { Utensils, ShoppingBag, Truck } from 'lucide-react';

export const OrderTypeSelector = ({ selectedType, onSelectType }) => {
  const options = [
    {
      id: 'dine-in',
      title: 'Dine In',
      subtitle: 'Table Service',
      desc: 'Contactless order served directly at your table',
      icon: Utensils,
    },
    {
      id: 'takeaway',
      title: 'Takeaway',
      subtitle: 'Counter Pickup',
      desc: 'Freshly packed & ready when you arrive',
      icon: ShoppingBag,
    },
    {
      id: 'delivery',
      title: 'Delivery',
      subtitle: 'Doorstep Drop',
      desc: 'Hot & insulated delivery (30-40 mins)',
      icon: Truck,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-warmgray-700">
          Select Order Type
        </label>
        <span className="text-[11px] text-coffee-600 font-medium">Step 1 of 3</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isSelected = selectedType === opt.id;
          const Icon = opt.icon;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectType(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-espresso-900 text-cream-50 border-espresso-900 shadow-soft ring-2 ring-coffee-500/20'
                  : 'bg-cream-50/70 border-cream-200 text-warmgray-800 hover:bg-cream-100 hover:border-cream-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-coffee-600 text-white' : 'bg-cream-200 text-espresso-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-terracotta-500 text-white">
                    Selected
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base">{opt.title}</h4>
                <p className={`text-[11px] font-medium mt-0.5 ${isSelected ? 'text-coffee-300' : 'text-coffee-600'}`}>
                  {opt.subtitle}
                </p>
                <p className={`text-[10px] mt-1 leading-tight ${isSelected ? 'text-cream-200/80' : 'text-warmgray-500'}`}>
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTypeSelector;
