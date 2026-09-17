import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Layers,
  Armchair,
  Users,
  Boxes,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  Store,
  X,
  Coffee
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const { orders, inventory } = useAdmin();

  // Active counts
  const pendingOrdersCount = orders.filter((o) => ['New', 'Preparing', 'Confirmed'].includes(o.status)).length;
  const lowStockCount = inventory.filter((i) => i.status === 'Low Stock').length;

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount, badgeColor: 'bg-terracotta-500' },
    { to: '/admin/menu', label: 'Menu Items', icon: UtensilsCrossed },
    { to: '/admin/categories', label: 'Categories', icon: Layers },
    { to: '/admin/tables', label: 'Tables', icon: Armchair },
    { to: '/admin/customers', label: 'Customers', icon: Users },
    { to: '/admin/inventory', label: 'Inventory', icon: Boxes, badge: lowStockCount, badgeColor: 'bg-amber-600' },
    { to: '/admin/payments', label: 'Payments', icon: CreditCard },
    { to: '/admin/expenses', label: 'Expenses', icon: Receipt },
    { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { to: '/admin/settings', label: 'Café Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-espresso-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-cream-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto shadow-soft ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="h-20 px-6 border-b border-cream-200/80 flex items-center justify-between">
            <NavLink to="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-espresso-800 text-cream-50 flex items-center justify-center shadow-soft group-hover:bg-coffee-600 transition-colors">
                <Coffee className="w-5 h-5 text-terracotta-400" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-lg text-espresso-800 leading-tight">Cafe Adda</h1>
                <span className="text-[11px] font-semibold text-coffee-600 tracking-wider uppercase">Bhubaneswar Admin</span>
              </div>
            </NavLink>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-warmgray-500 hover:bg-cream-100 hover:text-espresso-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-warmgray-600">
              Operations
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-espresso-800 text-cream-50 shadow-soft font-semibold'
                        : 'text-espresso-800 hover:bg-cream-100 hover:text-espresso-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-terracotta-400' : 'text-coffee-600 group-hover:text-espresso-800'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {Boolean(item.badge) && item.badge > 0 && (
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full text-white ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Storefront & Info Box */}
        <div className="p-4 border-t border-cream-200/80 bg-cream-50/50">
          <NavLink
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-200 text-xs font-semibold text-espresso-800 hover:bg-cream-100 shadow-sm transition-all"
          >
            <Store className="w-4 h-4 text-coffee-600" />
            <span>View Customer Website</span>
          </NavLink>
          <p className="text-[11px] text-center text-warmgray-600 mt-2 font-medium">
            Cafe Adda v1.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
