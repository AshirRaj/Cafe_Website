import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  UtensilsCrossed,
  Eye,
  CheckCircle,
  Plus
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/admin/StatusBadge';
import { SimpleBarChart } from '../../components/admin/SimpleChart';
import { reportDataByPeriod } from '../../data/admin/adminReports';

export const DashboardPage = () => {
  const { orders, inventory, customers } = useAdmin();
  const [chartPeriod, setChartPeriod] = useState('today');

  // Summary Metrics calculations
  const todayOrders = orders.filter((o) => o.createdAt?.startsWith('2026-09-17') || true);
  const totalSalesToday = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingCount = orders.filter((o) => ['New', 'Preparing', 'Confirmed'].includes(o.status)).length;
  const lowStockItems = inventory.filter((i) => i.status === 'Low Stock');

  const currentReport = reportDataByPeriod[chartPeriod] || reportDataByPeriod.today;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-espresso-800 to-coffee-700 p-6 rounded-3xl text-cream-50 shadow-soft">
        <div>
          <h2 className="font-serif font-bold text-2xl">Good afternoon, Café Team</h2>
          <p className="text-cream-200 text-xs sm:text-sm mt-1">
            Here is what's brewing across your tables, kitchen, and bar counter today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl text-xs font-bold shadow-soft transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Live Kitchen Orders ({pendingCount})</span>
          </Link>
          <Link
            to="/admin/menu/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-cream-50 border border-white/20 rounded-xl text-xs font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </Link>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Today's Sales"
          value={`₹${totalSalesToday.toLocaleString('en-IN')}`}
          subtitle="vs. ₹10,800 yesterday"
          trend="15.2%"
          trendPositive={true}
          icon={DollarSign}
          colorScheme="coffee"
        />
        <StatCard
          title="Today's Orders"
          value={orders.length}
          subtitle="39 completed today"
          trend="8.4%"
          trendPositive={true}
          icon={ShoppingBag}
          colorScheme="espresso"
        />
        <StatCard
          title="Pending Orders"
          value={pendingCount}
          subtitle="Needs kitchen attention"
          trend={pendingCount > 5 ? 'High Volume' : 'Normal'}
          trendPositive={pendingCount <= 5}
          icon={Clock}
          colorScheme="terracotta"
        />
        <StatCard
          title="Customers Today"
          value={customers.length * 4}
          subtitle="18 regulars & 12 new"
          trend="12%"
          trendPositive={true}
          icon={Users}
          colorScheme="sage"
        />
      </div>

      {/* Sales Overview Chart + Top Selling Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-espresso-800">Sales Overview</h3>
              <p className="text-xs text-warmgray-600">Hourly & daily revenue progression</p>
            </div>

            {/* Time toggles */}
            <div className="flex items-center p-1 bg-cream-100 rounded-xl border border-cream-200 text-xs font-semibold">
              {[
                { id: 'today', label: 'Today' },
                { id: '7days', label: '7 Days' },
                { id: '30days', label: '30 Days' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setChartPeriod(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartPeriod === tab.id
                      ? 'bg-espresso-800 text-cream-50 shadow-sm'
                      : 'text-warmgray-600 hover:text-espresso-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-bold font-sans text-espresso-800">
                ₹{currentReport.totalSales.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-sage-700 font-semibold bg-sage-100 px-2 py-0.5 rounded-full">
                {currentReport.totalOrders} total orders
              </span>
            </div>
            <SimpleBarChart data={currentReport.salesTrend} height={190} />
          </div>

          <div className="pt-3 border-t border-cream-100 flex items-center justify-between text-xs text-warmgray-600">
            <span>Avg Order Value: ₹{currentReport.avgOrderValue.toFixed(0)}</span>
            <Link to="/admin/reports" className="font-semibold text-coffee-600 hover:text-coffee-700 inline-flex items-center gap-1">
              <span>View Full Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex flex-col justify-between">
          <div className="border-b border-cream-100 pb-4">
            <h3 className="font-serif font-bold text-lg text-espresso-800">Popular Items</h3>
            <p className="text-xs text-warmgray-600">Most loved café orders</p>
          </div>

          <div className="py-4 space-y-3.5">
            {currentReport.topSellingProducts.slice(0, 5).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-5 h-5 rounded-full bg-cream-200 text-espresso-800 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <p className="font-bold text-espresso-800 truncate">{item.name}</p>
                    <span className="text-[11px] text-warmgray-600">{item.quantity} sold</span>
                  </div>
                </div>
                <span className="font-bold text-coffee-700 shrink-0">
                  ₹{item.revenue.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/admin/menu"
            className="w-full py-2.5 rounded-xl border border-cream-200 bg-cream-50 hover:bg-cream-100 text-xs font-bold text-espresso-800 text-center transition-all block"
          >
            Manage Café Menu
          </Link>
        </div>
      </div>

      {/* Recent Orders & Low Stock Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-cream-200 p-6 shadow-soft">
          <div className="flex items-center justify-between border-b border-cream-100 pb-4 mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-espresso-800">Today's Orders</h3>
              <p className="text-xs text-warmgray-600">Recent customer transactions</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-coffee-600 hover:text-espresso-800 inline-flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-warmgray-600 border-b border-cream-100">
                  <th className="pb-3 font-bold">Order ID</th>
                  <th className="pb-3 font-bold">Customer</th>
                  <th className="pb-3 font-bold">Items</th>
                  <th className="pb-3 font-bold">Type</th>
                  <th className="pb-3 font-bold">Amount</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50/70 transition-colors">
                    <td className="py-3.5 font-bold text-espresso-800">#{order.id}</td>
                    <td className="py-3.5">
                      <div className="font-semibold text-espresso-800">{order.customer?.name}</div>
                      <span className="text-[10px] text-warmgray-600">{order.time}</span>
                    </td>
                    <td className="py-3.5 text-warmgray-700">
                      {order.items?.length} items
                    </td>
                    <td className="py-3.5">
                      <StatusBadge status={order.orderType} type="fulfillment" size="sm" />
                    </td>
                    <td className="py-3.5 font-bold text-espresso-800">
                      ₹{order.total}
                    </td>
                    <td className="py-3.5">
                      <StatusBadge status={order.status} type="order" size="sm" />
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cream-100 hover:bg-espresso-800 hover:text-cream-50 text-espresso-800 font-semibold text-xs transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-cream-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-espresso-800">Low Stock Alert</h3>
                  <p className="text-[11px] text-warmgray-600">{lowStockItems.length} items need restock</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {lowStockItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-espresso-800">{item.item}</h4>
                    <span className="text-[11px] text-warmgray-600">
                      Min: {item.minimumStock} {item.unit}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-terracotta-600 block">
                      {item.currentStock} {item.unit}
                    </span>
                    <StatusBadge status="Low Stock" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/admin/inventory"
            className="w-full py-2.5 rounded-xl bg-espresso-800 hover:bg-espresso-700 text-xs font-bold text-cream-50 text-center transition-all block shadow-soft mt-4"
          >
            View Inventory ({inventory.length} items)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
