import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle,
  Clock,
  ArrowUpDown,
  DollarSign,
  Download
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/admin/StatusBadge';
import EmptyState from '../../components/admin/EmptyState';

export const AdminPaymentsPage = () => {
  const { payments } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const methods = ['All', 'UPI', 'Card', 'Cash', 'Online'];

  const filteredPayments = payments.filter((pay) => {
    const matchesSearch =
      pay.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.reference?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMethod =
      methodFilter === 'All' || pay.method?.toLowerCase() === methodFilter.toLowerCase();

    const matchesStatus =
      statusFilter === 'All' || pay.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesMethod && matchesStatus;
  });

  const totalCollected = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-espresso-800">Café Payment Logs</h2>
            <p className="text-xs text-warmgray-600">
              Audit trail of counter UPI, card swipes, cash register, and online checkouts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-cream-100 rounded-xl border border-cream-200 text-xs">
              <span className="text-warmgray-600 font-medium">Total Paid Recorded: </span>
              <span className="font-bold text-espresso-800 text-sm">
                ₹{totalCollected.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-cream-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warmgray-400" />
            <input
              type="text"
              placeholder="Search Payment ID, Order ID, Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {methods.map((method) => (
              <button
                key={method}
                onClick={() => setMethodFilter(method)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  methodFilter === method
                    ? 'bg-espresso-800 text-cream-50 shadow-sm'
                    : 'bg-cream-100 text-warmgray-700 hover:bg-cream-200'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredPayments.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No payment records found"
          description="Try modifying search query or payment method filter."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setMethodFilter('All');
            setStatusFilter('All');
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-warmgray-600 bg-cream-50/70 border-b border-cream-200">
                  <th className="py-4 px-5 font-bold">Payment ID</th>
                  <th className="py-4 px-4 font-bold">Order ID</th>
                  <th className="py-4 px-4 font-bold">Customer</th>
                  <th className="py-4 px-4 font-bold">Amount</th>
                  <th className="py-4 px-4 font-bold">Method</th>
                  <th className="py-4 px-4 font-bold">Status</th>
                  <th className="py-4 px-4 font-bold">Reference Code</th>
                  <th className="py-4 px-5 font-bold text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {filteredPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-cream-50/60 transition-colors">
                    <td className="py-4 px-5 font-bold text-espresso-800 font-mono">
                      {pay.id}
                    </td>
                    <td className="py-4 px-4 font-bold text-coffee-600">
                      #{pay.orderId}
                    </td>
                    <td className="py-4 px-4 font-semibold text-espresso-800">
                      {pay.customer}
                    </td>
                    <td className="py-4 px-4 font-bold text-espresso-800 text-sm">
                      ₹{pay.amount}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-cream-100 text-espresso-800 font-bold text-[11px] border border-cream-200">
                        {pay.method}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={pay.status} type="payment" size="sm" />
                    </td>
                    <td className="py-4 px-4 text-warmgray-500 font-mono text-[11px]">
                      {pay.reference || 'N/A'}
                    </td>
                    <td className="py-4 px-5 text-right text-warmgray-600 whitespace-nowrap">
                      {pay.date}
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

export default AdminPaymentsPage;
