import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-warmgray-900 font-sans selection:bg-coffee-100 selection:text-coffee-700">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
