import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Home,
  Compass,
  Phone,
  MessageCircle,
  FileText,
  Info,
  MapPin,
  CheckCircle2,
  Package
} from 'lucide-react';

export const Header: React.FC = () => {
  const { navigate, currentPath } = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { settings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [mobileCategoriesExpanded, setMobileCategoriesExpanded] = useState(true);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu or search modal is open
  useEffect(() => {
    if (mobileMenuOpen || searchModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen, searchModalOpen]);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchModalOpen(false);
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      setMobileMenuOpen(false);
      navigate(`/shop?search=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMobileSearchQuery('');
    }
  };

  const handleMobileNavigate = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  // 6 Defined Shoe Collections
  const categories = [
    { name: 'Formal Oxfords', slug: 'formal', desc: 'Wholecuts & Cap-Toes for Weddings' },
    { name: 'Loafers', slug: 'loafers', desc: 'Penny, Tassel & Horsebit Suede' },
    { name: 'Casual Slip-ons', slug: 'casual-slip-ons', desc: 'Driving Moccasins & Mules' },
    { name: 'Leather Sneakers', slug: 'sneakers', desc: 'Minimalist Nappa Low-Tops' },
    { name: 'Peshawari Chappal', slug: 'peshawari-chappal', desc: 'Handcrafted Heritage Chappals' },
    { name: 'Brogues & Boots', slug: 'brogues-boots', desc: 'Burnished Chelsea & Wingtip Boots' },
  ];

  const whatsappNumber = settings.whatsapp || '923008472910';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Assalam-o-Alaikum! I want to inquire about Hangu Brand Shoes.'
  )}`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B0B0D] border-b border-[#C9A66B]/20 text-[#F7F3EC] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark */}
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
              <span className="block text-[10px] tracking-[0.22em] uppercase text-[#C9A66B] -mt-0.5 font-medium">
                Peshawar &amp; Nationwide · Handcrafted Shoes
              </span>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
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

            {/* Track Order */}
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

          {/* Zone 3: Actions (Search, Cart Drawer trigger, Admin entry, Hamburger) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2.5 text-[#EDE6DA] hover:text-[#C9A66B] transition-colors cursor-pointer rounded-xl hover:bg-white/5"
              title="Search shoes"
              aria-label="Search shoes"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin entry link (desktop) */}
            <button
              onClick={() => navigate('/admin')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C9A66B] border border-[#C9A66B]/30 hover:border-[#C9A66B] hover:bg-[#C9A66B]/10 rounded-xl transition-colors cursor-pointer font-semibold"
              title="Store Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#F7F3EC] hover:text-[#C9A66B] transition-colors cursor-pointer rounded-xl hover:bg-white/5 flex items-center justify-center"
              aria-label={`Shopping Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D1112B] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 text-[#EDE6DA] hover:text-[#C9A66B] transition-colors cursor-pointer rounded-xl hover:bg-white/5"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          FULL-SCREEN SLIDING MOBILE DRAWER & NAVIGATION
          Smooth backdrop blur, zero body scroll leakage, full pages list
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] h-[100dvh] flex flex-col bg-[#0B0B0D] border-r border-[#C9A66B]/30 shadow-2xl text-[#F7F3EC] animate-fadeIn">
            
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#121217]">
              <div>
                <span className="font-playfair text-base font-bold tracking-wider text-[#F7F3EC] block">
                  {settings.shop_name?.toUpperCase() || 'HANGU BRAND SHOES'}
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#C9A66B] font-medium block">
                  Handcrafted Pure Leather
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#EDE6DA]/70 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container (Smooth touch scroll, no cut-offs) */}
            <div 
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              
              {/* 1. Quick Mobile Search Input */}
              <form onSubmit={handleMobileSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search Oxfords, Loafers, Peshawari..."
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1816] text-[#F7F3EC] placeholder-[#6B645B] border border-[#C9A66B]/30 rounded-xl px-3.5 py-2.5 pl-10 text-xs focus:outline-none focus:border-[#C9A66B] transition-colors"
                />
                <Search className="w-4 h-4 text-[#C9A66B] absolute left-3 top-3" />
                {mobileSearchQuery && (
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-[#D1112B] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg"
                  >
                    Go
                  </button>
                )}
              </form>

              {/* 2. Main Store Navigation */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#C9A66B] font-bold mb-2 px-1">
                  Menu
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleMobileNavigate('/')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left ${
                      currentPath === '/' 
                        ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-bold' 
                        : 'text-[#F7F3EC] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-sm">
                      <Home className="w-4 h-4 text-[#C9A66B]" />
                      <span>Home</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B645B]" />
                  </button>

                  <button
                    onClick={() => handleMobileNavigate('/shop')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left ${
                      currentPath.startsWith('/shop') 
                        ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-bold' 
                        : 'text-[#F7F3EC] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-sm">
                      <Compass className="w-4 h-4 text-[#C9A66B]" />
                      <span>Shop All Shoes</span>
                    </div>
                    <span className="text-[10px] bg-[#D1112B] text-white px-2 py-0.5 rounded-full font-semibold">
                      16+ Pairs
                    </span>
                  </button>

                  <button
                    onClick={() => handleMobileNavigate('/track-order')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left ${
                      currentPath === '/track-order' 
                        ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-bold' 
                        : 'text-[#F7F3EC] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-sm">
                      <Truck className="w-4 h-4 text-[#138A55]" />
                      <span>Track Parcel</span>
                    </div>
                    <span className="text-[10px] text-[#138A55] font-semibold bg-[#138A55]/10 px-2 py-0.5 rounded-md">
                      TCS / Leopards
                    </span>
                  </button>
                </div>
              </div>

              {/* 3. 6 Shoe Collections (Expandable / Collapsible) */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-3">
                <button
                  onClick={() => setMobileCategoriesExpanded(!mobileCategoriesExpanded)}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#C9A66B]" />
                    <span className="text-xs uppercase tracking-wider text-[#C9A66B] font-bold">
                      6 Shoe Collections
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#C9A66B] transition-transform duration-200 ${mobileCategoriesExpanded ? 'rotate-180' : ''}`} />
                </button>

                {mobileCategoriesExpanded && (
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-white/5">
                    {categories.map((c) => (
                      <button
                        key={c.slug}
                        onClick={() => handleMobileNavigate(`/category/${c.slug}`)}
                        className={`text-left p-2.5 rounded-xl transition-colors border ${
                          currentPath === `/category/${c.slug}`
                            ? 'bg-[#2A1B14] border-[#C9A66B] text-[#C9A66B]'
                            : 'bg-white/5 border-transparent text-[#EDE6DA] hover:border-[#C9A66B]/30'
                        }`}
                      >
                        <div className="font-semibold text-xs leading-tight">{c.name}</div>
                        <div className="text-[9px] text-[#6B645B] mt-0.5 line-clamp-1">{c.desc}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Complete Pages & Customer Care Links */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#C9A66B] font-bold mb-2 px-1">
                  Customer Care &amp; Information
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleMobileNavigate('/about')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left ${
                      currentPath === '/about' 
                        ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-bold' 
                        : 'text-[#EDE6DA] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs font-medium">
                      <Info className="w-3.5 h-3.5 text-[#C9A66B]" />
                      <span>About Our Atelier &amp; Heritage</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#6B645B]" />
                  </button>

                  <button
                    onClick={() => handleMobileNavigate('/contact')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left ${
                      currentPath === '/contact' 
                        ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-bold' 
                        : 'text-[#EDE6DA] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A66B]" />
                      <span>Contact &amp; Store Locations</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#6B645B]" />
                  </button>

                  <button
                    onClick={() => handleMobileNavigate('/delivery-policy')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left ${
                      currentPath === '/delivery-policy' 
                        ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-bold' 
                        : 'text-[#EDE6DA] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs font-medium">
                      <Truck className="w-3.5 h-3.5 text-[#C9A66B]" />
                      <span>Delivery &amp; Exchange Policy</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#6B645B]" />
                  </button>

                  <button
                    onClick={() => handleMobileNavigate('/privacy-policy')}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left ${
                      currentPath === '/privacy-policy' 
                        ? 'bg-[#C9A66B]/20 text-[#C9A66B] font-bold' 
                        : 'text-[#EDE6DA] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs font-medium">
                      <FileText className="w-3.5 h-3.5 text-[#C9A66B]" />
                      <span>Privacy &amp; Leather Guarantee</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#6B645B]" />
                  </button>
                </div>
              </div>

              {/* 5. Direct WhatsApp Helpline Button */}
              <div className="pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs shadow-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp · {settings.phone}</span>
                </a>
              </div>

              {/* 6. Trust Highlights */}
              <div className="bg-[#17140F] border border-white/5 rounded-xl p-3 space-y-1.5 text-[11px] text-[#EDE6DA]/80">
                <div className="flex items-center gap-2 text-[#138A55]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-semibold">Open Parcel Before Payment</span>
                </div>
                <div className="flex items-center gap-2 text-[#C9A66B]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-semibold">100% Genuine Full-Grain Leather</span>
                </div>
                <div className="flex items-center gap-2 text-[#EDE6DA]/70">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Free Express Delivery Above Rs. 5,000</span>
                </div>
              </div>

              {/* 7. Admin Entry Link */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#6B645B]">Management Portal</span>
                <button
                  onClick={() => handleMobileNavigate('/admin')}
                  className="flex items-center gap-1.5 text-[#C9A66B] hover:underline font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              </div>

              {/* Extra spacing at bottom for comfortable scrolling */}
              <div className="h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal (Desktop) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-[#0B0B0D] border border-[#C9A66B]/30 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative animate-scaleIn">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 text-[#EDE6DA]/60 hover:text-white p-1 rounded-lg hover:bg-white/5"
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
