import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Coffee,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { IMAGES } from '../../assets/images/imageRegistry';

export const AdminCategoriesPage = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdmin();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    description: '',
    image: IMAGES.categoryCoffee
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      shortName: '',
      description: '',
      image: IMAGES.categoryCoffee
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || '',
      shortName: cat.shortName || cat.name || '',
      description: cat.description || '',
      image: cat.image || IMAGES.categoryCoffee
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-espresso-800">Menu Categories</h2>
          <p className="text-xs text-warmgray-600">
            Organize offerings into curated sections for customers and kitchen staff
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-espresso-800 hover:bg-espresso-700 text-cream-50 rounded-xl text-xs font-bold shadow-soft transition-all"
        >
          <Plus className="w-4 h-4 text-terracotta-400" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categories.map((cat) => {
          const productCount = products.filter(
            (p) => p.category?.toLowerCase() === cat.id?.toLowerCase()
          ).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-cream-200 p-5 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-cream-100 border border-cream-200 overflow-hidden shrink-0">
                    <img
                      src={cat.image || IMAGES.categoryCoffee}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = IMAGES.categoryCoffee;
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 rounded-lg text-warmgray-500 hover:text-espresso-800 hover:bg-cream-100 transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCategoryToDelete(cat)}
                      className="p-1.5 rounded-lg text-warmgray-500 hover:text-terracotta-600 hover:bg-cream-100 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-base text-espresso-800">{cat.name}</h3>
                <p className="text-xs text-warmgray-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description || 'Artisanal selections curated for your palate.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between text-xs">
                <span className="text-warmgray-600 font-medium">Items in section:</span>
                <span className="font-bold px-2 py-0.5 rounded-full bg-cream-100 text-espresso-800 border border-cream-200">
                  {productCount} products
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-soft-xl border border-cream-200">
            <div className="flex items-center justify-between pb-4 border-b border-cream-100">
              <h3 className="font-serif font-bold text-lg text-espresso-800">
                {editingCategory ? 'Edit Category' : 'Create Category'}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Specialty Cold Brews"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                  Short Tag Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cold Brews"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Slow-steeped craft coffee and refreshing infusions..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(categoryToDelete)}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? Items inside this category will remain preserved.`}
        confirmText="Delete Category"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setCategoryToDelete(null)}
      />
    </div>
  );
};

export default AdminCategoriesPage;
