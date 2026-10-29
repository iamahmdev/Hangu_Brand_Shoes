import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Sparkles, MessageCircle, Eye } from 'lucide-react';

export const OfferTicker: React.FC = () => {
  const tickerItems = [
    { icon: Eye, text: 'PEHLE PARCEL KHOL KAR CHECK KAREIN, PHIR PAYMENT DEIN', highlight: true },
    { icon: Sparkles, text: 'HANGU BRAND SHOES · 100% ASAL FULL-GRAIN LEATHER GUARANTEE', highlight: false },
    { icon: Truck, text: 'CASH ON DELIVERY IN ALL 150+ PAKISTANI CITIES', highlight: false },
    { icon: RefreshCw, text: 'SIZE FIT NA AAYE TOH 7-DAY FREE SIZE EXCHANGE', highlight: false },
    { icon: MessageCircle, text: 'WHATSAPP PAR 15 MINS MEIN ORDER CONFIRM KAREIN', highlight: true },
  ];

  return (
    <div className="bg-[#0B0B0D] border-y border-[#C9A66B]/30 overflow-hidden py-3 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Double array for infinite seamless looping */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 mx-6 text-xs tracking-[0.16em] font-semibold uppercase text-[#EDE6DA]"
            >
              <Icon
                className={`w-4 h-4 ${
                  item.highlight ? 'text-[#138A55]' : 'text-[#C9A66B]'
                }`}
              />
              <span className={item.highlight ? 'text-[#138A55] font-bold' : 'text-[#EDE6DA]/90'}>
                {item.text}
              </span>
              <span className="text-[#C9A66B]/40 ml-4">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
