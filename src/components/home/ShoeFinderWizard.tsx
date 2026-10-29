import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Product, CategoryType } from '../../types';
import { Sparkles, ArrowRight, Check, Compass } from 'lucide-react';

interface OccasionOption {
  id: string;
  label: string;
  subtitle: string;
  category: CategoryType | 'All';
  icon: string;
}

export const ShoeFinderWizard: React.FC<{ onQuickView?: (p: Product) => void }> = ({ onQuickView }) => {
  const { navigate } = useRouter();
  const { products } = useStore();

  const [selectedOccasion, setSelectedOccasion] = useState<string>('wedding');
  const [selectedSize, setSelectedSize] = useState<number | null>(42);

  const occasions: OccasionOption[] = [
    {
      id: 'wedding',
      label: 'Wedding & Valima',
      subtitle: 'Oxfords & Wholecuts',
      category: 'Formal',
      icon: '👔'
    },
    {
      id: 'chappal',
      label: 'Traditional Chappal',
      subtitle: 'Hand-Stitched Peshawari',
      category: 'Peshawari Chappal',
      icon: '🕌'
    },
    {
      id: 'loafers',
      label: 'Penny & Tassel Loafers',
      subtitle: 'Italian Crust & Suede',
      category: 'Loafers',
      icon: '👞'
    },
    {
      id: 'casual',
      label: 'Driving & Slip-ons',
      subtitle: 'Commute & Weekend',
      category: 'Casual (Slip-ons)',
      icon: '☕'
    },
    {
      id: 'sneakers',
      label: 'Leather Sneakers',
      subtitle: 'Minimalist Nappa',
      category: 'Sneakers',
      icon: '👟'
    },
    {
      id: 'boots',
      label: 'Chelsea & Boots',
      subtitle: 'Winter & Evening',
      category: 'Brogues & Boots',
      icon: '👢'
    }
  ];

  const sizes = [40, 41, 42, 43, 44, 45];

  const currentOccasionObj = occasions.find((o) => o.id === selectedOccasion) || occasions[0];

  // Instant smart matching shoes based on selection
  const matchingShoes = products
    .filter((p) => {
      if (!p.is_active) return false;
      // Match category
      if (currentOccasionObj.category !== 'All' && p.category !== currentOccasionObj.category) {
        return false;
      }
      // Match size if selected
      if (selectedSize !== null) {
        const hasSize = p.variants?.some((v) => v.size === selectedSize && v.stock > 0);
        if (!hasSize) return false;
      }
      return true;
    })
    .slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-[#EDE6DA]/40 border-b border-[#EDE6DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0B0D] text-[#C9A66B] text-[11px] uppercase tracking-widest font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Instant Shoe Finder</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17140F]">
            Find Your Exact Style in 2 Taps
          </h2>
          <div className="w-10 h-[2px] bg-[#C9A66B] mx-auto mt-2 mb-3" />
          <p className="text-xs sm:text-sm text-[#6B645B]">
            Tap your occasion and your shoe size. Our system instantly displays available pairs ready for immediate Cash on Delivery.
          </p>
        </div>

        {/* Step 1: Occasion Pills Grid */}
        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider font-bold text-[#C9A66B] text-center mb-3">
            Step 1: Choose Style / Occasion
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {occasions.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0B0B0D] text-[#F7F3EC] border-[#C9A66B] shadow-lg scale-102 ring-1 ring-[#C9A66B]'
                      : 'bg-white text-[#17140F] border-[#EDE6DA] hover:border-[#C9A66B]/50 hover:bg-[#F7F3EC]'
                  }`}
                >
                  <div className="text-xl mb-1.5">{occ.icon}</div>
                  <div>
                    <div className="font-playfair font-bold text-xs leading-snug">
                      {occ.label}
                    </div>
                    <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-[#C9A66B]' : 'text-[#6B645B]'}`}>
                      {occ.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Size Selector Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#EDE6DA] shadow-xs max-w-xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-semibold text-[#17140F] text-center sm:text-left">
            <span className="text-[#C9A66B] font-bold">Step 2:</span> Tap Your EU Size:
          </div>

          <div className="flex items-center gap-2">
            {sizes.map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#D1112B] text-white border-[#D1112B] shadow-md scale-105'
                      : 'bg-[#F7F3EC] text-[#17140F] border-[#EDE6DA] hover:border-[#C9A66B]'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instant Matched Shoes Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-[#17140F] font-semibold">
              Found <strong>{matchingShoes.length}</strong> styles ready in{' '}
              <span className="text-[#C9A66B] font-bold">EU {selectedSize || 'All Sizes'}</span>:
            </div>

            <button
              onClick={() => {
                const catSlug = currentOccasionObj.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                navigate(`/category/${catSlug}`);
              }}
              className="text-xs font-bold text-[#17140F] hover:text-[#C9A66B] flex items-center gap-1 cursor-pointer"
            >
              <span>View All {currentOccasionObj.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {matchingShoes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#EDE6DA] text-xs text-[#6B645B]">
              No pairs currently in stock for this exact size. Tap another size or{' '}
              <button
                onClick={() => setSelectedSize(null)}
                className="text-[#D1112B] font-bold underline"
              >
                view all sizes
              </button>
              .
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {matchingShoes.map((prod) => (
                <ProductCard key={prod.id} product={prod} onQuickView={onQuickView} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
