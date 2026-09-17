import React, { useState } from 'react';
import {
  Users,
  Search,
  Eye,
  Mail,
  Phone,
  Calendar,
  Coffee,
  DollarSign,
  X,
  Sparkles
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import EmptyState from '../../components/admin/EmptyState';

export const AdminCustomersPage = () => {
  const { customers } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.includes(searchTerm) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-espresso-800">Café Customers</h2>
            <p className="text-xs text-warmgray-600">
              Profiles, frequency, and order history for regular patrons ({customers.length} total)
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warmgray-400" />
            <input
              type="text"
              placeholder="Search by customer name, phone, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Customer Directory Table */}
      {filteredCustomers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No customers found"
          description="No customer records match your query."
          actionLabel="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-warmgray-600 bg-cream-50/70 border-b border-cream-200">
                  <th className="py-4 px-5 font-bold">Customer</th>
                  <th className="py-4 px-4 font-bold">Contact Info</th>
                  <th className="py-4 px-4 font-bold">Total Orders</th>
                  <th className="py-4 px-4 font-bold">Total Spent</th>
                  <th className="py-4 px-4 font-bold">Last Visit</th>
                  <th className="py-4 px-4 font-bold">Type</th>
                  <th className="py-4 px-5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-cream-50/60 transition-colors">
                    {/* Name */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-cream-200 text-espresso-800 font-bold flex items-center justify-center text-xs">
                          {cust.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-espresso-800 text-sm">{cust.name}</p>
                          <span className="text-[10px] text-warmgray-500 font-mono">
                            {cust.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4">
                      <div className="text-espresso-800 font-medium">{cust.phone}</div>
                      <div className="text-[11px] text-warmgray-500">{cust.email}</div>
                    </td>

                    {/* Total Orders */}
                    <td className="py-4 px-4 font-bold text-espresso-800">
                      {cust.totalOrders} visits
                    </td>

                    {/* Total Spent */}
                    <td className="py-4 px-4 font-bold text-coffee-700 text-sm">
                      ₹{cust.totalSpent?.toLocaleString('en-IN')}
                    </td>

                    {/* Last visit */}
                    <td className="py-4 px-4 text-warmgray-600 font-medium">
                      {cust.lastOrderDate}
                    </td>

                    {/* Type */}
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          cust.customerType?.includes('VIP')
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-sage-100 text-sage-800 border border-sage-300'
                        }`}
                      >
                        {cust.customerType}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-espresso-800 hover:text-cream-50 text-espresso-800 font-bold text-xs transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer Quick View Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-soft-xl border border-cream-200">
            <div className="flex items-center justify-between pb-4 border-b border-cream-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-espresso-800 text-cream-50 font-bold text-base flex items-center justify-center">
                  {selectedCustomer.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-espresso-800">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-xs text-coffee-600 font-semibold">
                    {selectedCustomer.customerType} Patron
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-warmgray-400 hover:text-espresso-800 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-cream-50 rounded-2xl border border-cream-200 text-center">
                <div>
                  <span className="text-warmgray-500 uppercase font-bold text-[10px] block">Total Visits</span>
                  <span className="text-lg font-bold text-espresso-800">{selectedCustomer.totalOrders}</span>
                </div>
                <div>
                  <span className="text-warmgray-500 uppercase font-bold text-[10px] block">Total Spent</span>
                  <span className="text-lg font-bold text-coffee-700">
                    ₹{selectedCustomer.totalSpent?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-warmgray-700">
                  <Phone className="w-4 h-4 text-coffee-600" />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-warmgray-700">
                  <Mail className="w-4 h-4 text-coffee-600" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-warmgray-700">
                  <Calendar className="w-4 h-4 text-coffee-600" />
                  <span>Last Visited: {selectedCustomer.lastOrderDate}</span>
                </div>
                <div className="flex items-center gap-2 text-warmgray-700">
                  <Coffee className="w-4 h-4 text-coffee-600" />
                  <span>Favorite Order: <strong>{selectedCustomer.favoriteItem}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-cream-100 text-right">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-espresso-800 text-cream-50 text-xs font-bold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomersPage;
