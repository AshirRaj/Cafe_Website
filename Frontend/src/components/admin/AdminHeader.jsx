import React, { useState, useEffect } from 'react';
import { Menu, Bell, Clock, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminHeader = ({ onOpenSidebar, title }) => {
  const { orders, inventory, resetToDefaults } = useAdmin();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [showNotifications, setShowNotifications] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const pendingOrders = orders.filter((o) => ['New', 'Preparing', 'Confirmed'].includes(o.status));
  const lowStockItems = inventory.filter((i) => i.status === 'Low Stock');

  const handleResetData = () => {
    if (window.confirm('Reset all admin modifications back to sample defaults?')) {
      resetToDefaults();
      setToastMessage('Mock data restored to defaults');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  return (
    <header className="h-20 bg-white/90 backdrop-blur-md border-b border-cream-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-espresso-800 hover:bg-cream-100 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-espresso-800 capitalize">
            {title || 'Café Dashboard'}
          </h2>
          <div className="flex items-center gap-2 text-xs text-warmgray-600 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Café Open & Accepting Orders</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Reset mock data button */}
        <button
          onClick={handleResetData}
          title="Reset sample data"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cream-300 text-xs font-semibold text-warmgray-600 hover:text-espresso-800 hover:bg-cream-100 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Data</span>
        </button>

        {/* Live Clock */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cream-100 text-xs font-semibold text-espresso-800 border border-cream-200">
          <Clock className="w-3.5 h-3.5 text-coffee-600" />
          <span>{currentTime}</span>
        </div>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-cream-50 hover:bg-cream-100 text-espresso-800 border border-cream-200 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {(pendingOrders.length > 0 || lowStockItems.length > 0) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta-500" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-soft-xl border border-cream-200 p-4 z-50 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-cream-100">
                <h4 className="font-serif font-bold text-sm text-espresso-800">Operational Alerts</h4>
                <span className="text-[11px] font-semibold text-coffee-600">
                  {pendingOrders.length + lowStockItems.length} active
                </span>
              </div>

              <div className="py-2 space-y-2 max-h-64 overflow-y-auto">
                {pendingOrders.map((ord) => (
                  <div key={ord.id} className="p-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs">
                    <div className="flex justify-between font-bold text-espresso-800">
                      <span>Order #{ord.id}</span>
                      <span className="text-terracotta-600 font-semibold">{ord.status}</span>
                    </div>
                    <p className="text-warmgray-600 text-[11px] mt-0.5">
                      {ord.customer?.name} • ₹{ord.total} • {ord.orderType}
                    </p>
                  </div>
                ))}

                {lowStockItems.map((item) => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                    <div className="flex justify-between font-bold text-amber-900">
                      <span>Low Stock Alert</span>
                      <span>{item.currentStock} {item.unit}</span>
                    </div>
                    <p className="text-amber-800 text-[11px] mt-0.5">
                      {item.item} is below min threshold ({item.minimumStock} {item.unit}).
                    </p>
                  </div>
                ))}

                {pendingOrders.length === 0 && lowStockItems.length === 0 && (
                  <p className="text-center py-4 text-xs text-warmgray-500">All systems smooth. No pending alerts.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Staff Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-cream-200">
          <div className="w-9 h-9 rounded-full bg-espresso-800 text-cream-50 flex items-center justify-center font-bold text-xs shadow-soft border border-espresso-700">
            MG
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-espresso-800 leading-none">Café Manager</p>
            <span className="text-[10px] text-warmgray-600 font-medium">Duty Staff</span>
          </div>
        </div>
      </div>

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-espresso-900 text-cream-50 px-4 py-2.5 rounded-xl shadow-soft-xl flex items-center gap-2 text-xs font-semibold z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-sage-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
