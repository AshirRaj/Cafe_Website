import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Trash2,
  Calendar,
  DollarSign,
  TrendingDown,
  X,
  CheckCircle,
  Tag
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { expenseCategories } from '../../data/admin/adminExpenses';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import EmptyState from '../../components/admin/EmptyState';

export const AdminExpensesPage = () => {
  const { expenses, addExpense, deleteExpense } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const [formData, setFormData] = useState({
    category: 'Ingredients',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'UPI',
    paidTo: ''
  });

  // Calculate totals
  const todayStr = '2026-09-17';
  const todayExpenses = expenses
    .filter((e) => e.date === todayStr)
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const thisMonthExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const filteredExpenses = expenses.filter(
    (e) => selectedCategory === 'All' || e.category === selectedCategory
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.amount) return;

    addExpense({
      ...formData,
      amount: Number(formData.amount)
    });

    setModalOpen(false);
    setFormData({
      category: 'Ingredients',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'UPI',
      paidTo: ''
    });
  };

  const handleDeleteConfirm = () => {
    if (expenseToDelete) {
      deleteExpense(expenseToDelete.id);
      setExpenseToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-1 bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-warmgray-500 tracking-wider">
              Today's Expenses
            </span>
            <h3 className="text-2xl font-bold font-sans text-terracotta-600 mt-1">
              ₹{todayExpenses.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-warmgray-500 mt-1">LPG refills & morning fresh dairy</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 w-full py-2.5 bg-espresso-800 hover:bg-espresso-700 text-cream-50 rounded-xl text-xs font-bold transition-all shadow-soft flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 text-terracotta-400" />
            <span>Record New Expense</span>
          </button>
        </div>

        <div className="md:col-span-1 bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-warmgray-500 tracking-wider">
              This Month's Total Expenses
            </span>
            <h3 className="text-2xl font-bold font-sans text-espresso-800 mt-1">
              ₹{thisMonthExpenses.toLocaleString('en-IN')}
            </h3>
            <p className="text-xs text-warmgray-500 mt-1">Includes rent, salaries, utilities, and daily produce</p>
          </div>
          <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between text-xs text-warmgray-600 font-medium">
            <span>{expenses.length} expense vouchers</span>
            <span className="text-sage-700 font-bold">Within Budget</span>
          </div>
        </div>

        <div className="md:col-span-1 bg-white rounded-3xl border border-cream-200 p-6 shadow-soft">
          <h4 className="font-serif font-bold text-sm text-espresso-800 mb-2">Expense Filter</h4>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
          >
            <option value="All">All Categories ({expenses.length})</option>
            {expenseCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-warmgray-500 mt-2">
            Categorize simple café costs to track store profitability.
          </p>
        </div>
      </div>

      {/* Expenses Table */}
      {filteredExpenses.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No expenses logged"
          description="No expense entries found for the selected category."
          actionLabel="Add Expense"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-warmgray-600 bg-cream-50/70 border-b border-cream-200">
                  <th className="py-4 px-5 font-bold">Date</th>
                  <th className="py-4 px-4 font-bold">Category</th>
                  <th className="py-4 px-4 font-bold">Description</th>
                  <th className="py-4 px-4 font-bold">Paid To</th>
                  <th className="py-4 px-4 font-bold">Method</th>
                  <th className="py-4 px-4 font-bold">Amount</th>
                  <th className="py-4 px-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-cream-50/60 transition-colors">
                    <td className="py-4 px-5 font-medium text-warmgray-700 whitespace-nowrap">
                      {exp.date}
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-cream-100 text-espresso-800 font-bold text-[11px] border border-cream-200">
                        {exp.category}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <p className="font-bold text-espresso-800">{exp.description}</p>
                    </td>

                    <td className="py-4 px-4 text-warmgray-600 font-medium">
                      {exp.paidTo || 'Cash Vendor'}
                    </td>

                    <td className="py-4 px-4 font-semibold text-espresso-800">
                      {exp.paymentMethod || 'UPI'}
                    </td>

                    <td className="py-4 px-4 font-bold text-terracotta-600 text-sm">
                      ₹{exp.amount?.toLocaleString('en-IN')}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setExpenseToDelete(exp)}
                        className="p-2 rounded-xl bg-cream-100 hover:bg-terracotta-600 hover:text-white text-terracotta-600 transition-colors"
                        title="Delete Voucher"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-soft-xl border border-cream-200">
            <div className="flex items-center justify-between pb-4 border-b border-cream-100">
              <h3 className="font-serif font-bold text-lg text-espresso-800">Record Café Expense</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-warmgray-400 hover:text-espresso-800 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                  Expense Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                >
                  {expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                  Description / Purpose *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial LPG cylinder refill"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 3800"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Payment Method
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Paid To / Vendor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indane Gas"
                    value={formData.paidTo}
                    onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-cream-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-warmgray-700 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-espresso-800 hover:bg-espresso-700 text-cream-50 text-xs font-bold shadow-soft"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(expenseToDelete)}
        title="Delete Expense Entry"
        message={`Are you sure you want to delete expense "${expenseToDelete?.description}" (₹${expenseToDelete?.amount})?`}
        confirmText="Delete Expense"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setExpenseToDelete(null)}
      />
    </div>
  );
};

export default AdminExpensesPage;
