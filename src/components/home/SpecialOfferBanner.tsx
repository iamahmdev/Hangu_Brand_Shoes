import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Clock, Copy, Check, ArrowRight, MessageCircle } from 'lucide-react';

export const SpecialOfferBanner: React.FC = () => {
  const { navigate } = useRouter();
  const { settings } = useStore();

  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  // Ticking countdown timer for client demo realism
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('HANGU20');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const padZero = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="py-12 sm:py-16 bg-[#2A1B14] text-[#F7F3EC] relative overflow-hidden border-y border-[#C9A66B]/30">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A66B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D1112B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0B0B0D]/85 backdrop-blur-md rounded-3xl border border-[#C9A66B]/40 p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text & Offer info */}
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1B14] border border-[#C9A66B]/30 text-[#C9A66B] text-[11px] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#D1112B]" />
              <span>LIMITED PROMOTIONAL CAMPAIGN</span>
            </div>

            <h2 className="font-playfair text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F7F3EC] leading-tight">
              Wedding Season Exclusive:{' '}
              <span className="text-[#C9A66B] italic font-normal">Flat 20% OFF</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#EDE6DA]/80 leading-relaxed">
              Order any pair of handcrafted Formal Oxfords or Artisan Loafers and receive free express courier delivery plus a complimentary shoe horn &amp; dust bag.
            </p>

            {/* Promo Code Box with 1-click copy */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2 bg-[#17140F] border border-[#C9A66B]/40 px-4 py-2.5 rounded-xl">
                <span className="text-xs text-[#6B645B]">Use Coupon Code:</span>
                <span className="font-mono font-bold text-sm text-[#C9A66B] tracking-wider">
                  HANGU20
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1 rounded-md text-[#EDE6DA] hover:text-[#C9A66B] transition-colors ml-1 cursor-pointer"
                  title="Copy coupon code"
                >
                  {copied ? <Check className="w-4 h-4 text-[#138A55]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <span className="text-xs font-semibold text-[#138A55] animate-fadeIn">
                  ✓ Code copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* Right: Live Animated Countdown Timer Box & Action */}
          <div className="bg-[#17140F] border border-[#C9A66B]/30 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-xl w-full lg:w-auto min-w-[320px]">
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#C9A66B] font-bold">
              <Clock className="w-4 h-4 text-[#D1112B]" />
              <span>Offer Closes In:</span>
            </div>

            {/* Countdown Flip Blocks */}
            <div className="flex items-center justify-center gap-3">
              <div className="bg-[#0B0B0D] border border-[#C9A66B]/30 rounded-xl p-3 w-16 sm:w-20 shadow-md">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[#F7F3EC] tabular-nums">
                  {padZero(timeLeft.hours)}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#6B645B] mt-1">Hours</div>
              </div>

              <span className="text-2xl font-bold text-[#C9A66B]">:</span>

              <div className="bg-[#0B0B0D] border border-[#C9A66B]/30 rounded-xl p-3 w-16 sm:w-20 shadow-md">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[#F7F3EC] tabular-nums">
                  {padZero(timeLeft.minutes)}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#6B645B] mt-1">Mins</div>
              </div>

              <span className="text-2xl font-bold text-[#C9A66B]">:</span>

              <div className="bg-[#0B0B0D] border border-[#C9A66B]/30 rounded-xl p-3 w-16 sm:w-20 shadow-md">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[#D1112B] tabular-nums">
                  {padZero(timeLeft.seconds)}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#6B645B] mt-1">Secs</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="w-full bg-[#D1112B] hover:bg-[#A80D22] text-white py-3.5 px-6 rounded-xl font-bold text-xs tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>Claim 20% Discount Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                  "Salam! I want to avail the Wedding Special Flat 20% OFF coupon code HANGU20 on shoes."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#138A55] hover:bg-[#0e6940] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Claim via WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
