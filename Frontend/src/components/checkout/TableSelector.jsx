import React from 'react';
import { TABLES } from '../../data/tables';
import { Users, Armchair, Lock } from 'lucide-react';

export const TableSelector = ({ selectedTable, onSelectTable, error }) => {
  return (
    <div className="space-y-3 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-warmgray-700 block">
            Select Your Dining Table
          </label>
          <p className="text-[11px] text-warmgray-500">
            Only tables marked as <strong className="text-sage-700">Available</strong> can be selected.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] font-medium text-warmgray-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sage-500" /> Available
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-warmgray-400" /> Occupied
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Reserved
          </span>
        </div>
      </div>

      {error && <p className="text-xs text-terracotta-600 font-semibold">{error}</p>}

      {/* Tables Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {TABLES.map((tbl) => {
          const isAvailable = tbl.status === 'Available';
          const isSelected = selectedTable === tbl.number || selectedTable === tbl.id;

          return (
            <button
              key={tbl.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectTable(tbl.number || tbl.id)}
              className={`relative p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[95px] ${
                !isAvailable
                  ? 'bg-warmgray-100 border-cream-200 opacity-60 cursor-not-allowed text-warmgray-500'
                  : isSelected
                  ? 'bg-coffee-600 text-white border-coffee-600 shadow-soft ring-2 ring-coffee-500/30'
                  : 'bg-white border-cream-200 text-warmgray-800 hover:bg-cream-50 hover:border-coffee-400'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-serif font-bold text-base">{tbl.number}</span>
                {isSelected ? (
                  <span className="w-2 h-2 rounded-full bg-terracotta-300" />
                ) : !isAvailable ? (
                  <Lock className="w-3 h-3 text-warmgray-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-sage-500" />
                )}
              </div>

              <div>
                <p className={`text-[11px] font-semibold truncate ${isSelected ? 'text-cream-100' : 'text-warmgray-800'}`}>
                  {tbl.section}
                </p>
                <p className={`text-[10px] flex items-center gap-1 mt-0.5 ${isSelected ? 'text-cream-200/80' : 'text-warmgray-500'}`}>
                  <Users className="w-3 h-3" /> {tbl.capacity}
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-1">
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                    isSelected
                      ? 'bg-espresso-900 text-cream-50'
                      : tbl.status === 'Available'
                      ? 'bg-sage-100 text-sage-700'
                      : tbl.status === 'Occupied'
                      ? 'bg-warmgray-200 text-warmgray-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isSelected ? 'Selected' : tbl.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TableSelector;
