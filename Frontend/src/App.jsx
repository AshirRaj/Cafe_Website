import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { ReservationProvider } from './context/ReservationContext';
import { AdminProvider } from './context/AdminContext';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AdminProvider>
          <CartProvider>
            <ReservationProvider>
              <AppRoutes />
            </ReservationProvider>
          </CartProvider>
        </AdminProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
