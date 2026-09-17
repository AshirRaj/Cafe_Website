import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  UtensilsCrossed,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Check,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import EmptyState from '../../components/admin/EmptyState';
import { IMAGES } from '../../assets/images/imageRegistry';

export const AdminMenuPage = () => {
  const { products, categories, toggleProductAvailability, deleteProduct } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  // Deletion modal state
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || prod.category?.toLowerCase() === selectedCategory.toLowerCase();

    const isAvailable = prod.inStock !== false;
    const matchesAvailability =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && isAvailable) ||
      (availabilityFilter === 'outofstock' && !isAvailable);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Add Button */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-espresso-800">Café Menu Items</h2>
            <p className="text-xs text-warmgray-600">
              Manage product offerings, pricing, add-ons, and kitchen availability ({products.length} total)
            </p>
          </div>

          <Link
            to="/admin/menu/add"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-espresso-800 hover:bg-espresso-700 text-cream-50 rounded-xl text-xs font-bold shadow-soft transition-all"
          >
            <Plus className="w-4 h-4 text-terracotta-400" />
            <span>Add Menu Product</span>
          </Link>
        </div>

        {/* Search and Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-cream-100">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warmgray-400" />
            <input
              type="text"
              placeholder="Search products by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all"
            />
          </div>

          {/* Category dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name || cat.shortName}
                </option>
              ))}
            </select>
          </div>

          {/* Availability filter */}
          <div>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
            >
              <option value="all">All Availability</option>
              <option value="available">In Stock (Available)</option>
              <option value="outofstock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Menu Table or Empty State */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={UtensilsCrossed}
          title="No menu items matched"
          description="Try broadening your search or switching categories."
          actionLabel="Add New Product"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-warmgray-600 bg-cream-50/70 border-b border-cream-200">
                  <th className="py-4 px-5 font-bold">Product</th>
                  <th className="py-4 px-4 font-bold">Category</th>
                  <th className="py-4 px-4 font-bold">Price</th>
                  <th className="py-4 px-4 font-bold">Dietary</th>
                  <th className="py-4 px-4 font-bold">Live Availability</th>
                  <th className="py-4 px-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {filteredProducts.map((product) => {
                  const isAvailable = product.inStock !== false;
                  return (
                    <tr key={product.id} className="hover:bg-cream-50/60 transition-colors">
                      {/* Product Name & thumbnail */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || IMAGES.heroEspresso}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-cream-200 bg-cream-100 shrink-0"
                            onError={(e) => {
                              e.target.src = IMAGES.heroEspresso;
                            }}
                          />
                          <div>
                            <p className="font-bold text-espresso-800 text-sm">{product.name}</p>
                            <p className="text-[11px] text-warmgray-500 max-w-[220px] truncate">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-cream-100 text-espresso-800 font-semibold text-[11px] capitalize border border-cream-200">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-bold text-espresso-800 text-sm">
                        ₹{product.price}
                      </td>

                      {/* Dietary */}
                      <td className="py-4 px-4">
                        {product.isVeg !== false ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Veg
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-terracotta-700 font-semibold bg-terracotta-50 px-2 py-0.5 rounded-md border border-terracotta-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600" />
                            Non-Veg
                          </span>
                        )}
                      </td>

                      {/* Live Availability Toggle */}
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => toggleProductAvailability(product.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                            isAvailable
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-cream-200 text-warmgray-600 border-cream-300 hover:bg-cream-300'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-warmgray-400'}`}
                          />
                          <span>{isAvailable ? 'Available' : 'Out of Stock'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/menu/${product.id}/edit`}
                            className="p-2 rounded-xl bg-cream-100 hover:bg-espresso-800 hover:text-cream-50 text-espresso-800 transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setProductToDelete(product)}
                            className="p-2 rounded-xl bg-cream-100 hover:bg-terracotta-600 hover:text-white text-terracotta-600 transition-colors"
                            title="Delete Product"
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

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(productToDelete)}
        title="Delete Menu Item"
        message={`Are you sure you want to remove "${productToDelete?.name}" from your café menu? This item will no longer appear on customer storefronts.`}
        confirmText="Delete Item"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
};

export default AdminMenuPage;
