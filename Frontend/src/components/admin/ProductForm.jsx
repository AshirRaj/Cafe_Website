import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { IMAGES } from '../../assets/images/imageRegistry';

export const ProductForm = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const { categories, addProduct, updateProduct } = useAdmin();

  // Preset image gallery choices for easy selection
  const imagePresets = [
    { label: 'Cappuccino', url: IMAGES.heroEspresso },
    { label: 'Cold Brew', url: IMAGES.coldBrew },
    { label: 'Latte', url: IMAGES.latteArt },
    { label: 'Croissant', url: IMAGES.croissant },
    { label: 'Sourdough Toast', url: IMAGES.sourdoughToast },
    { label: 'Burger', url: IMAGES.burger },
    { label: 'Fries', url: IMAGES.fries },
    { label: 'Waffles', url: IMAGES.dessertWaffle },
    { label: 'Cheesecake', url: IMAGES.cheesecake },
    { label: 'Matcha', url: IMAGES.matchaLatte },
  ];

  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.id || 'coffee',
    price: '',
    description: '',
    image: imagePresets[0].url,
    prepTime: '10-12 mins',
    isVeg: true,
    inStock: true,
    isPopular: false,
    ingredients: '',
    addons: []
  });

  const [newAddonName, setNewAddonName] = useState('');
  const [newAddonPrice, setNewAddonPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || categories[0]?.id || 'coffee',
        price: initialData.price || '',
        description: initialData.description || '',
        image: initialData.image || imagePresets[0].url,
        prepTime: initialData.prepTime || '10-12 mins',
        isVeg: initialData.isVeg !== undefined ? initialData.isVeg : true,
        inStock: initialData.inStock !== undefined ? initialData.inStock : true,
        isPopular: initialData.isPopular || false,
        ingredients: Array.isArray(initialData.ingredients)
          ? initialData.ingredients.join(', ')
          : initialData.ingredients || '',
        addons: initialData.addons || []
      });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Valid price in ₹ is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.image.trim()) errs.image = 'Product image is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddAddon = (e) => {
    e.preventDefault();
    if (!newAddonName.trim() || !newAddonPrice) return;
    setFormData((prev) => ({
      ...prev,
      addons: [
        ...prev.addons,
        {
          id: `addon_${Date.now()}`,
          name: newAddonName.trim(),
          price: Number(newAddonPrice)
        }
      ]
    }));
    setNewAddonName('');
    setNewAddonPrice('');
  };

  const handleRemoveAddon = (index) => {
    setFormData((prev) => ({
      ...prev,
      addons: prev.addons.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedData = {
      ...formData,
      price: Number(formData.price),
      ingredients: formData.ingredients
        ? formData.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
        : []
    };

    if (isEdit && initialData?.id) {
      updateProduct(initialData.id, formattedData);
    } else {
      addProduct(formattedData);
    }

    setSubmittedSuccess(true);
    setTimeout(() => {
      navigate('/admin/menu');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/admin/menu')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-warmgray-600 hover:text-espresso-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu List</span>
        </button>
      </div>

      {submittedSuccess && (
        <div className="p-4 rounded-2xl bg-sage-100 border border-sage-500/30 text-sage-800 flex items-center gap-3 font-semibold text-sm">
          <CheckCircle className="w-5 h-5 text-sage-600 shrink-0" />
          <span>Product successfully {isEdit ? 'updated' : 'added to menu'}! Redirecting to menu...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-8">
        {/* Section 1: Basic details */}
        <div>
          <h3 className="font-serif font-bold text-lg text-espresso-800 border-b border-cream-100 pb-3 mb-5">
            General Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Single Origin Spanish Latte"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border bg-cream-50/50 text-sm text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all ${
                  errors.name ? 'border-terracotta-500' : 'border-cream-300'
                }`}
              />
              {errors.name && <p className="text-xs text-terracotta-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50/50 text-sm text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name || cat.shortName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-2">
                Price (₹ INR) *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 210"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border bg-cream-50/50 text-sm text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all ${
                  errors.price ? 'border-terracotta-500' : 'border-cream-300'
                }`}
              />
              {errors.price && <p className="text-xs text-terracotta-600 mt-1">{errors.price}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-2">
                Description *
              </label>
              <textarea
                rows={3}
                placeholder="Rich espresso balanced with condensed milk and whole milk over artisanal ice cubes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border bg-cream-50/50 text-sm text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all ${
                  errors.description ? 'border-terracotta-500' : 'border-cream-300'
                }`}
              />
              {errors.description && <p className="text-xs text-terracotta-600 mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-2">
                Est. Preparation Time
              </label>
              <input
                type="text"
                placeholder="e.g. 5-8 mins"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50/50 text-sm text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-2">
                Key Ingredients (Optional, Comma separated)
              </label>
              <input
                type="text"
                placeholder="Espresso, Whole milk, Condensed milk, Vanilla"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50/50 text-sm text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Image selection & Preview */}
        <div>
          <h3 className="font-serif font-bold text-lg text-espresso-800 border-b border-cream-100 pb-3 mb-5">
            Product Imagery
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            <div className="sm:col-span-1">
              <p className="text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-2">Live Preview</p>
              <div className="aspect-square rounded-2xl overflow-hidden border border-cream-300 bg-cream-100 shadow-sm flex items-center justify-center relative">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = IMAGES.heroEspresso;
                    }}
                  />
                ) : (
                  <ImageIcon className="w-10 h-10 text-warmgray-400" />
                )}
              </div>
            </div>

            <div className="sm:col-span-2 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-2">
                  Image URL or Preset
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50/50 text-sm text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500 transition-all"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-warmgray-600 mb-2">Quick Cafe Presets:</p>
                <div className="flex flex-wrap gap-2">
                  {imagePresets.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        formData.image === preset.url
                          ? 'bg-espresso-800 text-cream-50 border-espresso-800'
                          : 'bg-cream-100 text-espresso-800 border-cream-200 hover:bg-cream-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Dietary & Toggles */}
        <div>
          <h3 className="font-serif font-bold text-lg text-espresso-800 border-b border-cream-100 pb-3 mb-5">
            Attributes & Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-cream-200 bg-cream-50/40 cursor-pointer hover:bg-cream-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.isVeg}
                onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                className="w-5 h-5 rounded text-sage-600 focus:ring-sage-500 border-cream-300"
              />
              <div>
                <span className="text-sm font-bold text-espresso-800 block">Vegetarian (Veg)</span>
                <span className="text-xs text-warmgray-600">Uncheck if Non-Veg</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-2xl border border-cream-200 bg-cream-50/40 cursor-pointer hover:bg-cream-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-cream-300"
              />
              <div>
                <span className="text-sm font-bold text-espresso-800 block">Available (In Stock)</span>
                <span className="text-xs text-warmgray-600">Visible for live orders</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-2xl border border-cream-200 bg-cream-50/40 cursor-pointer hover:bg-cream-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                className="w-5 h-5 rounded text-coffee-600 focus:ring-coffee-500 border-cream-300"
              />
              <div>
                <span className="text-sm font-bold text-espresso-800 block">Chef's Signature</span>
                <span className="text-xs text-warmgray-600">Feature on homepage</span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 4: Add-ons & Customizations */}
        <div>
          <h3 className="font-serif font-bold text-lg text-espresso-800 border-b border-cream-100 pb-3 mb-5">
            Add-ons & Customizations (Optional)
          </h3>

          <div className="space-y-3 mb-5">
            {formData.addons.length === 0 ? (
              <p className="text-xs text-warmgray-500 italic">No add-ons created yet for this item.</p>
            ) : (
              formData.addons.map((addon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-cream-50 border border-cream-200 text-sm"
                >
                  <span className="font-semibold text-espresso-800">{addon.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-coffee-600 font-bold">+₹{addon.price}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAddon(index)}
                      className="text-terracotta-500 hover:text-terracotta-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add-on input row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="text"
              placeholder="Add-on Name (e.g. Extra Espresso Shot)"
              value={newAddonName}
              onChange={(e) => setNewAddonName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
            />
            <input
              type="number"
              min="0"
              placeholder="Price ₹ (e.g. 40)"
              value={newAddonPrice}
              onChange={(e) => setNewAddonPrice(e.target.value)}
              className="w-full sm:w-32 px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
            />
            <button
              type="button"
              onClick={handleAddAddon}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-coffee-600 hover:bg-coffee-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Option</span>
            </button>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="pt-6 border-t border-cream-200 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/menu')}
            className="px-6 py-3 rounded-xl border border-cream-300 text-sm font-semibold text-warmgray-700 hover:bg-cream-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-espresso-800 hover:bg-espresso-700 active:scale-98 text-cream-50 text-sm font-bold shadow-soft transition-all"
          >
            {isEdit ? 'Save Changes' : 'Create Menu Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
