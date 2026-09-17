import React from 'react';
import { TIME_SLOTS } from '../../data/reservations';
import { Clock, Check } from 'lucide-react';

export const TimeSlotPicker = ({ selectedSlot, onSelectSlot, error }) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-warmgray-700 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-coffee-600" /> Select Seating Time Slot *
        </label>
        <span className="text-[11px] text-coffee-600 font-medium">90 min table duration</span>
      </div>

      {error && <p className="text-xs text-terracotta-600 font-semibold">{error}</p>}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
        {TIME_SLOTS.map((slot) => {
          const isSelected = selectedSlot === slot;

          return (
            <button
              key={slot}
              type="button"
              onClick={() => onSelectSlot(slot)}
              className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                isSelected
                  ? 'bg-espresso-900 text-cream-50 border-espresso-900 shadow-soft ring-2 ring-coffee-500/30'
                  : 'bg-white border-cream-200 text-warmgray-700 hover:bg-cream-100 hover:border-cream-300'
              }`}
            >
              <span>{slot}</span>
              {isSelected && <Check className="w-3 h-3 text-terracotta-400 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
