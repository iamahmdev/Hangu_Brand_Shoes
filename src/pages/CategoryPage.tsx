import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { SEOHead } from '../components/common/SEOHead';
import { CategoryType } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryConfig {
  name: CategoryType;
  title: string;
  heroHeadline: string;
  heroSubtext: string;
  seoText: string;
  bgGradient: string;
  tagline?: string;
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  formal: {
    name: 'Formal',
    title: 'Formal Dress Shoes',
    heroHeadline: 'Timeless Oxford & Brogue Elegance',
    heroSubtext: 'Handcrafted with Italian calfskin and Goodyear welts for weddings, black-tie events, and executive boardrooms.',
    seoText: 'Our handcrafted formal shoes in Pakistan represent the pinnacle of bespoke cobbling. Hand-burnished wholecuts and cap-toe brogues engineered with padded leather arches allow effortless transitions from morning corporate presentations to grand Pakistani valima celebrations.',
    bgGradient: 'from-[#0B0B0D] via-[#2A1B14] to-[#0B0B0D]',
    tagline: 'Oxfords & Wholecuts'
  },
  loafers: {
    name: 'Loafers',
    title: 'Artisan Leather Loafers',
    heroHeadline: 'Refined Penny, Tassel & Horsebit Loafers',
    heroSubtext: 'Unlined buttery calfskin and velvety suedes made for effortless slip-on sophistication.',
    seoText: 'Loafers crafted from top-tier Pakistani tanneries. Whether you prefer the classic Ivy League penny loafer strap, antique brass horsebits, or hand-braided tassels, each pair adapts naturally to your feet for unmatched luxury with trousers or tailored denim.',
    bgGradient: 'from-[#2A1B14] via-[#1E140F] to-[#0B0B0D]',
    tagline: 'Penny, Tassel & Horsebit'
  },
  'casual-slip-ons': {
    name: 'Casual (Slip-ons)',
    title: 'Driving Moccasins & Casuals',
    heroHeadline: 'Effortless Slip-On Comfort',
    heroSubtext: 'Engineered with segmented rubber pods and supple tumbled leather for daily Pakistani commutes.',
    seoText: 'Pakistani city traffic and busy routines require footwear that offers maximum flexibility without sacrificing elegance. Our driving shoes and slip-ons incorporate shock-absorbing heel wraps and breathable leather linings for cloud-like comfort in summer and winter alike.',
    bgGradient: 'from-[#17140F] via-[#2A1B14] to-[#0B0B0D]',
    tagline: 'Driving Moccasins & Mules'
  },
  sneakers: {
    name: 'Sneakers',
    title: 'Luxury Leather Low-Tops',
    heroHeadline: 'Architectural Court Sneakers',
    heroSubtext: '100% genuine nappa leather sneakers constructed with reinforced stitched rubber cupsoles.',
    seoText: 'Elevate your off-duty wardrobe with luxury leather sneakers hand-stitched in Lahore. Free of synthetic meshes or cheap rubbers, our court sneakers patina gracefully over time and pair effortlessly with smart chinos and linen kurtas.',
    bgGradient: 'from-[#0B0B0D] via-[#1B1B1F] to-[#0B0B0D]',
    tagline: 'Nappa Leather Low-Tops'
  },
  'peshawari-chappal': {
    name: 'Peshawari Chappal',
    title: 'Imperial Peshawari Chappal',
    heroHeadline: 'Royal Heritage Peshawari & Kaptaan Cuts',
    heroSubtext: 'Traditional double-stitched leather chappals with tire soles, brass buckles, and arch cushioning for Eid and Friday wear.',
    seoText: 'The pride of Pakistani craftsmanship. Each Peshawari chappal is hammered, skived, and hand-stitched by master artisans using premium full-grain buffalo and cowhide leather. Built for unrivaled swagger with Kurta Shalwar.',
    bgGradient: 'from-[#1A100C] via-[#2A1B14] to-[#0B0B0D]',
    tagline: 'Imperial & Kaptaan Cuts'
  },
  'brogues-boots': {
    name: 'Brogues & Boots',
    title: 'Chelsea & Wingtip Boots',
    heroHeadline: 'Hand-Burnished Chelsea & Dress Boots',
    heroSubtext: 'Ankle-high commanding silhouettes with seamless elastic gores and Goodyear welt soling for winter weddings.',
    seoText: 'Designed for the discerning gentleman seeking warmth and commanding presence. Made from heavyweight calfskin crust, our Chelsea boots feature reinforced pull tabs and high-traction soles suited for Pakistani evenings.',
    bgGradient: 'from-[#0B0B0D] via-[#18110E] to-[#0B0B0D]',
    tagline: 'Chelsea & Wingtip Boots'
  }
};

export const CategoryPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const { products } = useStore();

  const config = CATEGORY_MAP[slug] || {
    name: 'Formal' as CategoryType,
    title: 'Men’s Footwear',
    heroHeadline: 'Handcrafted Leather Shoes',
    heroSubtext: 'Pure genuine leather shoes crafted in Pakistan.',
    seoText: 'Discover exceptional men’s footwear built with traditional leathercraft techniques.',
    bgGradient: 'from-[#0B0B0D] to-[#2A1B14]',
    tagline: 'Footwear Collection'
  };

  const categoryProducts = products.filter(
    (p) => p.is_active && (p.category === config.name || p.category.toLowerCase().includes(config.name.toLowerCase().split(' ')[0]))
  );

  const otherCategories = Object.entries(CATEGORY_MAP).filter(([s]) => s !== slug);

  return (
    <div className="bg-[#F7F3EC] min-h-screen">
      <SEOHead
        title={config.title}
        description={config.seoText.slice(0, 155)}
      />

      {/* Category Hero */}
      <div className={`bg-gradient-to-r ${config.bgGradient} text-[#F7F3EC] py-14 sm:py-20 border-b border-[#C9A66B]/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C9A66B] mb-2 block">
            {config.title}
          </span>
          <h1
            className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F3EC] max-w-3xl mx-auto"
            style={{ textWrap: 'balance' }}
          >
            {config.heroHeadline}
          </h1>
          <div className="w-12 h-[2px] bg-[#C9A66B] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE6DA]/85 max-w-xl mx-auto leading-relaxed">
            {config.heroSubtext}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="text-xs text-[#6B645B] font-mono">
            Showing <strong>{categoryProducts.length}</strong> styles in {config.name}
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-semibold text-[#17140F] hover:text-[#C9A66B] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All 6 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#EDE6DA] shadow-xs">
            <h3 className="font-playfair text-xl font-bold text-[#17140F] mb-2">
              No products found in this category
            </h3>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#0B0B0D] text-white text-xs font-semibold px-6 py-2.5 rounded-xl cursor-pointer"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}

        {/* SEO Editorial Block */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-[#C9A66B] font-semibold">
            Atelier Notes
          </span>
          <h2 className="font-playfair text-xl font-bold text-[#17140F]">
            About Our {config.title} in Pakistan
          </h2>
          <div className="w-8 h-[2px] bg-[#C9A66B]" />
          <p className="text-xs sm:text-sm text-[#6B645B] leading-relaxed">
            {config.seoText}
          </p>
        </div>

        {/* Other Categories Links */}
        <div className="mt-14 pt-8 border-t border-[#EDE6DA]">
          <h3 className="font-playfair text-lg font-bold text-[#17140F] mb-4 text-center">
            Explore Other Collections
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherCategories.map(([catSlug, c]) => (
              <button
                key={catSlug}
                onClick={() => navigate(`/category/${catSlug}`)}
                className="p-3.5 rounded-xl bg-white hover:bg-[#EDE6DA]/60 border border-[#EDE6DA] text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-semibold text-[#17140F] group-hover:text-[#2A1B14] flex items-center justify-between">
                  <span>{c.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A66B] group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-[10px] text-[#6B645B] mt-0.5 line-clamp-1">
                  {c.tagline}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
