import React from 'react';
import { User, Phone, Mail, MapPin, Building, Home, MessageSquare } from 'lucide-react';
import Input, { Textarea } from '../common/Input';

export const CustomerForm = ({
  customer,
  onChange,
  errors = {},
  orderType = 'dine-in',
}) => {
  return (
    <div className="space-y-4">
      {/* Primary Customer Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Ashirvad Roy"
          value={customer.name}
          onChange={(e) => onChange('name', e.target.value)}
          error={errors.name}
          icon={User}
          required
        />

        <Input
          label="Phone Number (for SMS Tracking) *"
          placeholder="+91 98450 12345"
          value={customer.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          error={errors.phone}
          icon={Phone}
          required
        />
      </div>

      <Input
        label="Email Address (for Digital Tax Invoice)"
        type="email"
        placeholder="your.email@example.com"
        value={customer.email}
        onChange={(e) => onChange('email', e.target.value)}
        error={errors.email}
        icon={Mail}
      />

      {/* Delivery Address Fields */}
      {orderType === 'delivery' && (
        <div className="pt-4 border-t border-cream-200 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warmgray-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-terracotta-500" /> Delivery Address Details
            </h4>
            <span className="text-[11px] text-coffee-600 font-medium">Doorstep Delivery</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="House / Flat / Unit No. *"
              placeholder="e.g. Flat 402, Lotus Towers"
              value={customer.address}
              onChange={(e) => onChange('address', e.target.value)}
              error={errors.address}
              icon={Home}
              required
            />

            <Input
              label="Street & Area *"
              placeholder="e.g. Janpath Road, Saheed Nagar"
              value={customer.street || ''}
              onChange={(e) => onChange('street', e.target.value)}
              error={errors.street}
              icon={Building}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="Bhubaneswar"
              value={customer.city || 'Bhubaneswar'}
              onChange={(e) => onChange('city', e.target.value)}
            />

            <Input
              label="State"
              placeholder="Odisha"
              value={customer.state || 'Odisha'}
              onChange={(e) => onChange('state', e.target.value)}
            />

            <Input
              label="Pincode *"
              placeholder="751007"
              value={customer.pincode || ''}
              onChange={(e) => onChange('pincode', e.target.value)}
              error={errors.pincode}
              required
            />
          </div>
        </div>
      )}

      {/* Kitchen / Barista Special Note */}
      <Textarea
        label="Special Instructions for Kitchen / Barista (Optional)"
        rows={2}
        placeholder="e.g. Extra hot milk, less sugar, ring the bell on delivery..."
        value={customer.notes}
        onChange={(e) => onChange('notes', e.target.value)}
      />
    </div>
  );
};

export default CustomerForm;
