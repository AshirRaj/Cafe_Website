export const reportDataByPeriod = {
  today: {
    periodLabel: 'Today (17 Sep 2026)',
    totalSales: 12450,
    totalOrders: 48,
    pendingOrders: 7,
    completedOrders: 39,
    cancelledOrders: 2,
    totalExpenses: 7250,
    estimatedNet: 5200,
    avgOrderValue: 259.38,
    salesTrend: [
      { time: '8 AM', sales: 450, orders: 3 },
      { time: '10 AM', sales: 1850, orders: 8 },
      { time: '12 PM', sales: 3200, orders: 12 },
      { time: '2 PM', sales: 2900, orders: 11 },
      { time: '4 PM', sales: 2400, orders: 9 },
      { time: '6 PM', sales: 1650, orders: 5 }
    ],
    salesByCategory: [
      { category: 'Hot Coffee', amount: 4800, percentage: 38 },
      { category: 'Cold Brews', amount: 3200, percentage: 26 },
      { category: 'Bakery', amount: 2150, percentage: 17 },
      { category: 'Sandwiches & Mains', amount: 2300, percentage: 19 }
    ],
    topSellingProducts: [
      { name: 'Artisan Cappuccino', quantity: 24, revenue: 4320 },
      { name: 'Single Origin Cold Brew', quantity: 18, revenue: 3780 },
      { name: 'Classic Butter Croissant', quantity: 16, revenue: 2560 },
      { name: 'Gourmet Truffle Burger', quantity: 8, revenue: 3040 },
      { name: 'Avocado & Sourdough Toast', quantity: 7, revenue: 2030 }
    ]
  },
  '7days': {
    periodLabel: 'Last 7 Days (11 - 17 Sep 2026)',
    totalSales: 94820,
    totalOrders: 382,
    pendingOrders: 7,
    completedOrders: 363,
    cancelledOrders: 12,
    totalExpenses: 28400,
    estimatedNet: 66420,
    avgOrderValue: 248.22,
    salesTrend: [
      { time: 'Fri (11)', sales: 12100, orders: 50 },
      { time: 'Sat (12)', sales: 18400, orders: 74 },
      { time: 'Sun (13)', sales: 19800, orders: 81 },
      { time: 'Mon (14)', sales: 9800, orders: 40 },
      { time: 'Tue (15)', sales: 10400, orders: 42 },
      { time: 'Wed (16)', sales: 11870, orders: 47 },
      { time: 'Thu (17)', sales: 12450, orders: 48 }
    ],
    salesByCategory: [
      { category: 'Hot Coffee', amount: 36200, percentage: 38 },
      { category: 'Cold Brews', amount: 24650, percentage: 26 },
      { category: 'Bakery', amount: 17200, percentage: 18 },
      { category: 'Sandwiches & Mains', amount: 16770, percentage: 18 }
    ],
    topSellingProducts: [
      { name: 'Artisan Cappuccino', quantity: 182, revenue: 32760 },
      { name: 'Single Origin Cold Brew', quantity: 124, revenue: 26040 },
      { name: 'Classic Butter Croissant', quantity: 110, revenue: 17600 },
      { name: 'Spanish Latte (Iced)', quantity: 75, revenue: 17250 },
      { name: 'Gourmet Truffle Burger', quantity: 48, revenue: 18240 }
    ]
  },
  '30days': {
    periodLabel: 'Last 30 Days (18 Aug - 17 Sep 2026)',
    totalSales: 384500,
    totalOrders: 1540,
    pendingOrders: 7,
    completedOrders: 1485,
    cancelledOrders: 48,
    totalExpenses: 118200,
    estimatedNet: 266300,
    avgOrderValue: 249.67,
    salesTrend: [
      { time: 'Week 1', sales: 88400, orders: 350 },
      { time: 'Week 2', sales: 96200, orders: 385 },
      { time: 'Week 3', sales: 105100, orders: 420 },
      { time: 'Week 4', sales: 94800, orders: 385 }
    ],
    salesByCategory: [
      { category: 'Hot Coffee', amount: 146110, percentage: 38 },
      { category: 'Cold Brews', amount: 99970, percentage: 26 },
      { category: 'Bakery', amount: 69210, percentage: 18 },
      { category: 'Sandwiches & Mains', amount: 69210, percentage: 18 }
    ],
    topSellingProducts: [
      { name: 'Artisan Cappuccino', quantity: 740, revenue: 133200 },
      { name: 'Single Origin Cold Brew', quantity: 510, revenue: 107100 },
      { name: 'Classic Butter Croissant', quantity: 440, revenue: 70400 },
      { name: 'Belgian Chocolate Waffle', quantity: 280, revenue: 72800 },
      { name: 'Gourmet Truffle Burger', quantity: 195, revenue: 74100 }
    ]
  }
};
