import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SEOHead } from '../components/common/SEOHead';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#F7F3EC] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <SEOHead title="404 Page Not Found" description="The requested shoe page could not be located." />

      <div className="w-20 h-20 rounded-3xl bg-[#EDE6DA] text-[#C9A66B] flex items-center justify-center mb-6 shadow-xs border border-[#C9A66B]/30">
        <span className="font-playfair font-bold text-3xl text-[#2A1B14]">404</span>
      </div>

      <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A66B] mb-2 block">
        Wrong Turn
      </span>
      <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#17140F] mb-3">
        Oops! This Page Walked Away
      </h1>
      <div className="w-10 h-[2px] bg-[#C9A66B] mx-auto mb-4" />
      <p className="text-xs sm:text-sm text-[#6B645B] max-w-sm mb-8 leading-relaxed">
        The link you clicked may have moved or no longer exists. Let&apos;s guide you back to our handcrafted leather footwear collection.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer border border-[#C9A66B]/30"
        >
          Return to Home
        </button>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#D1112B] hover:bg-[#A80D22] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explore All Shoes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
