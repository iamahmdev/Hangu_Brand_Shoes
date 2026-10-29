import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { StoreSettings } from '../../types';
import { Save, Check, RefreshCw } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();

  const [formSettings, setFormSettings] = useState<StoreSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (key: keyof StoreSettings, val: any) => {
    setFormSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formSettings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block mb-1">
          Store Configuration
        </span>
        <h1 className="font-playfair text-3xl font-bold text-[#17140F]">
          Shop &amp; Shipping Settings
        </h1>
        <p className="text-xs text-[#6B645B] mt-0.5">
          Configure shop name, Lahore address, WhatsApp ordering numbers, and delivery charges.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6DA] shadow-xs max-w-3xl">
        
        {saveSuccess && (
          <div className="mb-6 p-3 bg-[#138A55]/15 border border-[#138A55]/30 rounded-xl text-xs font-bold text-[#138A55] flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Settings updated successfully! Changes are live across the store.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          
          <div className="space-y-4">
            <h3 className="font-playfair text-base font-bold text-[#17140F] pb-2 border-b border-[#EDE6DA]">
              Brand &amp; Showroom Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#17140F]">Shop Brand Name</label>
                <input
                  type="text"
                  required
                  value={formSettings.shop_name}
                  onChange={(e) => handleChange('shop_name', e.target.value)}
                  className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#17140F]">Headquarters City</label>
                <input
                  type="text"
                  required
                  value={formSettings.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A66B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#17140F]">Full Showroom Address</label>
              <textarea
                rows={2}
                required
                value={formSettings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A66B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#17140F]">Opening Hours Display</label>
              <input
                type="text"
                required
                value={formSettings.opening_hours}
                onChange={(e) => handleChange('opening_hours', e.target.value)}
                className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A66B]"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#EDE6DA]">
            <h3 className="font-playfair text-base font-bold text-[#17140F] pb-2 border-b border-[#EDE6DA]">
              Contact &amp; WhatsApp Integration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#17140F]">Customer Care Phone</label>
                <input
                  type="text"
                  required
                  value={formSettings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#17140F]">WhatsApp Number (92XXXXXXXXXX)</label>
                <input
                  type="text"
                  required
                  value={formSettings.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-[#C9A66B]"
                />
                <span className="text-[10px] text-[#6B645B] block">Format: 923001234567 (no + or spaces)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#EDE6DA]">
            <h3 className="font-playfair text-base font-bold text-[#17140F] pb-2 border-b border-[#EDE6DA]">
              Shipping &amp; Promotion Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#17140F]">Standard Delivery Charge (PKR)</label>
                <input
                  type="number"
                  required
                  value={formSettings.delivery_charge}
                  onChange={(e) => handleChange('delivery_charge', Number(e.target.value))}
                  className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-[#C9A66B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#17140F]">Free Delivery Threshold (PKR)</label>
                <input
                  type="number"
                  required
                  value={formSettings.free_delivery_above}
                  onChange={(e) => handleChange('free_delivery_above', Number(e.target.value))}
                  className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-[#C9A66B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#17140F]">Top Announcement Banner Text</label>
              <input
                type="text"
                required
                value={formSettings.announcement_text}
                onChange={(e) => handleChange('announcement_text', e.target.value)}
                className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C9A66B]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#D1112B] hover:bg-[#A80D22] text-white px-8 py-3 rounded-xl font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Settings'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
