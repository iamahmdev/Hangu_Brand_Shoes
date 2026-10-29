import React from 'react';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { Truck, RefreshCw, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DeliveryPolicyPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Delivery & 7-Day Exchange Policy"
        description="Read our nationwide delivery terms, Cash on Delivery procedures, and hassle-free 7-day size exchange process across Pakistan."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <SectionHeading
          kicker="CUSTOMER COMMITMENT"
          title="Delivery &amp; Exchange Policy"
          subtitle="Everything you need to know about our fast nationwide shipping and risk-free exchange policy."
        />

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#138A55]/15 flex items-center justify-center text-[#138A55]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-playfair text-lg font-bold text-[#17140F]">
              Nationwide Delivery &amp; Charges
            </h3>
            <p className="text-xs text-[#6B645B] leading-relaxed">
              Standard delivery across Pakistan is <strong>{formatPrice(settings.delivery_charge || 200)}</strong>. Orders of <strong>{formatPrice(settings.free_delivery_above || 5000)} or more</strong> qualify for <strong>100% FREE Delivery</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A66B]/20 flex items-center justify-center text-[#2A1B14]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-playfair text-lg font-bold text-[#17140F]">
              7-Day Size Exchange
            </h3>
            <p className="text-xs text-[#6B645B] leading-relaxed">
              Received a size that feels too snug or roomy? We offer a hassle-free 7-day size swap. As long as shoes are unworn outdoors, we dispatch the right size.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="bg-white rounded-2xl border border-[#EDE6DA] p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#17140F] leading-relaxed">
          
          <div className="space-y-3">
            <h4 className="font-playfair text-xl font-bold text-[#17140F] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A66B]" />
              <span>1. Delivery Timeline &amp; Courier Partners</span>
            </h4>
            <p className="text-[#6B645B]">
              We partner with trusted express couriers in Pakistan including <strong>TCS Express, Leopards Courier, and CallCourier</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#6B645B]">
              <li><strong>Lahore:</strong> 1 to 2 business days.</li>
              <li><strong>Karachi, Islamabad, Rawalpindi, Faisalabad:</strong> 2 to 3 business days.</li>
              <li><strong>Peshawar, Quetta, Multan, Sialkot, Gujranwala, Hyderabad:</strong> 3 to 4 business days.</li>
              <li><strong>All other cities, towns, and remote areas:</strong> 3 to 5 business days.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#EDE6DA]">
            <h4 className="font-playfair text-xl font-bold text-[#17140F] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A66B]" />
              <span>2. Cash on Delivery (COD) Protocol</span>
            </h4>
            <p className="text-[#6B645B]">
              All deliveries are handled on Cash on Delivery. Please have the exact payment ready when the courier rider arrives. Before parcel dispatch, our Lahore verification team will make a brief confirmation call or send a WhatsApp message to re-verify your shoe size, street address, and active mobile number.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#EDE6DA]">
            <h4 className="font-playfair text-xl font-bold text-[#17140F] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A66B]" />
              <span>3. 7-Day Size Exchange Conditions</span>
            </h4>
            <p className="text-[#6B645B]">
              To qualify for our 7-Day Exchange, your shoes must fulfill the following reasonable conditions:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-[#6B645B]">
                <CheckCircle2 className="w-4 h-4 text-[#138A55] shrink-0 mt-0.5" />
                <span>Shoes must be strictly unworn outdoors. Only try shoes on indoor carpet or clean surfaces.</span>
              </div>
              <div className="flex items-start gap-2 text-[#6B645B]">
                <CheckCircle2 className="w-4 h-4 text-[#138A55] shrink-0 mt-0.5" />
                <span>Original shoe box, dust bags, and packaging materials must be intact.</span>
              </div>
              <div className="flex items-start gap-2 text-[#6B645B]">
                <CheckCircle2 className="w-4 h-4 text-[#138A55] shrink-0 mt-0.5" />
                <span>Exchange request must be submitted within 7 calendar days of delivery receipt.</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#EDE6DA]">
            <h4 className="font-playfair text-xl font-bold text-[#17140F] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A66B]" />
              <span>4. How to Request an Exchange on WhatsApp</span>
            </h4>
            <p className="text-[#6B645B]">
              Exchanging your size is simple:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[#6B645B]">
              <li>Send a WhatsApp message to <strong>+{settings.whatsapp}</strong> with your Order Number (e.g. <code>ORD-100245</code>).</li>
              <li>Specify your current size and which replacement size you need (e.g., &quot;Need size 43 instead of 42&quot;).</li>
              <li>Our team books the return courier pickup and books the replacement pair for immediate dispatch.</li>
            </ol>
          </div>

        </div>

        {/* WhatsApp Help CTA */}
        <div className="p-6 rounded-2xl bg-[#0B0B0D] text-[#F7F3EC] border border-[#C9A66B]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-playfair text-lg font-bold">Have a delivery question?</div>
            <div className="text-xs text-[#EDE6DA]/70 mt-1">Our dispatch managers respond promptly on WhatsApp.</div>
          </div>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Salam, I have a question about delivery/exchange.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#138A55] hover:bg-[#0e6940] text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
