export const initialAdminOrders = [
  {
    id: 'CAF1025',
    customer: {
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      email: 'rahul.s@example.com'
    },
    orderType: 'Dine In',
    tableNo: 'T04',
    items: [
      { id: '1', name: 'Artisan Cappuccino', quantity: 2, price: 180, selectedAddons: [{ name: 'Extra Espresso Shot', price: 40 }] },
      { id: '4', name: 'Avocado & Sourdough Toast', quantity: 1, price: 290, selectedAddons: [] },
      { id: '6', name: 'Truffle Parmesan Fries', quantity: 1, price: 220, selectedAddons: [] }
    ],
    itemCount: 4,
    subtotal: 910,
    discount: 50,
    tax: 43,
    total: 903,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Preparing',
    createdAt: '2026-09-17T13:45:00',
    time: '1:45 PM',
    notes: 'Extra crispy fries and less cocoa powder on cappuccino.'
  },
  {
    id: 'CAF1024',
    customer: {
      name: 'Priya Patel',
      phone: '+91 98112 34567',
      email: 'priya.p@example.com'
    },
    orderType: 'Takeaway',
    tableNo: null,
    items: [
      { id: '2', name: 'Single Origin Cold Brew', quantity: 1, price: 210, selectedAddons: [{ name: 'Caramel Drizzle', price: 30 }] },
      { id: '5', name: 'Classic Butter Croissant', quantity: 1, price: 160, selectedAddons: [] }
    ],
    itemCount: 2,
    subtotal: 400,
    discount: 0,
    tax: 20,
    total: 420,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    status: 'Ready',
    createdAt: '2026-09-17T13:30:00',
    time: '1:30 PM',
    notes: 'Please pack in eco-friendly paper bags.'
  },
  {
    id: 'CAF1023',
    customer: {
      name: 'Amit Verma',
      phone: '+91 97234 56789',
      email: 'amit.v@example.com'
    },
    orderType: 'Delivery',
    address: 'Flat 402, Royal Palms, Saheed Nagar, Bhubaneswar',
    items: [
      { id: '7', name: 'Gourmet Truffle Burger', quantity: 2, price: 380, selectedAddons: [{ name: 'Aged Cheddar Slice', price: 50 }] },
      { id: '3', name: 'Spanish Latte (Iced)', quantity: 2, price: 230, selectedAddons: [] }
    ],
    itemCount: 4,
    subtotal: 1320,
    discount: 100,
    tax: 61,
    deliveryFee: 40,
    total: 1321,
    paymentMethod: 'Online',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    createdAt: '2026-09-17T13:15:00',
    time: '1:15 PM',
    notes: 'Leave at door and ring bell.'
  },
  {
    id: 'CAF1022',
    customer: {
      name: 'Ananya Roy',
      phone: '+91 99001 22334',
      email: 'ananya.roy@example.com'
    },
    orderType: 'Dine In',
    tableNo: 'T02',
    items: [
      { id: '8', name: 'Belgian Chocolate Waffle', quantity: 1, price: 260, selectedAddons: [{ name: 'Vanilla Bean Ice Cream', price: 60 }] },
      { id: '1', name: 'Artisan Cappuccino', quantity: 1, price: 180, selectedAddons: [] }
    ],
    itemCount: 2,
    subtotal: 500,
    discount: 0,
    tax: 25,
    total: 525,
    paymentMethod: 'Cash',
    paymentStatus: 'Paid',
    status: 'Completed',
    createdAt: '2026-09-17T12:50:00',
    time: '12:50 PM',
    notes: ''
  },
  {
    id: 'CAF1021',
    customer: {
      name: 'Vikram Mehta',
      phone: '+91 98450 99887',
      email: 'vikram.m@example.com'
    },
    orderType: 'Dine In',
    tableNo: 'T06',
    items: [
      { id: '4', name: 'Avocado & Sourdough Toast', quantity: 2, price: 290, selectedAddons: [] },
      { id: '2', name: 'Single Origin Cold Brew', quantity: 2, price: 210, selectedAddons: [] }
    ],
    itemCount: 4,
    subtotal: 1000,
    discount: 50,
    tax: 47.5,
    total: 997.5,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Completed',
    createdAt: '2026-09-17T12:20:00',
    time: '12:20 PM',
    notes: ''
  },
  {
    id: 'CAF1020',
    customer: {
      name: 'Sneha Kapoor',
      phone: '+91 98711 00223',
      email: 'sneha.k@example.com'
    },
    orderType: 'Takeaway',
    items: [
      { id: '5', name: 'Classic Butter Croissant', quantity: 3, price: 160, selectedAddons: [] },
      { id: '3', name: 'Spanish Latte (Iced)', quantity: 1, price: 230, selectedAddons: [] }
    ],
    itemCount: 4,
    subtotal: 710,
    discount: 0,
    tax: 35.5,
    total: 745.5,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Cancelled',
    createdAt: '2026-09-17T11:45:00',
    time: '11:45 AM',
    notes: 'Customer requested cancellation due to urgency.'
  },
  {
    id: 'CAF1019',
    customer: {
      name: 'Rohan Gupta',
      phone: '+91 99887 76655',
      email: 'rohan.g@example.com'
    },
    orderType: 'Dine In',
    tableNo: 'T01',
    items: [
      { id: '1', name: 'Artisan Cappuccino', quantity: 2, price: 180, selectedAddons: [] },
      { id: '7', name: 'Gourmet Truffle Burger', quantity: 1, price: 380, selectedAddons: [] }
    ],
    itemCount: 3,
    subtotal: 740,
    discount: 0,
    tax: 37,
    total: 777,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    status: 'New',
    createdAt: '2026-09-17T14:10:00',
    time: '2:10 PM',
    notes: 'Make it fast if possible.'
  }
];
