import React from 'react';
import { QrCode, CreditCard, Banknote, Globe, ShieldCheck } from 'lucide-react';
import Input from '../common/Input';

export const PaymentSelector = ({
  paymentMethod,
  onSelectMethod,
  paymentDetails,
  onDetailChange,
  orderType = 'dine-in',
}) => {
  const paymentOptions = [
    {
      id: 'UPI',
      name: 'Instant UPI / QR',
      desc: 'Google Pay, PhonePe, Paytm, BHIM',
      icon: QrCode,
      badge: 'Fastest',
    },
    {
      id: 'Card',
      name: 'Credit / Debit Card',
      desc: 'Visa, Mastercard, RuPay, Amex',
      icon: CreditCard,
    },
    {
      id: 'Cash',
      name: orderType === 'delivery' ? 'Cash on Delivery (COD)' : 'Pay at Counter / Cash',
      desc: 'Pay directly when served or upon arrival',
      icon: Banknote,
    },
    {
      id: 'Online Payment',
      name: 'NetBanking & Wallets',
      desc: 'HDFC, ICICI, SBI, Axis, Cred',
      icon: Globe,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentOptions.map((opt) => {
          const isSelected = paymentMethod === opt.id;
          const Icon = opt.icon;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectMethod(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 ${
                isSelected
                  ? 'bg-cream-100 border-coffee-600 text-espresso-900 ring-2 ring-coffee-500/20 shadow-xs'
                  : 'bg-white border-cream-200 text-warmgray-700 hover:bg-cream-50 hover:border-cream-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-espresso-900 text-white' : 'bg-cream-200 text-warmgray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm block">{opt.name}</span>
                  {opt.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sage-100 text-sage-800">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs text-warmgray-500 block mt-0.5 leading-snug">
                  {opt.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Payment Details Simulated Inputs */}
      {paymentMethod === 'UPI' && (
        <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-xs space-y-2">
          <Input
            label="Enter VPA / UPI ID"
            value={paymentDetails.upiId || 'ashir@okhdfcbank'}
            onChange={(e) => onDetailChange('upiId', e.target.value)}
            placeholder="username@bank (e.g. name@okhdfcbank)"
          />
          <p className="text-[11px] text-warmgray-500">
            A simulated instant payment request will be sent to your UPI app.
          </p>
        </div>
      )}

      {paymentMethod === 'Card' && (
        <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-xs space-y-3">
          <Input
            label="Card Number"
            value={paymentDetails.cardNumber || '•••• •••• •••• 4242'}
            onChange={(e) => onDetailChange('cardNumber', e.target.value)}
            placeholder="4000 1234 5678 9010"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              defaultValue="12/28"
            />
            <Input
              label="CVV"
              placeholder="•••"
              defaultValue="888"
              type="password"
            />
          </div>
        </div>
      )}

      {paymentMethod === 'Cash' && (
        <div className="p-3 bg-cream-100 rounded-2xl border border-cream-200 text-xs text-warmgray-700 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-coffee-600 shrink-0" />
          <span>No prepayment required. Please keep exact change ready or pay at counter upon service.</span>
        </div>
      )}
    </div>
  );
};

export default PaymentSelector;
