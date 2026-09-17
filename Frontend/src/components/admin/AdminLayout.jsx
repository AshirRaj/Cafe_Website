import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname === '/admin') return 'Café Dashboard';
    if (pathname.startsWith('/admin/orders/')) return 'Order Details';
    if (pathname === '/admin/orders') return 'Order Management';
    if (pathname === '/admin/menu/add') return 'Add New Menu Item';
    if (pathname.includes('/edit')) return 'Edit Menu Item';
    if (pathname === '/admin/menu') return 'Café Menu Management';
    if (pathname === '/admin/categories') return 'Category Directory';
    if (pathname === '/admin/tables') return 'Table Occupancy & Layout';
    if (pathname === '/admin/customers') return 'Customer Directory';
    if (pathname === '/admin/inventory') return 'Café Inventory & Stock';
    if (pathname === '/admin/payments') return 'Payment Records & Logs';
    if (pathname === '/admin/expenses') return 'Café Operating Expenses';
    if (pathname === '/admin/reports') return 'Sales & Performance Reports';
    if (pathname === '/admin/settings') return 'Café Operational Settings';
    return 'Café Admin';
  };

  return (
    <div className="min-h-screen bg-cream-50 flex font-sans text-espresso-800 antialiased selection:bg-coffee-100 selection:text-espresso-800">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          title={getPageTitle(location.pathname)}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
