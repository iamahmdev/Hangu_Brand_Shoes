import React, { useRef, useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProductCard } from '../components/common/ProductCard';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSlider } from '../components/home/HeroSlider';
import { OfferTicker } from '../components/home/OfferTicker';
import { SpecialOfferBanner } from '../components/home/SpecialOfferBanner';
import { ShoeFinderWizard } from '../components/home/ShoeFinderWizard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';
import {
  Truck,
  RefreshCw,
  ShieldCheck,
  Store,
  ChevronRight,
  MessageCircle,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

const heroImg = '/images/hero_leather_dress_shoe_1793279534707.jpg';
const formalImg = '/images/category_formal_oxford_1793279534927.jpg';
const loaferImg = '/images/category_loafers_leather_1793279536094.jpg';
const casualImg = '/images/category_casual_slipon_1793279537181.jpg';
const sneakerImg = '/images/category_sneakers_leather_1793279535993.jpg';
const peshawariImg = '/images/category_peshawari_chappal_1793281566835.jpg';
const bootImg = '/images/category_chelsea_boot_1793281567551.jpg';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { products, settings } = useStore();
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newArrivals = products.filter((p) => p.is_active && p.is_new_arrival).slice(0, 8);
  const featuredProducts = products.filter((p) => p.is_active && p.is_featured);

  // 6 Defined Shoe Collections
  const categories = [
    {
      name: 'Formal Oxfords',
      slug: 'formal',
      image: formalImg,
      tagline: 'Wedding & Black-Tie',
      desc: 'Hand-burnished Italian calfskin wholecuts engineered for all-day boardroom and valima ceremonies.'
    },
    {
      name: 'Penny & Tassel Loafers',
      slug: 'loafers',
      image: loaferImg,
      tagline: 'Velvety Suede & Crust',
      desc: 'Supple unlined leather and split soles made for sockless summer elegance.'
    },
    {
      name: 'Casual Slip-ons',
      slug: 'casual-slip-ons',
      image: casualImg,
      tagline: 'Driving Moccasins',
      desc: 'Pebbled leather and segmented rubber pods engineered for daily Pakistani city commutes.'
    },
    {
      name: 'Leather Sneakers',
      slug: 'sneakers',
      image: sneakerImg,
      tagline: 'Minimalist Nappa',
      desc: 'Clean architectural low-tops in 100% genuine full-grain cowhide leather.'
    },
    {
      name: 'Peshawari Chappal',
      slug: 'peshawari-chappal',
      image: peshawariImg,
      tagline: 'Imperial & Kaptaan Cuts',
      desc: 'Traditional double-stitched leather chappals with tire soles, brass buckles, and arch cushioning.'
    },
    {
      name: 'Brogues & Boots',
      slug: 'brogues-boots',
      image: bootImg,
      tagline: 'Chelsea & Wingtip Boots',
      desc: 'Ankle-high commanding silhouettes with twin elastic gussets and Goodyear welts for winter warmth.'
    }
  ];

  const reviews = [
    {
      name: 'Shahzaib Malik',
      city: 'Islamabad',
      shoe: 'The Sovereign Wholecut Oxford',
      comment: 'Wore these for my brother’s valima in Islamabad. Three different guests asked where I bought them from. The leather finish is on par with luxury Italian shoes, and zero heel bite even after 8 hours.',
      rating: 5,
      date: 'Verified Buyer · October 2026'
    },
    {
      name: 'Dr. Kamran Nawaz',
      city: 'Lahore',
      shoe: 'Riviera Artisan Penny Loafer',
      comment: 'I usually hesitate ordering shoes online in Pakistan because sizing can be erratic. Markhor team guided me on WhatsApp, delivery took just 2 days in Gulberg, and the leather sole is genuine craftsmanship.',
      rating: 5,
      date: 'Verified Buyer · September 2026'
    },
    {
      name: 'Murtaza Qureshi',
      city: 'Karachi',
      shoe: 'Khyber Imperial Peshawari Chappal',
      comment: 'The tire sole grip and padded footbed make this Peshawari chappal the best I have ever worn with Kurta. Cash on delivery arrived in Clifton within 48 hours.',
      rating: 5,
      date: 'Verified Buyer · October 2026'
    }
  ];

  const scrollFeatured = (direction: 'left' | 'right') => {
    if (featuredScrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      featuredScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <SEOHead
        title="Luxury Men's Leather Footwear"
        description="Discover handcrafted men's formal shoes, loafers, driving moccasins, Peshawari chappals, and leather sneakers in Pakistan. Cash on Delivery nationwide with 7-day size exchange."
      />

      {/* 1. ANIMATED LUXURY HERO SLIDER */}
      <HeroSlider />

      {/* 2. CONTINUOUS ANIMATED PROMOTIONAL TICKER */}
      <OfferTicker />

      {/* 3. MIND-READER INSTANT SHOE FINDER (2 TAPS) */}
      <ShoeFinderWizard onQuickView={(p) => setQuickViewProduct(p)} />

      {/* 4. TRUST STRIP: Gold icons on dark */}
      <section className="bg-[#0B0B0D] py-7 border-b border-[#C9A66B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2A1B14] border border-[#C9A66B]/30 flex items-center justify-center text-[#138A55] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#F7F3EC]">Cash on Delivery</div>
                <div className="text-[11px] text-[#EDE6DA]/70">Pay when delivered anywhere in Pakistan</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2A1B14] border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#F7F3EC]">Fast 3-5 Day Delivery</div>
                <div className="text-[11px] text-[#EDE6DA]/70">Reliable dispatch via TCS &amp; Leopards</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2A1B14] border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#F7F3EC]">7-Day Size Exchange</div>
                <div className="text-[11px] text-[#EDE6DA]/70">Hassle-free size swap on WhatsApp</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2A1B14] border border-[#C9A66B]/30 flex items-center justify-center text-[#C9A66B] shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#F7F3EC]">Real Physical Store</div>
                <div className="text-[11px] text-[#EDE6DA]/70">Visit us at MM Alam Road, Lahore</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SHOP BY CATEGORY: 6 clear shoe styles */}
      <section className="py-16 sm:py-20 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="6 MASTER COLLECTIONS"
            title="Shop By Footwear Style"
            subtitle="Explore our meticulously crafted shoe silhouettes designed for corporate authority, wedding gala, and everyday luxury."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="group relative rounded-2xl overflow-hidden bg-[#EDE6DA] border border-[#EDE6DA] shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EDE6DA]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#C9A66B] font-semibold block mb-0.5">
                      {cat.tagline}
                    </span>
                    <h3 className="font-playfair text-xl font-bold text-[#F7F3EC] flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-[#C9A66B] group-hover:translate-x-1.5 transition-transform" />
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#6B645B] line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                  <div className="mt-3 pt-2 text-xs font-semibold text-[#0B0B0D] group-hover:text-[#C9A66B] transition-colors flex items-center gap-1">
                    <span>View All {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE SPECIAL OFFER WITH ANIMATED COUNTDOWN */}
      <SpecialOfferBanner />

      {/* 7. NEW ARRIVALS: Product cards with Quick View support */}
      <section className="py-16 sm:py-20 bg-[#EDE6DA]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A66B] mb-2 block">
                Fresh From The Atelier
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-[#17140F]">
                New Arrivals
              </h2>
              <div className="w-10 h-[2px] bg-[#C9A66B] mt-2" />
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="mt-4 sm:mt-0 text-sm font-semibold text-[#17140F] hover:text-[#C9A66B] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore All Shoes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. FEATURED PRODUCTS: Smooth Carousel Slider with navigation */}
      <section className="py-16 sm:py-20 bg-[#2A1B14] text-[#F7F3EC] border-y border-[#C9A66B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A66B] mb-2 block">
                Signature Collection Slider
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F7F3EC]">
                Featured Masterpieces
              </h2>
              <div className="w-10 h-[2px] bg-[#C9A66B] mt-2" />
            </div>

            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <span className="text-xs text-[#EDE6DA]/60 mr-2 hidden sm:inline">
                Drag or scroll to explore
              </span>
              <button
                onClick={() => scrollFeatured('left')}
                className="p-3 rounded-xl border border-[#C9A66B]/40 hover:border-[#C9A66B] hover:bg-[#C9A66B]/15 text-[#C9A66B] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollFeatured('right')}
                className="p-3 rounded-xl border border-[#C9A66B]/40 hover:border-[#C9A66B] hover:bg-[#C9A66B]/15 text-[#C9A66B] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                aria-label="Next products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={featuredScrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
          >
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
                <ProductCard
                  product={prod}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US: 4 Cards */}
      <section className="py-16 sm:py-20 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="UNCOMPROMISING STANDARDS"
            title="The Markhor Distinction"
            subtitle="Why thousands of gentlemen across Pakistan trust us for weddings, corporate leadership, and daily comfort."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#2A1B14] text-[#C9A66B] flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#17140F]">
                100% Genuine Full-Grain
              </h3>
              <p className="text-xs text-[#6B645B] leading-relaxed">
                We strictly use full-grain bovine leather and supple calfskin. No synthetic rexine, bonded leather, or cheap plastic composites.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#2A1B14] text-[#C9A66B] flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#17140F]">
                Orthopedic Cushioned Arch
              </h3>
              <p className="text-xs text-[#6B645B] leading-relaxed">
                Multi-layer high-density memory latex insole absorbs floor impact, ensuring you can stand comfortably for 10+ hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#2A1B14] text-[#C9A66B] flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#17140F]">
                Lahore Master Shoemakers
              </h3>
              <p className="text-xs text-[#6B645B] leading-relaxed">
                Every pair is cut, lasted, and hand-burnished by second-generation cobblers using proven Goodyear and Blake stitch techniques.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#2A1B14] text-[#C9A66B] flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#17140F]">
                Zero-Risk 7-Day Exchange
              </h3>
              <p className="text-xs text-[#6B645B] leading-relaxed">
                If the size isn&apos;t 100% spot on, send us a WhatsApp message. We send the replacement pair right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OUR STORE: Photo gallery of the shop, address, hours, Get Directions */}
      <section className="py-16 sm:py-20 bg-[#EDE6DA]/50 border-t border-[#EDE6DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A66B] block">
                Physical Experience
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#17140F]">
                Visit Our Flagship Lahore Atelier
              </h2>
              <div className="w-10 h-[2px] bg-[#C9A66B]" />
              <p className="text-sm text-[#6B645B] leading-relaxed">
                Experience the aroma of genuine leather and try on every size in person. Our footwear consultants provide complimentary foot measurement and leather care advice.
              </p>

              <div className="space-y-3 text-xs text-[#17140F]">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#EDE6DA]">
                  <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong>Location:</strong>
                    <div className="text-[#6B645B] mt-0.5">{settings.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#EDE6DA]">
                  <Clock className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong>Opening Hours:</strong>
                    <div className="text-[#6B645B] mt-0.5">{settings.opening_hours}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] text-xs font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#C9A66B]" />
                  <span>Get Directions on Google Maps</span>
                </a>

                <button
                  onClick={() => navigate('/contact')}
                  className="border border-[#C9A66B] text-[#17140F] hover:bg-[#C9A66B]/15 text-xs font-semibold px-5 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Contact Store
                </button>
              </div>
            </div>

            {/* Store Visual Gallery */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-4/3 bg-[#EDE6DA] border border-[#C9A66B]/20 shadow-md">
                  <img
                    src={heroImg}
                    alt="Leathercraft workshop"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-1/1 bg-[#EDE6DA] border border-[#C9A66B]/20 shadow-md">
                  <img
                    src={formalImg}
                    alt="Store showcase"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="rounded-2xl overflow-hidden aspect-1/1 bg-[#EDE6DA] border border-[#C9A66B]/20 shadow-md">
                  <img
                    src={loaferImg}
                    alt="Artisan stitching"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-4/3 bg-[#EDE6DA] border border-[#C9A66B]/20 shadow-md">
                  <img
                    src={sneakerImg}
                    alt="Craftsman bench"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. CUSTOMER REVIEWS */}
      <section className="py-16 sm:py-20 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="VERIFIED EXPERIENCES"
            title="Trusted by Gentlemen Across Pakistan"
            subtitle="Read real reviews from shoe connoisseurs in Lahore, Karachi, Islamabad, and across the nation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C9A66B] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#17140F] italic leading-relaxed mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDE6DA]">
                  <div className="font-bold text-sm text-[#17140F] flex items-center justify-between">
                    <span>{rev.name}</span>
                    <span className="text-xs font-normal text-[#138A55]">✓ {rev.city}</span>
                  </div>
                  <div className="text-[11px] text-[#C9A66B] font-medium mt-0.5">
                    Purchased: {rev.shoe}
                  </div>
                  <div className="text-[10px] text-[#6B645B] mt-0.5">
                    {rev.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA: Order now on WhatsApp */}
      <section className="bg-[#0B0B0D] text-[#F7F3EC] py-14 sm:py-16 border-t border-[#C9A66B]/20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#C9A66B] mb-2 block">
            Direct &amp; Personal Service
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-3">
            Prefer To Order Directly on WhatsApp?
          </h2>
          <div className="w-10 h-[2px] bg-[#C9A66B] mx-auto mb-4" />
          <p className="text-sm text-[#EDE6DA]/80 leading-relaxed mb-8">
            Simply send a screenshot of any shoe you like with your required size. Our footwear team will confirm availability, verify your delivery address, and dispatch your pair via Express Cash on Delivery.
          </p>

          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
              "Salam, I want to order a pair of shoes. Can you assist me with size and stock?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#138A55] hover:bg-[#0e6940] text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl transition-all duration-200 cursor-pointer hover:scale-103"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Chat &amp; Order on WhatsApp (+{settings.whatsapp})</span>
          </a>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
};
