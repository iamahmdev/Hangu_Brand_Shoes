import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, Phone } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();
  const { navigate } = useRouter();

  return (
    <div className="bg-[#0B0B0D] border-b border-[#C9A66B]/20 text-[#F7F3EC] py-2 px-4 text-xs font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-[#C9A66B]">
          <Phone className="w-3.5 h-3.5" />
          <a href={`tel:${settings.phone}`} className="hover:text-[#F7F3EC] transition-colors">
            {settings.phone}
          </a>
        </div>

        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#138A55]" />
          <span>{settings.announcement_text || 'Cash on Delivery Available All Over Pakistan'}</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[#EDE6DA]/80">
          <button
            onClick={() => navigate('/track-order')}
            className="hover:text-[#C9A66B] transition-colors cursor-pointer"
          >
            Track Order
          </button>
          <span className="text-[#C9A66B]/40">·</span>
          <button
            onClick={() => navigate('/delivery-policy')}
            className="hover:text-[#C9A66B] transition-colors cursor-pointer"
          >
            7-Day Exchange
          </button>
        </div>
      </div>
    </div>
  );
};
