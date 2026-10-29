import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { CategoryType, Product } from '../types';
import { Filter, SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';
import { formatPrice } from '../utils/format';
import { QuickViewModal } from '../components/common/QuickViewModal';

export const ShopPage: React.FC = () => {
  const { route, navigate } = useRouter();
  const { products } = useStore();

  const queryParams = route.name === 'shop' ? route.query || {} : {};

  // Filters state initialized from query params
  const [selectedCategory, setSelectedCategory] = useState<string>(queryParams.category || 'all');
  const [selectedSize, setSelectedSize] = useState<number | null>(queryParams.size ? Number(queryParams.size) : null);
  const [selectedColor, setSelectedColor] = useState<string>(queryParams.color || 'all');
  const [searchFilter, setSearchFilter] = useState<string>(queryParams.search || '');
  const [sortBy, setSortBy] = useState<string>(queryParams.sort || 'newest');
  const [maxPrice, setMaxPrice] = useState<number>(queryParams.maxPrice ? Number(queryParams.maxPrice) : 15000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // 6 Defined Shoe Collections
  const categories: { label: string; value: string; short: string }[] = [
    { label: 'All Shoes (16+ Pairs)', value: 'all', short: 'All Styles' },
    { label: 'Formal Oxfords & Brogues', value: 'Formal', short: 'Formal Oxfords' },
    { label: 'Penny & Tassel Loafers', value: 'Loafers', short: 'Loafers' },
    { label: 'Casual Slip-ons & Driving', value: 'Casual (Slip-ons)', short: 'Slip-ons' },
    { label: 'Leather Low-Top Sneakers', value: 'Sneakers', short: 'Sneakers' },
    { label: 'Peshawari Chappal (Heritage)', value: 'Peshawari Chappal', short: 'Peshawari Chappal' },
    { label: 'Brogues & Chelsea Boots', value: 'Brogues & Boots', short: 'Chelsea & Boots' }
  ];

  const sizes = [40, 41, 42, 43, 44, 45];
  const colors = ['Black', 'Deep Brown', 'Tan', 'Navy', 'Beige'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      if (!prod.is_active) return false;

      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesBrand = prod.brand.toLowerCase().includes(query);
        const matchesCat = prod.category.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat && !matchesDesc) {
          return false;
        }
      }

      // Size filter
      if (selectedSize !== null) {
        const hasSize = prod.variants?.some((v) => v.size === selectedSize && v.stock > 0);
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = prod.variants?.some(
          (v) => v.color.toLowerCase() === selectedColor.toLowerCase() && v.stock > 0
        );
        if (!hasColor) return false;
      }

      // Max price filter
      if (prod.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      // default: newest
      return (b.is_new_arrival ? 1 : 0) - (a.is_new_arrival ? 1 : 0);
    });
  }, [products, selectedCategory, searchFilter, selectedSize, selectedColor, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize(null);
    setSelectedColor('all');
    setSearchFilter('');
    setMaxPrice(15000);
    setSortBy('newest');
    navigate('/shop');
  };

  const updateUrlParam = (key: string, value: string | undefined) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (!value || value === 'all') {
      currentParams.delete(key);
    } else {
      currentParams.set(key, value);
    }
    const newSearch = currentParams.toString();
    navigate(`/shop${newSearch ? `?${newSearch}` : ''}`);
  };

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-14">
      <SEOHead
        title="Shop Men's Leather Footwear"
        description="Browse handcrafted Pakistani formal shoes, brogues, loafers, moccasins, Peshawari chappals, and sneakers. Cash on Delivery nationwide."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="mb-6">
          <SectionHeading
            kicker="6 HANDCRAFTED COLLECTIONS"
            title="All Footwear"
            subtitle="Individually handcrafted with vegetable-tanned full-grain leather for unmatched longevity and supreme walking comfort."
            align="left"
          />
        </div>

        {/* Instant Category Pills Row (Effortless 1-click filter for customers!) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.value;
            return (
              <button
                key={c.value}
                onClick={() => {
                  setSelectedCategory(c.value);
                  updateUrlParam('category', c.value === 'all' ? undefined : c.value);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 ${
                  isSelected
                    ? 'bg-[#0B0B0D] text-[#C9A66B] border-[#0B0B0D] shadow-md scale-102'
                    : 'bg-white text-[#17140F] border-[#EDE6DA] hover:border-[#C9A66B] hover:bg-[#F7F3EC]'
                }`}
              >
                {c.short}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EDE6DA] shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by shoe name, style, or material..."
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
                updateUrlParam('search', e.target.value.trim() || undefined);
              }}
              className="w-full bg-[#F7F3EC] text-[#17140F] border border-[#EDE6DA] rounded-xl px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-[#C9A66B]"
            />
            <Search className="w-4 h-4 text-[#C9A66B] absolute left-3 top-3" />
            {searchFilter && (
              <button
                onClick={() => {
                  setSearchFilter('');
                  updateUrlParam('search', undefined);
                }}
                className="absolute right-3 top-3 text-[#6B645B] hover:text-[#17140F]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#EDE6DA] hover:bg-[#D8CEBE] text-[#17140F] rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Filter className="w-4 h-4 text-[#C9A66B]" />
              <span>More Filters ({filteredProducts.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#6B645B] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  updateUrlParam('sort', e.target.value);
                }}
                className="bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs font-medium text-[#17140F] focus:outline-none focus:border-[#C9A66B] cursor-pointer"
              >
                <option value="newest">Featured &amp; Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Live Count */}
            <span className="text-xs text-[#6B645B] font-mono tabular-nums">
              Showing <strong>{filteredProducts.length}</strong> pairs
            </span>
          </div>

        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-[#EDE6DA] shadow-xs space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6DA]">
              <div className="flex items-center gap-2 font-semibold text-sm text-[#17140F]">
                <SlidersHorizontal className="w-4 h-4 text-[#C9A66B]" />
                <span>Filter Shoes</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#6B645B] hover:text-[#D1112B] flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#C9A66B]">
                Shoe Category
              </label>
              <div className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      setSelectedCategory(c.value);
                      updateUrlParam('category', c.value === 'all' ? undefined : c.value);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      selectedCategory === c.value
                        ? 'bg-[#0B0B0D] text-[#C9A66B] font-bold'
                        : 'text-[#17140F] hover:bg-[#F7F3EC]'
                    }`}
                  >
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Chips 40-45 */}
            <div className="space-y-2 pt-2 border-t border-[#EDE6DA]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C9A66B]">
                  Size (EU)
                </label>
                {selectedSize && (
                  <button
                    onClick={() => {
                      setSelectedSize(null);
                      updateUrlParam('size', undefined);
                    }}
                    className="text-[10px] text-[#6B645B] hover:text-[#D1112B]"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      const next = selectedSize === sz ? null : sz;
                      setSelectedSize(next);
                      updateUrlParam('size', next ? String(next) : undefined);
                    }}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#0B0B0D] text-[#C9A66B] border-[#0B0B0D] shadow-xs'
                        : 'bg-[#F7F3EC] text-[#17140F] border-[#EDE6DA] hover:border-[#C9A66B]'
                    }`}
                  >
                    EU {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2 pt-2 border-t border-[#EDE6DA]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C9A66B]">
                  Leather Color
                </label>
                {selectedColor !== 'all' && (
                  <button
                    onClick={() => {
                      setSelectedColor('all');
                      updateUrlParam('color', undefined);
                    }}
                    className="text-[10px] text-[#6B645B] hover:text-[#D1112B]"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => {
                      const next = selectedColor === col ? 'all' : col;
                      setSelectedColor(next);
                      updateUrlParam('color', next === 'all' ? undefined : next);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      selectedColor === col
                        ? 'bg-[#2A1B14] text-[#C9A66B] border-[#C9A66B]'
                        : 'bg-[#F7F3EC] text-[#6B645B] border-[#EDE6DA] hover:text-[#17140F]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-2 border-t border-[#EDE6DA]">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold uppercase tracking-wider text-[#C9A66B]">
                  Max Price
                </label>
                <span className="font-mono font-bold text-[#17140F]">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="4000"
                max="15000"
                step="500"
                value={maxPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMaxPrice(val);
                  updateUrlParam('maxPrice', String(val));
                }}
                className="w-full accent-[#C9A66B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#6B645B] font-mono">
                <span>Rs. 4,000</span>
                <span>Rs. 15,000</span>
              </div>
            </div>

          </aside>

          {/* Product Grid Area: 2 columns mobile, 4 columns desktop */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#EDE6DA] shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#EDE6DA] flex items-center justify-center text-[#C9A66B] mx-auto">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#17140F]">
                  No shoes matched your selection
                </h3>
                <p className="text-xs text-[#6B645B] max-w-sm mx-auto">
                  Try clearing your filters or search term to discover our complete collection of genuine leather footwear.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] text-xs font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Slide Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white text-[#17140F] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#EDE6DA]">
                  <span className="font-playfair font-bold text-lg text-[#17140F]">
                    Filters
                  </span>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1">
                    <X className="w-5 h-5 text-[#6B645B]" />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-[#C9A66B]">Category</label>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setSelectedCategory(c.value)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${
                          selectedCategory === c.value
                            ? 'bg-[#0B0B0D] text-[#C9A66B] font-bold'
                            : 'bg-[#F7F3EC] text-[#17140F]'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-[#C9A66B]">Size (EU)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                        className={`py-2 text-xs font-bold rounded-xl border ${
                          selectedSize === sz
                            ? 'bg-[#0B0B0D] text-[#C9A66B]'
                            : 'bg-[#F7F3EC] border-[#EDE6DA]'
                        }`}
                      >
                        EU {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <label className="font-semibold uppercase text-[#C9A66B]">Max Price</label>
                    <span className="font-mono font-bold">{formatPrice(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="4000"
                    max="15000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#C9A66B]"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[#EDE6DA] space-y-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-[#D1112B] hover:bg-[#A80D22] text-white py-3 rounded-xl font-bold text-xs"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
                <button
                  onClick={() => {
                    handleResetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full bg-[#EDE6DA] text-[#17140F] py-2.5 rounded-xl font-medium text-xs text-center"
                >
                  Reset All
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
};
