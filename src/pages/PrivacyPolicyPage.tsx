import React from 'react';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { useStore } from '../context/StoreContext';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-16">
      <SEOHead title="Privacy Policy" description="How we handle your contact details, orders, and addresses with utmost privacy." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <SectionHeading
          kicker="DATA INTEGRITY"
          title="Privacy Policy"
          subtitle="Your personal information is sacred to our brand. Here is how we safeguard your data."
        />

        <div className="bg-white rounded-2xl border border-[#EDE6DA] p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-[#17140F] leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EDE6DA]">
            <ShieldCheck className="w-6 h-6 text-[#138A55]" />
            <span className="font-semibold text-sm">Effective Date: October 2026 · {settings.shop_name}</span>
          </div>

          <div className="space-y-2">
            <h4 className="font-playfair text-lg font-bold text-[#17140F]">
              1. Information We Collect
            </h4>
            <p className="text-[#6B645B]">
              When you place an order on Cash on Delivery, we collect your full name, phone number, delivery address, city, and optional email address. We use this strictly to print courier consignment notes, send dispatch tracking SMS messages, and facilitate delivery.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#EDE6DA]">
            <h4 className="font-playfair text-lg font-bold text-[#17140F]">
              2. Third-Party Courier Sharing
            </h4>
            <p className="text-[#6B645B]">
              We only share your recipient details with our licensed courier partners (TCS Express, Leopards Courier, and CallCourier) for the sole purpose of transporting and delivering your shoe parcel to your doorstep. We never sell or license your phone number or data to telemarketers or third-party advertisers.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#EDE6DA]">
            <h4 className="font-playfair text-lg font-bold text-[#17140F]">
              3. WhatsApp Communications
            </h4>
            <p className="text-[#6B645B]">
              If you initiate an inquiry or order on WhatsApp, your chat history is kept confidential between you and our support team. We do not send unprompted spam messages.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#EDE6DA]">
            <h4 className="font-playfair text-lg font-bold text-[#17140F]">
              4. Contact for Data Concerns
            </h4>
            <p className="text-[#6B645B]">
              If you wish to update or erase your order record from our database, contact us at <strong>{settings.phone}</strong> or visit our showroom at <strong>{settings.address}</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
