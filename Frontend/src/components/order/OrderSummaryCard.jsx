import React from 'react';
import { formatPrice, formatDate } from '../../utils/formatters';
import { Utensils, MapPin, Phone, CreditCard, Clock, Receipt } from 'lucide-react';
import Badge from '../common/Badge';

export const OrderSummaryCard = ({ order }) => {
  if (!order) return null;

  return (
    <div className="bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-7 shadow-soft space-y-6">
      {/* Receipt Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
        <div>
          <span className="text-xs uppercase font-semibold text-warmgray-500">Order Reference</span>
          <h3 className="text-2xl font-serif font-bold text-espresso-900 tracking-tight">
            #{order.orderId}
          </h3>
          <p className="text-xs text-warmgray-500 mt-0.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Placed on {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="coffee" size="md">
            {order.orderType === 'Dine In' || order.rawOrderType === 'dine-in'
              ? `Dine-In • Table ${order.table || order.selectedTable || 'T03'}`
              : order.orderType === 'Takeaway' || order.rawOrderType === 'takeaway'
              ? `Takeaway (${order.takeawayPickupTime || '15 mins'})`
              : 'Doorstep Delivery'}
          </Badge>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sage-100 text-sage-700 border border-sage-600/20">
            {order.paymentMethod || 'UPI'} ({order.paymentStatus || 'Paid'})
          </span>
        </div>
      </div>

      {/* Guest & Fulfillment Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-cream-50 p-4 rounded-2xl border border-cream-200">
        <div>
          <h4 className="font-bold text-warmgray-900 uppercase tracking-wider text-[10px] mb-1">
            Guest Details
          </h4>
          <p className="font-semibold text-espresso-900">{order.customer?.name || 'Guest User'}</p>
          <p className="text-warmgray-600">{order.customer?.phone || '+91 98450 12345'}</p>
          <p className="text-warmgray-600">{order.customer?.email || 'guest@example.com'}</p>
          {order.customer?.notes && (
            <p className="text-[11px] text-warmgray-500 italic mt-1">
              Note: "{order.customer.notes}"
            </p>
          )}
        </div>

        <div>
          <h4 className="font-bold text-warmgray-900 uppercase tracking-wider text-[10px] mb-1">
            Fulfillment Info
          </h4>
          {(order.orderType === 'Dine In' || order.rawOrderType === 'dine-in') && (
            <p className="text-warmgray-700">
              Assigned Table: <strong>{order.table || order.selectedTable || 'Table 03 (Main Lounge)'}</strong>
            </p>
          )}
          {(order.orderType === 'Delivery' || order.rawOrderType === 'delivery') && (
            <p className="text-warmgray-700">
              Address: {order.customer?.address || 'Flat 402, Royal Palms'}, {order.customer?.city || 'Bhubaneswar'}
            </p>
          )}
          {(order.orderType === 'Takeaway' || order.rawOrderType === 'takeaway') && (
            <p className="text-warmgray-700">
              Counter Pickup Window: <strong>{order.takeawayPickupTime || '15 minutes'}</strong>
            </p>
          )}
          <p className="text-coffee-600 font-medium mt-1">
            Estimated Prep Time: ~{order.estimatedTimeMinutes || 15} minutes
          </p>
        </div>
      </div>

      {/* Ordered Items Breakdown */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-3 flex items-center gap-1.5">
          <Receipt className="w-4 h-4 text-coffee-600" /> Items in Order ({order.items?.length || 0})
        </h4>

        <div className="divide-y divide-cream-200">
          {order.items?.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-cream-200 text-espresso-900 text-xs font-bold flex items-center justify-center shrink-0">
                  {item.quantity}x
                </span>
                <div>
                  <span className="font-medium text-espresso-900">{item.name}</span>
                  {item.selectedAddOns?.length > 0 && (
                    <span className="block text-[11px] text-warmgray-500">
                      Add-ons: {item.selectedAddOns.map((a) => a.name).join(', ')}
                    </span>
                  )}
                </div>
              </div>
              <span className="font-semibold text-espresso-900">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Calculation */}
      <div className="pt-4 border-t border-cream-200 space-y-1.5 text-xs text-warmgray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-warmgray-900">{formatPrice(order.subtotal || 0)}</span>
        </div>
        {order.discountAmount > 0 && (
          <div className="flex justify-between text-sage-700 font-semibold">
            <span>Coupon Discount ({order.appliedOfferCode})</span>
            <span>-{formatPrice(order.discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>GST / Taxes (5%)</span>
          <span className="font-medium text-warmgray-900">{formatPrice(order.tax || 0)}</span>
        </div>
        {order.deliveryFee > 0 && (
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-medium text-warmgray-900">{formatPrice(order.deliveryFee)}</span>
          </div>
        )}
        <div className="pt-2 border-t border-cream-200 flex justify-between text-base font-serif font-bold text-espresso-900">
          <span>Total Paid</span>
          <span>{formatPrice(order.grandTotal || 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
