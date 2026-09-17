import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Customer Layout & Pages
import Layout from '../components/layout/Layout';
import HomePage from '../pages/home/HomePage';
import MenuPage from '../pages/menu/MenuPage';
import ProductDetailsPage from '../pages/product/ProductDetailsPage';
import CartPage from '../pages/cart/CartPage';
import CheckoutPage from '../pages/checkout/CheckoutPage';
import OrderSuccessPage from '../pages/checkout/OrderSuccessPage';
import OrderTrackingPage from '../pages/orders/OrderTrackingPage';
import OffersPage from '../pages/offers/OffersPage';
import AboutPage from '../pages/about/AboutPage';
import ContactPage from '../pages/contact/ContactPage';
import ReservationPage from '../pages/reservation/ReservationPage';

// Admin Layout & Pages
import AdminLayout from '../components/admin/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import OrdersListPage from '../pages/admin/OrdersListPage';
import AdminOrderDetailPage from '../pages/admin/AdminOrderDetailPage';
import AdminMenuPage from '../pages/admin/AdminMenuPage';
import AddEditProductPage from '../pages/admin/AddEditProductPage';
import AdminCategoriesPage from '../pages/admin/AdminCategoriesPage';
import AdminTablesPage from '../pages/admin/AdminTablesPage';
import AdminCustomersPage from '../pages/admin/AdminCustomersPage';
import AdminInventoryPage from '../pages/admin/AdminInventoryPage';
import AdminPaymentsPage from '../pages/admin/AdminPaymentsPage';
import AdminExpensesPage from '../pages/admin/AdminExpensesPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Storefront Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="menu/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
        <Route path="orders/:orderId" element={<OrderTrackingPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="reservation" element={<ReservationPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="orders" element={<OrdersListPage />} />
        <Route path="orders/:orderId" element={<AdminOrderDetailPage />} />
        <Route path="menu" element={<AdminMenuPage />} />
        <Route path="menu/add" element={<AddEditProductPage />} />
        <Route path="menu/:productId/edit" element={<AddEditProductPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="tables" element={<AdminTablesPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="expenses" element={<AdminExpensesPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
