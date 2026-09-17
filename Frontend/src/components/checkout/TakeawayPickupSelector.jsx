import React from 'react';
import { Clock, Check } from 'lucide-react';

export const TakeawayPickupSelector = ({ selectedTime, onSelectTime }) => {
  const timeOptions = [
    { id: 'ASAP', label: 'ASAP', estimate: '~10-12 mins' },
    { id: '15 minutes', label: 'In 15 Minutes', estimate: '~15 mins' },
    { id: '30 minutes', label: 'In 30 Minutes', estimate: '~30 mins' },
    { id: '45 minutes', label: 'In 45 Minutes', estimate: '~45 mins' },
  ];

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-warmgray-700">
          Estimated Counter Pickup Time
        </label>
        <span className="text-[11px] text-coffee-600 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Freshly brewed on arrival
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {timeOptions.map((opt) => {
          const isSelected = selectedTime === opt.id || (opt.id === '15 minutes' && !selectedTime);

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectTime(opt.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-coffee-600 text-white border-coffee-600 shadow-soft ring-2 ring-coffee-500/20'
                  : 'bg-white border-cream-200 text-warmgray-800 hover:bg-cream-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-serif font-bold text-sm">{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-terracotta-300" />}
              </div>
              <span className={`text-[10px] mt-1 ${isSelected ? 'text-cream-200' : 'text-warmgray-500'}`}>
                {opt.estimate}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TakeawayPickupSelector;
