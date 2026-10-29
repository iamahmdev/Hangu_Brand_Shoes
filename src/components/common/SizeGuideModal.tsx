import React from 'react';
import { X, Ruler, MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const { settings } = useStore();
  if (!isOpen) return null;

  const sizeChart = [
    { eu: 39, uk: 6, us: 6.5, cm: 24.5, inches: 9.6 },
    { eu: 40, uk: 6.5, us: 7.5, cm: 25.0, inches: 9.8 },
    { eu: 41, uk: 7.5, us: 8.5, cm: 26.0, inches: 10.2 },
    { eu: 42, uk: 8.5, us: 9.5, cm: 26.8, inches: 10.5 },
    { eu: 43, uk: 9.5, us: 10.5, cm: 27.5, inches: 10.8 },
    { eu: 44, uk: 10.5, us: 11.5, cm: 28.3, inches: 11.1 },
    { eu: 45, uk: 11.5, us: 12.5, cm: 29.0, inches: 11.4 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F7F3EC] text-[#17140F] border border-[#C9A66B]/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#6B645B] hover:text-[#17140F] hover:bg-[#EDE6DA] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Ruler className="w-5 h-5 text-[#C9A66B]" />
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A66B]">
            Footwear Size Guide
          </span>
        </div>

        <h3 className="font-playfair text-2xl font-bold text-[#17140F] mb-1">
          Find Your Exact Fit
        </h3>
        <p className="text-xs text-[#6B645B] mb-4">
          All our men&apos;s shoes follow standard European (EU) sizing, crafted with a generous toe-box ideal for Pakistani feet.
        </p>

        {/* Size Table */}
        <div className="overflow-x-auto border border-[#EDE6DA] rounded-xl bg-white mb-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0B0D] text-[#F7F3EC]">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-[#C9A66B]">EU Size</th>
                <th className="py-2.5 px-3 font-semibold">UK</th>
                <th className="py-2.5 px-3 font-semibold">US</th>
                <th className="py-2.5 px-3 font-semibold">Foot (CM)</th>
                <th className="py-2.5 px-3 font-semibold">Inches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE6DA] font-mono tabular-nums">
              {sizeChart.map((row) => (
                <tr key={row.eu} className="hover:bg-[#F7F3EC] transition-colors">
                  <td className="py-2 px-3 font-bold text-[#17140F] bg-[#EDE6DA]/40">
                    EU {row.eu}
                  </td>
                  <td className="py-2 px-3 text-[#6B645B]">{row.uk}</td>
                  <td className="py-2 px-3 text-[#6B645B]">{row.us}</td>
                  <td className="py-2 px-3 font-medium text-[#17140F]">{row.cm} cm</td>
                  <td className="py-2 px-3 text-[#6B645B]">{row.inches}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to measure tips */}
        <div className="bg-[#EDE6DA] p-3.5 rounded-xl text-xs space-y-1.5 text-[#17140F] mb-4">
          <div className="font-bold text-[#2A1B14] flex items-center gap-1.5">
            <span>💡 How to measure at home:</span>
          </div>
          <p className="text-[#6B645B] leading-relaxed">
            1. Place a piece of white paper on a hard floor against a flat wall.
            <br />
            2. Stand barefoot with your heel touching the wall, mark the longest point of your toe.
            <br />
            3. Measure the distance in centimeters. If you are between sizes, we recommend ordering one size larger.
          </p>
        </div>

        {/* 7-Day Exchange reassurance */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#EDE6DA]">
          <span className="text-[11px] text-[#138A55] font-semibold">
            ✓ 7-Day Free Size Exchange if it doesn&apos;t fit!
          </span>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Salam, I need help deciding my shoe size.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#138A55] hover:underline font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
