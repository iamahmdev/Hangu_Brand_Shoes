import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Search, Menu, X, ChevronDown, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { navigate, currentPath } = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { settings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // 6 Defined Shoe Types
  const categories = [
    { name: 'Formal Oxfords', slug: 'formal', desc: 'Wholecuts & Cap-Toes for Weddings' },
    { name: 'Loafers', slug: 'loafers', desc: 'Penny, Tassel & Horsebit Suede' },
    { name: 'Casual Slip-ons', slug: 'casual-slip-ons', desc: 'Driving Moccasins & Mules' },
    { name: 'Leather Sneakers', slug: 'sneakers', desc: 'Minimalist Nappa Low-Tops' },
    { name: 'Peshawari Chappal', slug: 'peshawari-chappal', desc: 'Handcrafted Heritage Chappals' },
    { name: 'Brogues & Boots', slug: 'brogues-boots', desc: 'Burnished Chelsea & Wingtip Boots' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B0B0D] border-b border-[#C9A66B]/20 text-[#F7F3EC] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Zone 1: Brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className="font-playfair text-xl sm:text-2xl font-bold tracking-wider text-[#F7F3EC] group-hover:text-[#C9A66B] transition-colors whitespace-nowrap">
                  {settings.shop_name?.toUpperCase() || 'HANGU BRAND SHOES'}
                </span>
              </div>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-[#C9A66B] -mt-0.5 font-medium">
                Peshawar &amp; Nationwide · Handcrafted Shoes
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean single line, no pills) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
            <button
              onClick={() => navigate('/')}
              className={`whitespace-nowrap transition-colors hover:text-[#C9A66B] cursor-pointer py-1 ${
                currentPath === '/' ? 'text-[#C9A66B] font-bold' : 'text-[#F7F3EC]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigate('/shop')}
              className={`whitespace-nowrap transition-colors hover:text-[#C9A66B] cursor-pointer py-1 ${
                currentPath.startsWith('/shop') ? 'text-[#C9A66B] font-bold' : 'text-[#F7F3EC]'
              }`}
            >
              Shop All
            </button>

            {/* Categories Dropdown with 6 Shoe Types */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                className={`flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#C9A66B] cursor-pointer py-1 ${
                  currentPath.startsWith('/category') ? 'text-[#C9A66B] font-bold' : 'text-[#F7F3EC]'
                }`}
              >
                <span>Shoe Categories</span>
                <ChevronDown className={`w-4 h-4 text-[#C9A66B] transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[460px] bg-[#0B0B0D] border border-[#C9A66B]/40 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn"
                >
                  <div className="text-[10px] uppercase tracking-widest text-[#C9A66B] font-bold mb-3 px-2">
                    Select Footwear Style (6 Collections)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          setCategoriesDropdownOpen(false);
                          navigate(`/category/${cat.slug}`);
                        }}
                        className="text-left p-2.5 rounded-xl hover:bg-[#2A1B14] transition-colors group cursor-pointer border border-transparent hover:border-[#C9A66B]/30"
                      >
                        <div className="font-semibold text-xs text-[#F7F3EC] group-hover:text-[#C9A66B] flex items-center justify-between">
                          <span>{cat.name}</span>
                          <ArrowRight className="w-3 h-3 text-[#C9A66B] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[10px] text-[#6B645B] group-hover:text-[#EDE6DA]/70 mt-0.5 line-clamp-1">
                          {cat.desc}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between px-2 text-xs">
                    <span className="text-[#6B645B]">Cash on Delivery across Pakistan</span>
                    <button
                      onClick={() => {
                        setCategoriesDropdownOpen(false);
                        navigate('/shop');
                      }}
                      className="text-[#C9A66B] hover:underline font-bold"
                    >
                      View All 16+ Models →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Track Order cleanly in navbar */}
            <button
              onClick={() => navigate('/track-order')}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[#C9A66B] cursor-pointer py-1 ${
                currentPath === '/track-order' ? 'text-[#C9A66B] font-bold' : 'text-[#EDE6DA]/90'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-[#138A55]" />
              <span>Track Parcel</span>
            </button>

            <button
              onClick={() => navigate('/about')}
              className={`whitespace-nowrap transition-colors hover:text-[#C9A66B] cursor-pointer py-1 ${
                currentPath === '/about' ? 'text-[#C9A66B] font-bold' : 'text-[#F7F3EC]'
              }`}
            >
              Our Atelier
            </button>

            <button
              onClick={() => navigate('/contact')}
              className={`whitespace-nowrap transition-colors hover:text-[#C9A66B] cursor-pointer py-1 ${
                currentPath === '/contact' ? 'text-[#C9A66B] font-bold' : 'text-[#F7F3EC]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Cart Drawer trigger, Admin entry) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[#EDE6DA] hover:text-[#C9A66B] transition-colors cursor-pointer rounded-lg hover:bg-white/5"
              title="Search shoes"
              aria-label="Search shoes"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin entry link */}
            <button
              onClick={() => navigate('/admin')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C9A66B] border border-[#C9A66B]/30 hover:border-[#C9A66B] hover:bg-[#C9A66B]/10 rounded-lg transition-colors cursor-pointer font-semibold"
              title="Store Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#F7F3EC] hover:text-[#C9A66B] transition-colors cursor-pointer rounded-lg hover:bg-white/5 flex items-center justify-center"
              aria-label={`Shopping Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D1112B] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#EDE6DA] hover:text-[#C9A66B] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0B0D] border-b border-[#C9A66B]/20 px-6 py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="w-full text-left py-2.5 text-base font-medium text-[#F7F3EC] hover:text-[#C9A66B] border-b border-white/5"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/shop');
                }}
                className="w-full text-left py-2.5 text-base font-medium text-[#F7F3EC] hover:text-[#C9A66B] border-b border-white/5"
              >
                Shop All Shoes (16+ Pairs)
              </button>

              <div className="py-3 border-b border-white/5">
                <div className="text-xs uppercase tracking-wider text-[#C9A66B] font-bold mb-2.5">
                  6 Shoe Collections
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(`/category/${c.slug}`);
                      }}
                      className="text-left text-xs p-2 rounded-xl bg-white/5 text-[#EDE6DA] hover:text-[#C9A66B] hover:bg-white/10"
                    >
                      <div className="font-bold">{c.name}</div>
                      <div className="text-[10px] text-[#6B645B] truncate">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/track-order');
                }}
                className="w-full text-left py-2.5 text-base font-medium text-[#F7F3EC] hover:text-[#C9A66B] border-b border-white/5 flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-[#138A55]" />
                <span>Track Your Parcel (TCS / Leopards)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/about');
                }}
                className="w-full text-left py-2.5 text-base font-medium text-[#F7F3EC] hover:text-[#C9A66B] border-b border-white/5"
              >
                About Our Atelier
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/contact');
                }}
                className="w-full text-left py-2.5 text-base font-medium text-[#F7F3EC] hover:text-[#C9A66B] border-b border-white/5"
              >
                Contact &amp; Store Location
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/admin');
                }}
                className="w-full text-left py-2.5 text-base font-medium text-[#C9A66B] flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Portal</span>
              </button>
            </div>

            <div className="pt-2 text-xs text-[#6B645B] space-y-1">
              <div>📍 {settings.address}</div>
              <div>📞 {settings.phone}</div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-[#0B0B0D] border border-[#C9A66B]/30 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 text-[#EDE6DA]/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A66B] mb-2 block">
              Search Collection
            </span>
            <h3 className="font-playfair text-xl font-semibold text-[#F7F3EC] mb-4">
              Find Your Perfect Pair
            </h3>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search Oxfords, Loafers, Peshawari Chappal, Sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#17140F] text-[#F7F3EC] border border-[#C9A66B]/30 rounded-xl px-4 py-3 pl-11 text-xs focus:outline-none focus:border-[#C9A66B] transition-colors"
              />
              <Search className="w-5 h-5 text-[#C9A66B] absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="w-full mt-3 bg-[#D1112B] hover:bg-[#A80D22] text-white py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Search Shoes
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#EDE6DA]/70">
              <span className="text-[#6B645B]">Popular:</span>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigate('/shop?search=Oxford');
                }}
                className="hover:text-[#C9A66B] underline"
              >
                Oxford
              </button>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigate('/shop?search=Peshawari');
                }}
                className="hover:text-[#C9A66B] underline"
              >
                Peshawari Chappal
              </button>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigate('/shop?search=Penny%20Loafer');
                }}
                className="hover:text-[#C9A66B] underline"
              >
                Penny Loafer
              </button>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigate('/shop?search=Boot');
                }}
                className="hover:text-[#C9A66B] underline"
              >
                Chelsea Boot
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
