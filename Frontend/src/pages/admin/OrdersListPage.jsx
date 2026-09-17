import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  ShoppingBag,
  ArrowUpDown,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/admin/StatusBadge';
import EmptyState from '../../components/admin/EmptyState';

export const OrdersListPage = () => {
  const { orders, updateOrderStatus } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const statusTabs = ['All', 'New', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
  const typeTabs = ['All', 'Dine In', 'Takeaway', 'Delivery'];

  const filteredOrders = orders.filter((order) => {
    // Search match
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.phone?.includes(searchTerm);

    // Status match
    const matchesStatus =
      statusFilter === 'All' ||
      order.status?.toLowerCase() === statusFilter.toLowerCase();

    // Type match
    const matchesType =
      typeFilter === 'All' ||
      order.orderType?.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-espresso-800">Café Orders</h2>
            <p className="text-xs text-warmgray-600">
              Manage live kitchen tickets, dine-in tables, and fulfillment status
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warmgray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Name, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-cream-100">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {statusTabs.map((tab) => {
              const count =
                tab === 'All'
                  ? orders.length
                  : orders.filter((o) => o.status.toLowerCase() === tab.toLowerCase()).length;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    statusFilter === tab
                      ? 'bg-espresso-800 text-cream-50 shadow-sm'
                      : 'bg-cream-100 text-warmgray-700 hover:bg-cream-200'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      statusFilter === tab ? 'bg-coffee-600 text-white' : 'bg-cream-200 text-espresso-800'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Order Type Tabs */}
          <div className="flex items-center gap-1 bg-cream-100 p-1 rounded-xl border border-cream-200 self-start sm:self-auto">
            {typeTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setTypeFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  typeFilter === tab
                    ? 'bg-white text-espresso-800 shadow-sm'
                    : 'text-warmgray-600 hover:text-espresso-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table or Empty State */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders found"
          description="Try changing the status filter, search query, or clear filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('All');
            setTypeFilter('All');
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-warmgray-600 bg-cream-50/70 border-b border-cream-200">
                  <th className="py-4 px-5 font-bold">Order ID</th>
                  <th className="py-4 px-4 font-bold">Customer</th>
                  <th className="py-4 px-4 font-bold">Order Type</th>
                  <th className="py-4 px-4 font-bold">Items</th>
                  <th className="py-4 px-4 font-bold">Amount</th>
                  <th className="py-4 px-4 font-bold">Payment</th>
                  <th className="py-4 px-4 font-bold">Status</th>
                  <th className="py-4 px-4 font-bold">Time</th>
                  <th className="py-4 px-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50/60 transition-colors">
                    <td className="py-4 px-5 font-bold text-espresso-800">
                      <Link to={`/admin/orders/${order.id}`} className="hover:text-coffee-600">
                        #{order.id}
                      </Link>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-espresso-800">{order.customer?.name}</div>
                      <div className="text-[11px] text-warmgray-600">{order.customer?.phone}</div>
                    </td>

                    <td className="py-4 px-4">
                      <StatusBadge status={order.orderType} type="fulfillment" size="sm" />
                      {order.tableNo && (
                        <span className="block text-[11px] font-semibold text-espresso-700 mt-0.5">
                          Table {order.tableNo}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-espresso-800 max-w-[180px] truncate">
                        {order.items?.map((it) => `${it.name} (${it.quantity})`).join(', ')}
                      </div>
                      <span className="text-[10px] text-warmgray-600">
                        {order.items?.reduce((s, it) => s + (it.quantity || 1), 0)} items total
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-espresso-800 text-sm">
                      ₹{order.total}
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-semibold text-espresso-800 block text-xs">
                        {order.paymentMethod}
                      </span>
                      <StatusBadge status={order.paymentStatus} type="payment" size="sm" />
                    </td>

                    <td className="py-4 px-4">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-xs font-semibold rounded-lg px-2 py-1 border border-cream-300 bg-cream-50 text-espresso-800 focus:outline-none focus:ring-1 focus:ring-coffee-500 cursor-pointer"
                        >
                          <option value="New">New</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-warmgray-600 whitespace-nowrap">
                      {order.time || '1:45 PM'}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-espresso-800 hover:text-cream-50 text-espresso-800 font-bold text-xs transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersListPage;
