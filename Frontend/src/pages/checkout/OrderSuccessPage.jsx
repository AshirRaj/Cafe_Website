import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Utensils,
  ShoppingBag,
  Truck,
  ArrowRight,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, formatDate } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useCart();

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="py-20 text-center bg-cream-50 min-h-screen">
        <h2 className="text-2xl font-serif font-bold text-espresso-900 mb-2">
          Order Not Found
        </h2>
        <p className="text-xs text-warmgray-500 mb-6">
          We couldn't retrieve the details for order #{orderId}.
        </p>
        <Link to="/menu">
          <Button variant="primary">Explore Menu</Button>
        </Link>
      </div>
    );
  }

  const isDineIn = order.orderType === 'Dine In' || order.rawOrderType === 'dine-in';
  const isDelivery = order.orderType === 'Delivery' || order.rawOrderType === 'delivery';
  const isTakeaway = order.orderType === 'Takeaway' || order.rawOrderType === 'takeaway';

  return (
    <div className="py-12 sm:py-20 bg-cream-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-cream-200/90 p-6 sm:p-10 shadow-soft-lg space-y-6 text-center"
        >
          {/* Top Success Graphic */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center mx-auto border-4 border-white shadow-soft"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>

          {/* Heading */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sage-700 bg-sage-100/80 px-3.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso-900">
              Thank you, {order.customer?.name || 'Guest'}!
            </h1>
            <p className="text-sm text-warmgray-600 mt-1">
              Your order has been sent directly to the kitchen barista counter.
            </p>
          </div>

          {/* Order Details Ticket Box */}
          <div className="bg-cream-50 rounded-3xl p-6 border border-cream-200 text-left text-xs sm:text-sm space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-warmgray-500 block">Order Number</span>
                <span className="text-lg font-serif font-bold text-espresso-900 font-mono">
                  #{order.orderId}
                </span>
              </div>
              <Badge variant="coffee" size="md">
                {order.orderType}
              </Badge>
            </div>

            {/* Estimated Prep Time */}
            <div className="flex items-center justify-between">
              <span className="text-warmgray-600 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-coffee-600" /> Estimated Preparation Time:
              </span>
              <span className="font-bold text-espresso-900 font-sans">
                {order.preparationTimeEstimate || '15–20 minutes'}
              </span>
            </div>

            {/* Dine-In Table / Fulfillment */}
            {isDineIn && (
              <div className="flex items-center justify-between">
                <span className="text-warmgray-600 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-coffee-600" /> Dining Table:
                </span>
                <span className="font-bold text-espresso-900">
                  {order.table || 'Table 03 (Main Lounge)'}
                </span>
              </div>
            )}

            {isTakeaway && (
              <div className="flex items-center justify-between">
                <span className="text-warmgray-600 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-coffee-600" /> Pickup Window:
                </span>
                <span className="font-bold text-espresso-900">
                  {order.takeawayPickupTime || '15 minutes'}
                </span>
              </div>
            )}

            {isDelivery && (
              <div className="flex items-start justify-between gap-4">
                <span className="text-warmgray-600 flex items-center gap-1.5 shrink-0">
                  <Truck className="w-4 h-4 text-coffee-600" /> Deliver To:
                </span>
                <span className="font-medium text-espresso-900 text-right">
                  {order.customer?.address}, {order.customer?.city}
                </span>
              </div>
            )}

            {/* Total Paid */}
            <div className="flex items-center justify-between pt-3 border-t border-cream-200 text-base font-serif font-bold text-espresso-900">
              <span>Total Amount</span>
              <span className="font-sans font-bold text-lg text-espresso-900">
                {formatPrice(order.total || order.grandTotal)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to={`/orders/${order.orderId}`} className="w-full sm:w-auto flex-grow">
              <Button variant="primary" size="lg" className="w-full" icon={Receipt} iconPosition="left">
                Track Live Order
              </Button>
            </Link>
            <Link to="/menu" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                Continue Browsing
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
