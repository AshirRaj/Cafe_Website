import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Coffee,
  CheckCircle2,
  Clock,
  Printer,
  ShoppingBag,
  Phone,
  ArrowLeft,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import OrderTimeline from '../../components/order/OrderTimeline';
import OrderSummaryCard from '../../components/order/OrderSummaryCard';
import Button from '../../components/common/Button';
import { IMAGES } from '../../assets/images/imageRegistry';

export const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { getOrderById, updateOrderStatus } = useCart();
  const { addToast } = useToast();

  const [order, setOrder] = useState(() => {
    const existing = getOrderById(orderId);
    if (existing) return existing;

    // Realistic fallback mock order for direct link testing
    return {
      orderId: orderId || 'CAF1025',
      createdAt: new Date().toISOString(),
      status: 'PREPARING',
      orderType: 'Dine In',
      rawOrderType: 'dine-in',
      table: 'T04',
      customer: {
        name: 'Ashirvad Roy',
        phone: '+91 98450 12345',
        email: 'ashirvad@example.com',
        notes: 'Extra napkins requested',
      },
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      items: [
        {
          id: 'cappuccino-classic',
          name: 'Artisan Cappuccino',
          image: IMAGES.cappuccino,
          unitPrice: 260,
          quantity: 2,
          selectedAddOns: [{ id: 'extra-shot', name: 'Extra Shot', price: 40 }],
        },
        {
          id: 'chocolate-fudge-brownie',
          name: 'Belgian Chocolate Fudge Brownie',
          image: IMAGES.chocolateFudgeBrownie,
          unitPrice: 210,
          quantity: 1,
          selectedAddOns: [],
        },
      ],
      subtotal: 730,
      discountAmount: 146,
      appliedOfferCode: 'AFTERNOON20',
      tax: 29,
      deliveryFee: 0,
      grandTotal: 613,
      total: 613,
      estimatedTimeMinutes: 12,
    };
  });

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleSimulateStatus = (newStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
    updateOrderStatus(order.orderId, newStatus);
    addToast(`Order status updated to: ${newStatus}`, 'info');
  };

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-semibold text-warmgray-600 hover:text-espresso-900 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Menu
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso-900">
                Order Tracking
              </h1>
              <span className="text-xs font-mono font-bold bg-espresso-900 text-cream-50 px-3 py-1 rounded-full">
                #{order.orderId}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              icon={Printer}
              iconPosition="left"
              onClick={handlePrintReceipt}
            >
              Print Receipt
            </Button>
            <Link to="/menu">
              <Button variant="primary" size="sm">
                Order More
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Timeline Tracker */}
        <div className="mb-8">
          <OrderTimeline
            initialStatus={order.status}
            onStatusChange={handleSimulateStatus}
          />
        </div>

        {/* Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Summary Receipt Card */}
          <div className="lg:col-span-8">
            <OrderSummaryCard order={order} />
          </div>

          {/* Right: Assistance & ETA Box */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Prep Card */}
            <div className="bg-espresso-900 text-cream-50 rounded-3xl p-6 sm:p-7 shadow-elevated border border-espresso-800 space-y-4">
              <div className="flex items-center gap-2 text-terracotta-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Freshly Handcrafted
              </div>
              <h3 className="text-xl font-serif font-bold">
                Estimated Service Time: <br />
                <span className="text-terracotta-300 font-sans">
                  ~{order.estimatedTimeMinutes} minutes
                </span>
              </h3>
              <p className="text-xs text-cream-200/80 leading-relaxed">
                Your order is being prepared with single-origin beans and freshly baked artisan ingredients. Our team is serving you shortly.
              </p>
            </div>

            {/* Assistance card */}
            <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-4 text-xs">
              <h4 className="font-serif font-bold text-espresso-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-coffee-600" /> Need Barista Assistance?
              </h4>
              <p className="text-warmgray-600 leading-relaxed">
                If you need water refill, cutlery, or want to modify your dine-in request, feel free to notify our floor staff or call the barista counter.
              </p>
              <div className="pt-2 flex items-center gap-2 text-espresso-900 font-semibold">
                <Phone className="w-4 h-4 text-terracotta-500" />
                <span>+91 (80) 4920-8822 (Counter)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
