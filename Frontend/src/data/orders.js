import { generateOrderId } from '../utils/formatters';
import { IMAGES } from '../assets/images/imageRegistry';

export const ORDER_STAGES = [
  { id: 'PLACED', label: 'Order Placed', desc: 'Received in our system', timeEstimate: 'Just now' },
  { id: 'CONFIRMED', label: 'Confirmed', desc: 'Kitchen accepted your order', timeEstimate: '1 min ago' },
  { id: 'PREPARING', label: 'Brewing & Cooking', desc: 'Barista is crafting your order', timeEstimate: 'In progress' },
  { id: 'READY', label: 'Ready for Service', desc: 'Plated and ready to enjoy', timeEstimate: '~5 mins' },
  { id: 'SERVED', label: 'Served & Completed', desc: 'Enjoy your meal!', timeEstimate: 'Completed' },
];

export const createOrderObject = ({
  customer,
  items,
  orderType = 'dine-in',
  selectedTable = 'T03',
  takeawayPickupTime = '15 minutes',
  paymentMethod = 'UPI',
  appliedOffer = null,
  subtotal = 0,
  discountAmount = 0,
  tax = 0,
  deliveryFee = 0,
  grandTotal = 0,
}) => {
  const orderId = generateOrderId();
  const createdAt = new Date().toISOString();

  let estimatedTimeMinutes = 15;
  if (orderType === 'delivery') estimatedTimeMinutes = 35;
  else if (orderType === 'takeaway') {
    if (takeawayPickupTime === 'ASAP') estimatedTimeMinutes = 10;
    else if (takeawayPickupTime.includes('30')) estimatedTimeMinutes = 30;
    else if (takeawayPickupTime.includes('45')) estimatedTimeMinutes = 45;
    else estimatedTimeMinutes = 15;
  }

  return {
    orderId,
    createdAt,
    orderStatus: 'Confirmed', // 'Placed' | 'Confirmed' | 'Preparing' | 'Ready' | 'Served'
    status: 'PREPARING',
    orderType: orderType === 'dine-in' ? 'Dine In' : orderType === 'takeaway' ? 'Takeaway' : 'Delivery',
    rawOrderType: orderType,
    table: orderType === 'dine-in' ? selectedTable : null,
    takeawayPickupTime: orderType === 'takeaway' ? takeawayPickupTime : null,
    customer: {
      name: customer.name || 'Guest User',
      phone: customer.phone || '',
      email: customer.email || '',
      address: customer.address || '',
      notes: customer.notes || '',
      city: customer.city || 'Bhubaneswar',
      pincode: customer.pincode || '751007',
    },
    paymentMethod: paymentMethod || 'UPI',
    paymentStatus: paymentMethod === 'Cash' || paymentMethod === 'CASH' ? 'Pending (Pay at Counter)' : 'Paid',
    items: [...items],
    subtotal,
    discount: discountAmount,
    discountAmount,
    appliedOfferCode: appliedOffer ? appliedOffer.code : null,
    tax,
    deliveryFee,
    total: grandTotal,
    grandTotal,
    estimatedTimeMinutes,
    preparationTimeEstimate: `${estimatedTimeMinutes - 5}–${estimatedTimeMinutes} minutes`,
  };
};

export const INITIAL_MOCK_ORDERS = [
  {
    orderId: 'CAF1025',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    orderStatus: 'Preparing',
    status: 'PREPARING',
    orderType: 'Dine In',
    rawOrderType: 'dine-in',
    table: 'T04',
    customer: {
      name: 'Ashirvad Roy',
      phone: '+91 98450 12345',
      email: 'ashirvad@example.com',
      notes: 'Please bring extra napkins',
    },
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    items: [
      {
        id: 'cappuccino-classic',
        name: 'Artisan Cappuccino',
        image: IMAGES.cappuccino,
        basePrice: 220,
        unitPrice: 260,
        quantity: 2,
        isVeg: true,
        selectedAddOns: [{ id: 'extra-shot', name: 'Extra Espresso Shot', price: 40 }],
      },
      {
        id: 'chocolate-fudge-brownie',
        name: 'Belgian Chocolate Fudge Brownie',
        image: IMAGES.chocolateFudgeBrownie,
        basePrice: 210,
        unitPrice: 210,
        quantity: 1,
        isVeg: true,
        selectedAddOns: [],
      },
    ],
    subtotal: 730,
    discount: 146,
    discountAmount: 146,
    appliedOfferCode: 'AFTERNOON20',
    tax: 29,
    deliveryFee: 0,
    total: 613,
    grandTotal: 613,
    estimatedTimeMinutes: 15,
    preparationTimeEstimate: '10–15 minutes',
  },
];
