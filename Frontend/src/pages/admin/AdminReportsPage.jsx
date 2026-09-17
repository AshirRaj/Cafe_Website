import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Receipt,
  Calendar,
  Layers,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { reportDataByPeriod } from '../../data/admin/adminReports';
import { SimpleBarChart, CategoryBreakdownBar } from '../../components/admin/SimpleChart';
import StatCard from '../../components/admin/StatCard';

export const AdminReportsPage = () => {
  const [period, setPeriod] = useState('today');

  const report = reportDataByPeriod[period] || reportDataByPeriod.today;

  return (
    <div className="space-y-8">
      {/* Top Bar with Time Filter */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-espresso-800">Café Sales & Reports</h2>
          <p className="text-xs text-warmgray-600">
            {report.periodLabel} performance summary
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center p-1 bg-cream-100 rounded-2xl border border-cream-200 text-xs font-semibold self-start sm:self-auto">
          {[
            { id: 'today', label: 'Today' },
            { id: '7days', label: 'Last 7 Days' },
            { id: '30days', label: 'Last 30 Days' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPeriod(tab.id)}
              className={`px-4 py-2 rounded-xl transition-all ${
                period === tab.id
                  ? 'bg-espresso-800 text-cream-50 shadow-sm'
                  : 'text-warmgray-600 hover:text-espresso-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Gross Sales"
          value={`₹${report.totalSales.toLocaleString('en-IN')}`}
          subtitle={`${report.totalOrders} customer orders`}
          trend="8.5%"
          trendPositive={true}
          icon={DollarSign}
          colorScheme="coffee"
        />

        <StatCard
          title="Total Orders"
          value={report.totalOrders}
          subtitle={`${report.completedOrders} served (${report.cancelledOrders} cancelled)`}
          trend="6.2%"
          trendPositive={true}
          icon={ShoppingBag}
          colorScheme="espresso"
        />

        <StatCard
          title="Operating Expenses"
          value={`₹${report.totalExpenses.toLocaleString('en-IN')}`}
          subtitle="Ingredients, dairy & utilities"
          trend="Controlled"
          trendPositive={true}
          icon={Receipt}
          colorScheme="terracotta"
        />

        <StatCard
          title="Estimated Net Profit"
          value={`₹${report.estimatedNet.toLocaleString('en-IN')}`}
          subtitle={`Avg Order: ₹${report.avgOrderValue.toFixed(0)}`}
          trend="Profitable"
          trendPositive={true}
          icon={TrendingUp}
          colorScheme="sage"
        />
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-cream-100 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-espresso-800">Sales Progression Chart</h3>
            <p className="text-xs text-warmgray-600">Revenue trend for {report.periodLabel}</p>
          </div>
          <span className="text-xs font-bold text-coffee-600 bg-coffee-100 px-3 py-1 rounded-full">
            ₹{report.totalSales.toLocaleString('en-IN')} Total
          </span>
        </div>

        <SimpleBarChart data={report.salesTrend} height={220} />
      </div>

      {/* Sales by Category & Top Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Contribution */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
          <div className="border-b border-cream-100 pb-3">
            <h3 className="font-serif font-bold text-lg text-espresso-800">Sales by Category</h3>
            <p className="text-xs text-warmgray-600">Revenue split across hot coffee, cold brews, and bakery</p>
          </div>

          <CategoryBreakdownBar categories={report.salesByCategory} />

          <div className="pt-4 space-y-2 text-xs">
            {report.salesByCategory.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-cream-50 border border-cream-100"
              >
                <span className="font-bold text-espresso-800">{cat.category}</span>
                <span className="font-bold text-coffee-700">₹{cat.amount?.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
          <div className="border-b border-cream-100 pb-3">
            <h3 className="font-serif font-bold text-lg text-espresso-800">Top Selling Products</h3>
            <p className="text-xs text-warmgray-600">Items generating the most customer revenue</p>
          </div>

          <div className="border border-cream-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-100 text-warmgray-700">
                <tr>
                  <th className="py-3 px-4 font-bold">Product</th>
                  <th className="py-3 px-4 font-bold text-center">Qty Sold</th>
                  <th className="py-3 px-4 font-bold text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {report.topSellingProducts.map((p, idx) => (
                  <tr key={idx} className="hover:bg-cream-50/50">
                    <td className="py-3 px-4 font-bold text-espresso-800">
                      {idx + 1}. {p.name}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-warmgray-700">
                      {p.quantity}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-coffee-700">
                      ₹{p.revenue?.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
