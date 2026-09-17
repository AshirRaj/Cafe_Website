export const initialAdminSettings = {
  cafeInfo: {
    name: 'Cafe Adda',
    tagline: 'Artisanal Brews, Sourdough & Heartfelt Comfort',
    phone: '+91 (674) 254-8822',
    email: 'hello@cafeadda.in',
    address: 'Plot No. 12, Janpath Road, Saheed Nagar, Bhubaneswar, Odisha 751007',
    googleMapsUrl: 'https://maps.google.com/?q=Saheed+Nagar+Bhubaneswar',
    fssaiLicense: '11223344000129'
  },
  openingHours: [
    { day: 'Monday', opens: '07:30 AM', closes: '10:30 PM', isOpen: true },
    { day: 'Tuesday', opens: '07:30 AM', closes: '10:30 PM', isOpen: true },
    { day: 'Wednesday', opens: '07:30 AM', closes: '10:30 PM', isOpen: true },
    { day: 'Thursday', opens: '07:30 AM', closes: '10:30 PM', isOpen: true },
    { day: 'Friday', opens: '07:30 AM', closes: '11:30 PM', isOpen: true },
    { day: 'Saturday', opens: '07:30 AM', closes: '11:30 PM', isOpen: true },
    { day: 'Sunday', opens: '07:30 AM', closes: '11:00 PM', isOpen: true }
  ],
  orderSettings: {
    enableDineIn: true,
    enableTakeaway: true,
    enableDelivery: true,
    acceptingOrders: true,
    estimatedPrepTime: 18, // mins
    estimatedDeliveryTime: 35, // mins
    minOrderAmountForDelivery: 199,
    deliveryFee: 40
  },
  taxSettings: {
    taxPercentage: 5,
    taxName: 'GST (CGST + SGST)',
    taxInclusivePrices: false,
    serviceChargePercentage: 0
  },
  invoiceSettings: {
    invoicePrefix: 'CAF-2026-',
    nextInvoiceNumber: 1026,
    footerNote: 'Thank you for brewing good moments with us!'
  }
};
