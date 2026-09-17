import React, { useState } from 'react';
import {
  Boxes,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  Search,
  PlusCircle,
  MinusCircle,
  X,
  CheckCircle,
  ArrowUpDown
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import EmptyState from '../../components/admin/EmptyState';

export const AdminInventoryPage = () => {
  const {
    inventory,
    updateInventoryStock,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStockOnly, setFilterLowStockOnly] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    item: '',
    category: 'Coffee',
    currentStock: '',
    unit: 'kg',
    minimumStock: '',
    supplier: '',
    costPerUnit: ''
  });

  const lowStockCount = inventory.filter((i) => i.status === 'Low Stock').length;

  const filteredInventory = inventory.filter((inv) => {
    const matchesSearch =
      inv.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.supplier?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLowStock = !filterLowStockOnly || inv.status === 'Low Stock';

    return matchesSearch && matchesLowStock;
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      item: '',
      category: 'Coffee',
      currentStock: '10',
      unit: 'kg',
      minimumStock: '5',
      supplier: 'Local Supplier',
      costPerUnit: '100'
    });
    setModalOpen(true);
  };

  const openEditModal = (inv) => {
    setEditingItem(inv);
    setFormData({
      item: inv.item || '',
      category: inv.category || 'Coffee',
      currentStock: String(inv.currentStock || ''),
      unit: inv.unit || 'kg',
      minimumStock: String(inv.minimumStock || ''),
      supplier: inv.supplier || '',
      costPerUnit: String(inv.costPerUnit || '')
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.item.trim()) return;

    const payload = {
      ...formData,
      currentStock: Number(formData.currentStock) || 0,
      minimumStock: Number(formData.minimumStock) || 0,
      costPerUnit: Number(formData.costPerUnit) || 0
    };

    if (editingItem) {
      updateInventoryItem(editingItem.id, payload);
    } else {
      addInventoryItem(payload);
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteInventoryItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Low Stock Banner */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-espresso-800">Café Inventory</h2>
            <p className="text-xs text-warmgray-600">
              Track essential coffee beans, milk, bakery dough, syrups, and packaging ({inventory.length} items)
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-espresso-800 hover:bg-espresso-700 text-cream-50 rounded-xl text-xs font-bold shadow-soft transition-all"
          >
            <Plus className="w-4 h-4 text-terracotta-400" />
            <span>Add Stock Item</span>
          </button>
        </div>

        {/* Search & Quick Toggles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-cream-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warmgray-400" />
            <input
              type="text"
              placeholder="Search ingredient, packaging, supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
            />
          </div>

          {/* Low Stock Toggle Button */}
          <button
            onClick={() => setFilterLowStockOnly(!filterLowStockOnly)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              filterLowStockOnly
                ? 'bg-terracotta-600 text-white border-terracotta-700 shadow-sm'
                : 'bg-cream-100 text-warmgray-700 border-cream-200 hover:bg-cream-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Low Stock Filter ({lowStockCount})</span>
          </button>
        </div>
      </div>

      {/* Inventory Table or Empty State */}
      {filteredInventory.length === 0 ? (
        <EmptyState
          icon={Boxes}
          title="No inventory items found"
          description="Try clearing search or filters to see all pantry and bar supplies."
          actionLabel="View All Stock"
          onAction={() => {
            setSearchTerm('');
            setFilterLowStockOnly(false);
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-warmgray-600 bg-cream-50/70 border-b border-cream-200">
                  <th className="py-4 px-5 font-bold">Ingredient / Item</th>
                  <th className="py-4 px-4 font-bold">Category</th>
                  <th className="py-4 px-4 font-bold">Current Stock</th>
                  <th className="py-4 px-4 font-bold">Min Threshold</th>
                  <th className="py-4 px-4 font-bold">Quick Stock Adjust</th>
                  <th className="py-4 px-4 font-bold">Status</th>
                  <th className="py-4 px-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {filteredInventory.map((inv) => {
                  const isLow = inv.status === 'Low Stock';
                  return (
                    <tr
                      key={inv.id}
                      className={`hover:bg-cream-50/60 transition-colors ${
                        isLow ? 'bg-amber-50/20' : ''
                      }`}
                    >
                      {/* Item & supplier */}
                      <td className="py-4 px-5">
                        <p className="font-bold text-espresso-800 text-sm">{inv.item}</p>
                        <span className="text-[11px] text-warmgray-500">
                          Supplier: {inv.supplier || 'Direct'} • Last: {inv.lastRestocked}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-cream-100 text-espresso-800 font-semibold text-[11px] border border-cream-200">
                          {inv.category}
                        </span>
                      </td>

                      {/* Current Stock */}
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-espresso-800 font-sans">
                          {inv.currentStock} {inv.unit}
                        </span>
                      </td>

                      {/* Min Stock */}
                      <td className="py-4 px-4 text-warmgray-600 font-medium">
                        {inv.minimumStock} {inv.unit}
                      </td>

                      {/* Quick Adjust +/- Buttons */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateInventoryStock(inv.id, -1, true)}
                            className="p-1 rounded-lg bg-cream-100 hover:bg-cream-200 text-espresso-800 transition-colors"
                            title="Decrease Stock (-1)"
                          >
                            <MinusCircle className="w-4 h-4 text-warmgray-600" />
                          </button>
                          <span className="w-10 text-center font-bold text-espresso-800">
                            {inv.currentStock}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateInventoryStock(inv.id, 1, true)}
                            className="p-1 rounded-lg bg-cream-100 hover:bg-cream-200 text-espresso-800 transition-colors"
                            title="Increase Stock (+1)"
                          >
                            <PlusCircle className="w-4 h-4 text-coffee-600" />
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <StatusBadge status={inv.status} type="inventory" size="sm" />
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(inv)}
                            className="p-2 rounded-xl bg-cream-100 hover:bg-espresso-800 hover:text-cream-50 text-espresso-800 transition-colors"
                            title="Edit Item"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setItemToDelete(inv)}
                            className="p-2 rounded-xl bg-cream-100 hover:bg-terracotta-600 hover:text-white text-terracotta-600 transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Inventory Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-soft-xl border border-cream-200">
            <div className="flex items-center justify-between pb-4 border-b border-cream-100">
              <h3 className="font-serif font-bold text-lg text-espresso-800">
                {editingItem ? 'Edit Inventory Item' : 'Add Stock Item'}
              </h3>
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
                  Item / Ingredient Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Single Origin Arabica Beans"
                  value={formData.item}
                  onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Dairy Alternative">Dairy Alternative</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Sweeteners">Sweeteners</option>
                    <option value="Syrups">Syrups</option>
                    <option value="Produce">Produce</option>
                    <option value="Cheese">Cheese</option>
                    <option value="Packaging">Packaging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Unit of Measure
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  >
                    <option value="kg">kg (Kilograms)</option>
                    <option value="g">g (Grams)</option>
                    <option value="L">L (Liters)</option>
                    <option value="ml">ml (Milliliters)</option>
                    <option value="pcs">pcs (Pieces)</option>
                    <option value="Loaves">Loaves</option>
                    <option value="Bottles">Bottles</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Current Stock *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    placeholder="e.g. 5"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                    Minimum Threshold *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    placeholder="e.g. 2"
                    value={formData.minimumStock}
                    onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                  Supplier / Vendor Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Coorg Estate Direct"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
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
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(itemToDelete)}
        title="Delete Stock Item"
        message={`Are you sure you want to remove "${itemToDelete?.item}" from inventory tracking?`}
        confirmText="Delete Stock Item"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
};

export default AdminInventoryPage;
