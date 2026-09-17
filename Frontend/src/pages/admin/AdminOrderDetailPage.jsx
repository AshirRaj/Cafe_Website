import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  AlertCircle,
  CreditCard,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/admin/StatusBadge';

export const AdminOrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAdmin();

  const order = orders.find((o) => String(o.id) === String(orderId)) || orders[0];

  const [notification, setNotification] = useState('');

  if (!order) {
    return (
      <div className="text-center py-16">
        <h3 className="font-serif font-bold text-xl text-espresso-800">Order Not Found</h3>
        <p className="text-sm text-warmgray-600 mt-2">The requested order #{orderId} does not exist.</p>
        <Link
          to="/admin/orders"
          className="mt-4 inline-block px-5 py-2.5 bg-espresso-800 text-cream-50 rounded-xl text-xs font-bold"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const orderStatuses = ['New', 'Confirmed', 'Preparing', 'Ready', 'Completed'];

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(order.id, newStatus);
    setNotification(`Status updated to "${newStatus}"`);
    setTimeout(() => setNotification(''), 2500);
  };

  const currentStatusIndex = orderStatuses.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/admin/orders')}
          className="inline-flex items-center gap-2 text-xs font-bold text-warmgray-600 hover:text-espresso-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-cream-300 text-xs font-bold text-espresso-800 hover:bg-cream-100 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4 text-coffee-600" />
            <span>Print Kitchen Ticket</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-sage-100 border border-sage-500/30 rounded-2xl text-sage-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sage-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-200/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-espresso-800">
                Order #{order.id}
              </h2>
              <StatusBadge status={order.status} type="order" size="md" />
            </div>
            <p className="text-xs text-warmgray-600 mt-1">
              Placed on {order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN') : 'Today at ' + order.time}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-warmgray-600">Quick Update:</span>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-cream-300 bg-cream-50 text-espresso-800 focus:outline-none focus:ring-2 focus:ring-coffee-500"
            >
              <option value="New">New</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Live Status Progression Stepper */}
        {order.status !== 'Cancelled' ? (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmgray-600 mb-4">
              Kitchen Workflow Progression
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {orderStatuses.map((st, idx) => {
                const isPassed = currentStatusIndex >= idx;
                const isCurrent = order.status === st;

                return (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      isCurrent
                        ? 'bg-espresso-800 text-cream-50 border-espresso-800 shadow-soft font-bold'
                        : isPassed
                        ? 'bg-sage-50 text-sage-800 border-sage-200 font-semibold'
                        : 'bg-cream-50/60 text-warmgray-600 border-cream-200 hover:bg-cream-100'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCurrent
                          ? 'bg-terracotta-500 text-white'
                          : isPassed
                          ? 'bg-sage-600 text-white'
                          : 'bg-cream-200 text-warmgray-600'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-xs">{st}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-terracotta-100 border border-terracotta-200 text-terracotta-800 text-xs font-medium">
            This order was marked as <strong>Cancelled</strong>.
          </div>
        )}

        {/* Details Grid: Customer & Fulfillment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-cream-50/60 p-6 rounded-2xl border border-cream-200">
          {/* Customer Details */}
          <div>
            <h4 className="font-serif font-bold text-sm text-espresso-800 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-coffee-600" />
              <span>Customer Information</span>
            </h4>
            <div className="space-y-1.5 text-xs text-warmgray-700">
              <p className="font-bold text-espresso-800 text-sm">{order.customer?.name}</p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-warmgray-400" />
                <span>{order.customer?.phone}</span>
              </p>
              {order.customer?.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-warmgray-400" />
                  <span>{order.customer?.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Fulfillment details */}
          <div>
            <h4 className="font-serif font-bold text-sm text-espresso-800 mb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-coffee-600" />
              <span>Fulfillment & Table</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-warmgray-600 font-medium">Type:</span>
                <StatusBadge status={order.orderType} type="fulfillment" size="sm" />
              </div>
              {order.tableNo && (
                <p className="font-bold text-espresso-800">
                  Assigned Table: <span className="text-coffee-600">{order.tableNo}</span>
                </p>
              )}
              {order.address && (
                <p className="flex items-start gap-1.5 text-warmgray-700">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-500 shrink-0 mt-0.5" />
                  <span>{order.address}</span>
                </p>
              )}
              {order.notes && (
                <p className="p-2.5 rounded-xl bg-white border border-cream-200 text-warmgray-700 italic">
                  "{order.notes}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Itemized Order Table */}
        <div>
          <h4 className="font-serif font-bold text-base text-espresso-800 mb-3">
            Ordered Items ({order.items?.length})
          </h4>
          <div className="border border-cream-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-100 text-warmgray-700 border-b border-cream-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Item Description</th>
                  <th className="py-3 px-4 font-bold text-center">Qty</th>
                  <th className="py-3 px-4 font-bold text-right">Price</th>
                  <th className="py-3 px-4 font-bold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {order.items?.map((item, idx) => {
                  const itemAddonsTotal = item.selectedAddons?.reduce((s, a) => s + (a.price || 0), 0) || 0;
                  const itemUnitTotal = (item.price || 0) + itemAddonsTotal;
                  const lineTotal = itemUnitTotal * (item.quantity || 1);

                  return (
                    <tr key={idx} className="hover:bg-cream-50/50">
                      <td className="py-3 px-4">
                        <p className="font-bold text-espresso-800">{item.name}</p>
                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                          <p className="text-[11px] text-coffee-600">
                            + {item.selectedAddons.map((a) => `${a.name} (₹${a.price})`).join(', ')}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-espresso-800">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-4 text-right text-warmgray-700">
                        ₹{itemUnitTotal}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-espresso-800">
                        ₹{lineTotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Breakdown & Payment info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-cream-200/80">
          {/* Payment Info */}
          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2 text-xs">
            <h4 className="font-serif font-bold text-sm text-espresso-800 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-coffee-600" />
              <span>Payment Details</span>
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-warmgray-600">Method:</span>
              <span className="font-bold text-espresso-800">{order.paymentMethod}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-warmgray-600">Status:</span>
              <StatusBadge status={order.paymentStatus} type="payment" size="sm" />
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-warmgray-600">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sage-700 font-semibold">
                <span>Discount Applied</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-warmgray-600">
              <span>GST / Taxes</span>
              <span>₹{order.tax}</span>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between text-warmgray-600">
                <span>Delivery Charge</span>
                <span>₹{order.deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-espresso-800 pt-2 border-t border-cream-200">
              <span>Grand Total</span>
              <span className="text-coffee-700 font-sans">₹{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
