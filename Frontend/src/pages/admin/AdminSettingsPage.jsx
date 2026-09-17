import React, { useState } from 'react';
import {
  Settings,
  Store,
  Clock,
  CheckCircle,
  Percent,
  Receipt,
  Save,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminSettingsPage = () => {
  const { settings, updateSettings } = useAdmin();

  const [formData, setFormData] = useState({ ...settings });
  const [saveToast, setSaveToast] = useState(false);

  const handleInfoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      cafeInfo: {
        ...prev.cafeInfo,
        [field]: value
      }
    }));
  };

  const handleHourChange = (index, field, value) => {
    setFormData((prev) => {
      const newHours = [...prev.openingHours];
      newHours[index] = {
        ...newHours[index],
        [field]: value
      };
      return {
        ...prev,
        openingHours: newHours
      };
    });
  };

  const handleOrderSettingToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      orderSettings: {
        ...prev.orderSettings,
        [field]: !prev.orderSettings[field]
      }
    }));
  };

  const handleTaxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      taxSettings: {
        ...prev.taxSettings,
        [field]: value
      }
    }));
  };

  const handleInvoiceChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      invoiceSettings: {
        ...prev.invoiceSettings,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-espresso-800">Café Settings</h2>
          <p className="text-xs text-warmgray-600">
            Configure storefront profile, operating hours, order types, and invoice numbering
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-espresso-800 hover:bg-espresso-700 text-cream-50 rounded-xl text-xs font-bold shadow-soft transition-all"
        >
          <Save className="w-4 h-4 text-terracotta-400" />
          <span>Save All Settings</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-4 rounded-2xl bg-sage-100 border border-sage-500/30 text-sage-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-sage-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Café Info */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-cream-100">
            <Store className="w-5 h-5 text-coffee-600" />
            <h3 className="font-serif font-bold text-lg text-espresso-800">Café Profile Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                Café Legal / Brand Name
              </label>
              <input
                type="text"
                value={formData.cafeInfo.name}
                onChange={(e) => handleInfoChange('name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                Contact Phone
              </label>
              <input
                type="text"
                value={formData.cafeInfo.phone}
                onChange={(e) => handleInfoChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                Public Email
              </label>
              <input
                type="email"
                value={formData.cafeInfo.email}
                onChange={(e) => handleInfoChange('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                FSSAI License / Reg. No.
              </label>
              <input
                type="text"
                value={formData.cafeInfo.fssaiLicense || ''}
                onChange={(e) => handleInfoChange('fssaiLicense', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                Physical Café Address
              </label>
              <textarea
                rows={2}
                value={formData.cafeInfo.address}
                onChange={(e) => handleInfoChange('address', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Opening Hours */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-cream-100">
            <Clock className="w-5 h-5 text-coffee-600" />
            <h3 className="font-serif font-bold text-lg text-espresso-800">Weekly Operating Hours</h3>
          </div>

          <div className="space-y-2.5">
            {formData.openingHours?.map((slot, index) => (
              <div
                key={slot.day}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-cream-50 border border-cream-200 text-xs"
              >
                <div className="w-28 font-bold text-espresso-800 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={slot.isOpen}
                    onChange={(e) => handleHourChange(index, 'isOpen', e.target.checked)}
                    className="w-4 h-4 rounded text-coffee-600 focus:ring-coffee-500 border-cream-300"
                  />
                  <span>{slot.day}</span>
                </div>

                <div className="flex items-center gap-2 flex-1 justify-end">
                  {slot.isOpen ? (
                    <>
                      <input
                        type="text"
                        value={slot.opens}
                        onChange={(e) => handleHourChange(index, 'opens', e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-cream-300 bg-white text-xs w-28 text-center text-espresso-800 font-semibold"
                      />
                      <span className="text-warmgray-500">to</span>
                      <input
                        type="text"
                        value={slot.closes}
                        onChange={(e) => handleHourChange(index, 'closes', e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-cream-300 bg-white text-xs w-28 text-center text-espresso-800 font-semibold"
                      />
                    </>
                  ) : (
                    <span className="text-warmgray-400 italic">Closed all day</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Order Settings & Fulfillment */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-soft space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-cream-100">
            <Settings className="w-5 h-5 text-coffee-600" />
            <h3 className="font-serif font-bold text-lg text-espresso-800">Order Channel Controls</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-cream-200 bg-cream-50/50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.orderSettings.enableDineIn}
                onChange={() => handleOrderSettingToggle('enableDineIn')}
                className="w-5 h-5 rounded text-coffee-600 focus:ring-coffee-500 border-cream-300"
              />
              <div>
                <span className="text-xs font-bold text-espresso-800 block">Enable Dine In</span>
                <span className="text-[11px] text-warmgray-600">Table QR & orders</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-2xl border border-cream-200 bg-cream-50/50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.orderSettings.enableTakeaway}
                onChange={() => handleOrderSettingToggle('enableTakeaway')}
                className="w-5 h-5 rounded text-coffee-600 focus:ring-coffee-500 border-cream-300"
              />
              <div>
                <span className="text-xs font-bold text-espresso-800 block">Enable Takeaway</span>
                <span className="text-[11px] text-warmgray-600">Counter pickup</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-2xl border border-cream-200 bg-cream-50/50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.orderSettings.enableDelivery}
                onChange={() => handleOrderSettingToggle('enableDelivery')}
                className="w-5 h-5 rounded text-coffee-600 focus:ring-coffee-500 border-cream-300"
              />
              <div>
                <span className="text-xs font-bold text-espresso-800 block">Enable Delivery</span>
                <span className="text-[11px] text-warmgray-600">Local doorstep delivery</span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 4: Tax & Invoice Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Tax Settings */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-cream-100">
              <Percent className="w-4 h-4 text-coffee-600" />
              <h3 className="font-serif font-bold text-base text-espresso-800">Tax Settings</h3>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                Standard GST Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="28"
                value={formData.taxSettings.taxPercentage}
                onChange={(e) => handleTaxChange('taxPercentage', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
              />
              <p className="text-[11px] text-warmgray-500 mt-1">
                Currently 5% applicable for restaurant food & beverages.
              </p>
            </div>
          </div>

          {/* Invoice Settings */}
          <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-cream-100">
              <Receipt className="w-4 h-4 text-coffee-600" />
              <h3 className="font-serif font-bold text-base text-espresso-800">Invoice Settings</h3>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-warmgray-700 mb-1.5">
                Invoice Number Prefix
              </label>
              <input
                type="text"
                value={formData.invoiceSettings.invoicePrefix}
                onChange={(e) => handleInvoiceChange('invoicePrefix', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50/50 text-xs text-espresso-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coffee-500"
              />
              <p className="text-[11px] text-warmgray-500 mt-1">
                e.g. CAF-2026-001 for customer order receipts.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-espresso-800 hover:bg-espresso-700 text-cream-50 text-sm font-bold shadow-soft transition-all"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
