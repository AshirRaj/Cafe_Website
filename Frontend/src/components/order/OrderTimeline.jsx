import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Utensils, CheckCircle, PackageCheck, Sparkles } from 'lucide-react';

const STAGES = [
  { id: 'PLACED', label: 'Order Placed', desc: 'Received in our system', icon: CheckCircle2 },
  { id: 'CONFIRMED', label: 'Confirmed', desc: 'Kitchen accepted your order', icon: CheckCircle },
  { id: 'PREPARING', label: 'Brewing & Cooking', desc: 'Barista is crafting your order', icon: Utensils },
  { id: 'READY', label: 'Ready for Service', desc: 'Plated and ready to enjoy', icon: PackageCheck },
  { id: 'SERVED', label: 'Served & Completed', desc: 'Enjoy your meal!', icon: Sparkles },
];

export const OrderTimeline = ({ initialStatus = 'PREPARING', onStatusChange }) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(2); // Starts at 'PREPARING' for live demo feel

  // Allow guest to simulate next steps
  const advanceStage = () => {
    if (currentStatusIndex < STAGES.length - 1) {
      const nextIndex = currentStatusIndex + 1;
      setCurrentStatusIndex(nextIndex);
      onStatusChange && onStatusChange(STAGES[nextIndex].id);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-8 shadow-soft">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-6 border-b border-cream-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-600">
            Live Kitchen Tracking
          </span>
          <h3 className="text-xl font-serif font-semibold text-espresso-900 mt-0.5">
            {STAGES[currentStatusIndex].label}
          </h3>
        </div>
        
        {currentStatusIndex < STAGES.length - 1 && (
          <button
            onClick={advanceStage}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-200 hover:bg-cream-300 text-espresso-900 transition-colors"
          >
            Simulate Next Kitchen Step →
          </button>
        )}
      </div>

      {/* Progress Stepper */}
      <div className="relative pt-8 pb-4">
        {/* Desktop / Tablet Horizontal Stepper */}
        <div className="hidden md:grid grid-cols-5 gap-2 relative z-10">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStatusIndex;
            const isCurrent = idx === currentStatusIndex;
            const isUpcoming = idx > currentStatusIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="flex flex-col items-center text-center">
                <motion.div
                  animate={{
                    scale: isCurrent ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-sage-600 text-white shadow-soft'
                      : isCurrent
                      ? 'bg-espresso-900 text-cream-50 ring-4 ring-coffee-500/20 shadow-elevated'
                      : 'bg-cream-200 text-warmgray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>

                <h4
                  className={`mt-3 text-xs font-bold leading-tight ${
                    isUpcoming ? 'text-warmgray-400' : 'text-espresso-900'
                  }`}
                >
                  {stage.label}
                </h4>
                <p className="text-[11px] text-warmgray-500 mt-0.5 max-w-[110px] leading-tight">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Stepper */}
        <div className="md:hidden space-y-6 relative z-10 pl-2">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStatusIndex;
            const isCurrent = idx === currentStatusIndex;
            const isUpcoming = idx > currentStatusIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    isCompleted
                      ? 'bg-sage-600 text-white'
                      : isCurrent
                      ? 'bg-espresso-900 text-cream-50 ring-4 ring-coffee-500/20'
                      : 'bg-cream-200 text-warmgray-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4
                    className={`text-sm font-bold ${
                      isUpcoming ? 'text-warmgray-400' : 'text-espresso-900'
                    }`}
                  >
                    {stage.label}
                  </h4>
                  <p className="text-xs text-warmgray-500 mt-0.5">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
