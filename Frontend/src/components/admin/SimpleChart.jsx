import React from 'react';

export const SimpleBarChart = ({ data = [], height = 180, valuePrefix = '₹' }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.sales || 0), 1);

  return (
    <div className="w-full">
      <div className="flex items-end gap-2 sm:gap-4 justify-between pt-6 pb-2" style={{ height: `${height}px` }}>
        {data.map((item, index) => {
          const heightPercent = Math.round(((item.sales || 0) / maxValue) * 100);
          return (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-9 bg-espresso-900 text-cream-50 text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-soft z-10">
                {valuePrefix}{item.sales?.toLocaleString('en-IN')} ({item.orders} orders)
              </div>

              {/* Bar */}
              <div
                className="w-full max-w-[40px] bg-coffee-100 group-hover:bg-coffee-500 rounded-t-lg transition-all duration-300 relative overflow-hidden"
                style={{ height: `${Math.max(heightPercent, 6)}%` }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-coffee-600 to-coffee-400 opacity-90 rounded-t-lg"
                />
              </div>

              {/* Label */}
              <span className="text-[11px] font-medium text-warmgray-600 mt-2 truncate w-full text-center">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CategoryBreakdownBar = ({ categories = [] }) => {
  const colors = [
    'bg-coffee-600',
    'bg-terracotta-500',
    'bg-sage-600',
    'bg-amber-600',
    'bg-espresso-700',
    'bg-warmgray-500'
  ];

  return (
    <div className="space-y-3">
      <div className="h-3 w-full rounded-full overflow-hidden flex bg-cream-200">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`${colors[idx % colors.length]} h-full transition-all duration-500`}
            style={{ width: `${cat.percentage}%` }}
            title={`${cat.category}: ${cat.percentage}%`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${colors[idx % colors.length]}`} />
            <div className="truncate">
              <span className="text-warmgray-600 font-medium">{cat.category}</span>
              <span className="text-espresso-800 font-bold ml-1">({cat.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;
