import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { settings } = useStore();

  return (
    <footer className="bg-[#0B0B0D] text-[#F7F3EC] border-t border-[#C9A66B]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-[#C9A66B]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A1B14] border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] shrink-0">
              <Truck className="w-5 h-5 text-[#138A55]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#F7F3EC]">Cash on Delivery</div>
              <div className="text-xs text-[#EDE6DA]/70">Pay when you receive anywhere in Pakistan</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A1B14] border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] shrink-0">
              <RefreshCw className="w-5 h-5 text-[#C9A66B]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#F7F3EC]">7-Day Size Exchange</div>
              <div className="text-xs text-[#EDE6DA]/70">Hassle-free size replacement on WhatsApp</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A1B14] border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C9A66B]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#F7F3EC]">100% Genuine Leather</div>
              <div className="text-xs text-[#EDE6DA]/70">Premium full-grain cowhide & calfskin</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A1B14] border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] shrink-0">
              <Clock className="w-5 h-5 text-[#138A55]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#F7F3EC]">3 to 5 Day Delivery</div>
              <div className="text-xs text-[#EDE6DA]/70">Express courier tracking with SMS updates</div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-playfair text-2xl font-bold tracking-wide text-[#F7F3EC]">
              {settings.shop_name?.toUpperCase() || 'MARKHOR & CO.'}
            </span>
            <div className="w-8 h-[2px] bg-[#C9A66B]" />
            <p className="text-sm text-[#EDE6DA]/70 leading-relaxed max-w-sm">
              Artisanal men&apos;s footwear handcrafted in Lahore with master shoemaking traditions. Built for supreme comfort, timeless elegance, and enduring luxury.
            </p>
            <div className="pt-2 text-xs text-[#C9A66B] flex items-center gap-2">
              <span>Lahore Flagship Store</span>
              <span className="text-[#C9A66B]/40">·</span>
              <span>Nationwide Delivery</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold">
              Explore
            </div>
            <ul className="space-y-2 text-sm text-[#EDE6DA]/80">
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-[#C9A66B] transition-colors cursor-pointer">
                  All Shoes
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#C9A66B] transition-colors cursor-pointer">
                  Our Story & Craft
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#C9A66B] transition-colors cursor-pointer">
                  Visit Our Store
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/track-order')} className="hover:text-[#C9A66B] transition-colors cursor-pointer">
                  Track Your Parcel
                </button>
              </li>
            </ul>
          </div>

          {/* Shoe Categories */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold">
              Collections
            </div>
            <ul className="space-y-2 text-sm text-[#EDE6DA]/80">
              <li>
                <button onClick={() => navigate('/category/formal')} className="hover:text-[#C9A66B] transition-colors cursor-pointer">
                  Formal Oxfords & Brogues
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/loafers')} className="hover:text-[#C9A66B] transition-colors cursor-pointer">
                  Artisan Penny Loafers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/casual-slip-ons')} className="hover:text-[#C9A66B] transition-colors cursor-pointer">
                  Driving Moccasins & Slip-ons
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/sneakers')} className="hover:text-[#C9A66B] transition-colors cursor-pointer">
                  Luxury Leather Sneakers
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Details & Support */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold">
              Visit & Contact
            </div>
            <ul className="space-y-2.5 text-xs text-[#EDE6DA]/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A66B] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#C9A66B]">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#138A55] shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Salam, I'd like to ask about shoe sizes and ordering.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#138A55]"
                >
                  WhatsApp: +{settings.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#6B645B]">
                <Clock className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                <span>{settings.opening_hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#C9A66B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B645B]">
          <div>
            © {new Date().getFullYear()} {settings.shop_name}. All rights reserved. Handcrafted in Pakistan.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/delivery-policy')} className="hover:text-[#EDE6DA] transition-colors cursor-pointer">
              Delivery & Exchange Policy
            </button>
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-[#EDE6DA] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/admin')} className="text-[#C9A66B] hover:underline cursor-pointer">
              Admin Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
