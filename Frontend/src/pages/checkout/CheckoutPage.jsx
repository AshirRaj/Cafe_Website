import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import OrderTypeSelector from '../../components/checkout/OrderTypeSelector';
import TableSelector from '../../components/checkout/TableSelector';
import TakeawayPickupSelector from '../../components/checkout/TakeawayPickupSelector';
import CustomerForm from '../../components/checkout/CustomerForm';
import PaymentSelector from '../../components/checkout/PaymentSelector';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/common/Button';
import { formatPrice } from '../../utils/formatters';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items,
    orderType,
    setOrderType,
    selectedTable,
    setSelectedTable,
    takeawayPickupTime,
    setTakeawayPickupTime,
    placeOrder,
    grandTotal,
  } = useCart();
  const { addToast } = useToast();

  const [customer, setCustomer] = useState({
    name: 'Ashirvad Roy',
    phone: '+91 98450 12345',
    email: 'ashirvad@example.com',
    address: 'Flat 402, Royal Palms',
    street: 'Janpath Road, Saheed Nagar',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751007',
    notes: 'Please bring extra napkins',
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: 'ashir@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div className="py-20 text-center bg-cream-50 min-h-screen">
        <h2 className="text-2xl font-serif font-bold text-espresso-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-sm text-warmgray-500 mb-6">
          Please add items to your basket before proceeding to checkout.
        </p>
        <Link to="/menu">
          <Button variant="primary">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handlePaymentDetailChange = (field, value) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Comprehensive Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!customer.phone.trim()) {
      newErrors.phone = 'Please enter a valid phone number.';
    } else if (!/^[+0-9\s-]{8,15}$/.test(customer.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone format.';
    }

    if (customer.email && !/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (orderType === 'dine-in' && !selectedTable) {
      newErrors.table = 'Please select an available dining table.';
    }

    if (orderType === 'delivery') {
      if (!customer.address.trim()) newErrors.address = 'Please enter house/flat number.';
      if (!customer.street.trim()) newErrors.street = 'Please enter street name & area.';
      if (!customer.pincode.trim()) newErrors.pincode = 'Please enter delivery pincode.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast('Please complete all required fields correctly.', 'error');
      return;
    }

    setIsProcessing(true);

    // Simulated 1.5 second payment / order dispatch delay
    setTimeout(() => {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6F4E37', '#C86446', '#606C38', '#E4DACB'],
        });
      } catch {
        // Safe fallback
      }

      const newOrder = placeOrder(customer, paymentMethod);
      setIsProcessing(false);
      addToast(`Order #${newOrder.orderId} placed successfully!`, 'success');
      navigate(`/order-success/${newOrder.orderId}`);
    }, 1400);
  };

  return (
    <div className="py-10 sm:py-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-semibold text-warmgray-600 hover:text-espresso-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-espresso-900 mt-2">
            Complete Your Order
          </h1>
        </div>

        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Fulfillment Selector */}
            <div className="bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-8 shadow-soft space-y-5">
              <OrderTypeSelector
                selectedType={orderType}
                onSelectType={(type) => {
                  setOrderType(type);
                  setErrors((prev) => ({ ...prev, table: '', address: '', street: '', pincode: '' }));
                }}
              />

              {/* Conditional Table Selector */}
              {orderType === 'dine-in' && (
                <TableSelector
                  selectedTable={selectedTable}
                  onSelectTable={setSelectedTable}
                  error={errors.table}
                />
              )}

              {/* Conditional Takeaway Pickup Selector */}
              {orderType === 'takeaway' && (
                <TakeawayPickupSelector
                  selectedTime={takeawayPickupTime}
                  onSelectTime={setTakeawayPickupTime}
                />
              )}
            </div>

            {/* 2. Customer & Address Form */}
            <div className="bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-8 shadow-soft space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                <h3 className="text-lg font-serif font-semibold text-espresso-900">
                  2. Guest & Contact Information
                </h3>
                <span className="text-[11px] text-coffee-600 font-medium">Step 2 of 3</span>
              </div>

              <CustomerForm
                customer={customer}
                onChange={handleCustomerChange}
                errors={errors}
                orderType={orderType}
              />
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-3xl border border-cream-200/90 p-6 sm:p-8 shadow-soft space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                <h3 className="text-lg font-serif font-semibold text-espresso-900">
                  3. Payment Method Simulation
                </h3>
                <span className="text-[11px] text-coffee-600 font-medium">Step 3 of 3</span>
              </div>

              <PaymentSelector
                paymentMethod={paymentMethod}
                onSelectMethod={setPaymentMethod}
                paymentDetails={paymentDetails}
                onDetailChange={handlePaymentDetailChange}
                orderType={orderType}
              />
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <CartSummary showCheckoutButton={false} />

            <Button
              type="submit"
              variant="terracotta"
              size="lg"
              className="w-full font-bold shadow-elevated"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing Order...
                </span>
              ) : (
                `Place Order • ${formatPrice(grandTotal)}`
              )}
            </Button>

            <div className="p-4 bg-cream-100/70 rounded-2xl border border-cream-200 text-[11px] text-warmgray-600 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-coffee-600 shrink-0" />
              <span>Contactless preparation & instantaneous kitchen dispatch.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
