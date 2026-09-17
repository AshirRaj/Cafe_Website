import React from 'react';

export const StatusBadge = ({ status, type = 'order', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3.5 py-1.5 text-sm font-semibold'
  }[size] || 'px-2.5 py-1 text-xs font-medium';

  const getStyle = () => {
    const s = String(status).toLowerCase();

    // Order statuses
    if (s === 'new') {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (s === 'confirmed') {
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
    if (s === 'preparing') {
      return 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse';
    }
    if (s === 'ready') {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (s === 'completed') {
      return 'bg-sage-100 text-sage-700 border-sage-500/30';
    }
    if (s === 'cancelled' || s === 'failed') {
      return 'bg-terracotta-100 text-terracotta-700 border-terracotta-500/30';
    }

    // Table & Inventory statuses
    if (s === 'available' || s === 'in stock') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (s === 'occupied') {
      return 'bg-terracotta-100 text-terracotta-700 border-terracotta-500/30';
    }
    if (s === 'reserved') {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    if (s === 'low stock') {
      return 'bg-terracotta-100 text-terracotta-700 border-terracotta-500/30 font-semibold';
    }
    if (s === 'paid') {
      return 'bg-sage-100 text-sage-700 border-sage-500/30';
    }
    if (s === 'pending') {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    if (s === 'refunded') {
      return 'bg-gray-100 text-gray-700 border-gray-300';
    }

    // Fulfillment Types
    if (s === 'dine in') {
      return 'bg-coffee-100 text-coffee-700 border-coffee-300';
    }
    if (s === 'takeaway') {
      return 'bg-cream-200 text-espresso-800 border-cream-300';
    }
    if (s === 'delivery') {
      return 'bg-sage-100 text-sage-700 border-sage-500/30';
    }

    return 'bg-cream-100 text-espresso-700 border-cream-300';
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase font-sans ${sizeClasses} ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
};

export default StatusBadge;
