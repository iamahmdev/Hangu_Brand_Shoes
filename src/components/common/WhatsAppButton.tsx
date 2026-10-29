import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useStore();
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Salam! I am browsing your shoe collection and would like assistance with sizing & order confirmation.'
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order or Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-[#138A55] hover:bg-[#0e6940] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#138A55] focus:ring-offset-2"
    >
      <MessageCircle className="w-6 h-6 shrink-0" />
      <span className="hidden sm:inline text-sm font-semibold tracking-wide whitespace-nowrap">
        Order on WhatsApp
      </span>
    </a>
  );
};
