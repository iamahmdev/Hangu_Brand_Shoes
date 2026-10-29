import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from '../../context/RouterContext';
import { useStore } from '../../context/StoreContext';
import {
  ArrowRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  CheckCircle2,
  Tag,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { formatPrice } from '../../utils/format';

const heroImg1 = '/images/hero_leather_dress_shoe_1793279534707.jpg';
const loaferImg2 = '/images/category_loafers_leather_1793279536094.jpg';
const sneakerImg3 = '/images/category_sneakers_leather_1793279535993.jpg';
const peshawariImg4 = '/images/category_peshawari_chappal_1793281566835.jpg';
const bootImg5 = '/images/category_chelsea_boot_1793281567551.jpg';

interface HeroSlide {
  id: string;
  badge: string;
  kicker: string;
  title: string;
  highlightText: string;
  description: string;
  image: string;
  productSlug: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  offerText: string;
  rating: number;
  reviewsCount: number;
}

export const HeroSlider: React.FC = () => {
  const { navigate } = useRouter();
  const { settings } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const slideDuration = 6500; // 6.5s per slide

  const slides: HeroSlide[] = [
    {
      id: 'slide-1',
      badge: 'LIMITED WEDDING EDITION · SAVE 20%',
      kicker: 'MASTER COBBLER SERIES',
      title: 'Step Into Comfort &',
      highlightText: 'Sovereign Luxury',
      description: 'Carved from single-piece Italian calfskin with orthopedic memory foam arch support. Timeless authority for boardrooms and valima festivities across Pakistan.',
      image: heroImg1,
      productSlug: 'sovereign-wholecut-oxford',
      categorySlug: 'formal',
      price: 8950,
      oldPrice: 10500,
      offerText: 'Special Price · Free Delivery Across Pakistan',
      rating: 4.9,
      reviewsCount: 38
    },
    {
      id: 'slide-2',
      badge: 'ARTISANAL SUEDE & LEATHER',
      kicker: 'SUMMER & FESTIVE CASUALS',
      title: 'The Riviera Handcrafted',
      highlightText: 'Penny Loafers',
      description: 'Supple velvety suede and burnished cognac accents with flexible split-leather traction soles. Cloud-like comfort engineered for sockless weekend leisure.',
      image: loaferImg2,
      productSlug: 'riviera-artisan-penny-loafer',
      categorySlug: 'loafers',
      price: 6850,
      oldPrice: 7990,
      offerText: 'Save Rs. 1,140 · Doorstep 7-Day Size Exchange',
      rating: 5.0,
      reviewsCount: 52
    },
    {
      id: 'slide-3',
      badge: '100% GENUINE NAPPA COWHIDE',
      kicker: 'CONTEMPORARY LUXURY ESSENTIALS',
      title: 'Grand Court Hand-Stitched',
      highlightText: 'Low-Top Sneakers',
      description: 'Clean architectural silhouette with Margom-style cupsole stitching and antimicrobial bamboo lining. Built for everyday urban strides with zero compromise on luxury.',
      image: sneakerImg3,
      productSlug: 'grand-court-leather-sneaker',
      categorySlug: 'sneakers',
      price: 5950,
      oldPrice: 6990,
      offerText: 'Free Nationwide Express Shipping',
      rating: 4.9,
      reviewsCount: 44
    },
    {
      id: 'slide-4',
      badge: 'PAKISTANI HERITAGE MASTERPIECE',
      kicker: 'IMPERIAL KAPTAAN CUT',
      title: 'Traditional Double-Stitched',
      highlightText: 'Peshawari Chappal',
      description: 'Authentic pure buffalo leather crafted with tire-grip soles, brass buckles, and ergonomic heel padding for Eid, weddings, and traditional gatherings.',
      image: peshawariImg4,
      productSlug: 'peshawari-imperial-kaptaan',
      categorySlug: 'peshawari-chappal',
      price: 5450,
      oldPrice: 6200,
      offerText: 'Popular Choice · 100% Genuine Leather Guarantee',
      rating: 5.0,
      reviewsCount: 68
    },
    {
      id: 'slide-5',
      badge: 'WINTER BROGUE & CHELSEA',
      kicker: 'TIMELESS ANKLE BOOTS',
      title: 'The Regent Hand-Burnished',
      highlightText: 'Chelsea Leather Boots',
      description: 'Commanding high-ankle silhouette with twin elastic gussets, reinforced pull tabs, and weather-sealed Goodyear welts engineered for longevity.',
      image: bootImg5,
      productSlug: 'regent-chelsea-boot',
      categorySlug: 'brogues-boots',
      price: 9450,
      oldPrice: 11200,
      offerText: 'Premium Box Packaging & Polish Kit Included',
      rating: 4.9,
      reviewsCount: 29
    }
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideDuration);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.45 },
        scale: { duration: 0.45 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.35 }
      }
    })
  };

  const slide = slides[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-gradient-to-br from-[#120B08] via-[#0B0B0D] to-[#050506] text-[#F7F3EC] overflow-hidden pt-6 pb-12 sm:pb-16 border-b border-[#C9A66B]/25 select-none"
    >
      {/* Background ambient gold & espresso glow spotlights */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A66B]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#2A1B14]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Control Bar: Badge + Navigation Arrows */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          
          {/* Animated Badge with pulsing gold star */}
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A1B14] border border-[#C9A66B]/40 text-[#C9A66B] text-[11px] uppercase tracking-widest font-bold shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A66B] animate-pulse" />
            <span>{slide.badge}</span>
          </motion.div>

          {/* Slide Numeric Indicator & Manual Navigation */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono tracking-widest text-[#EDE6DA]/70 bg-black/40 px-3 py-1 rounded-full border border-white/10">
              <strong className="text-[#C9A66B] text-sm">0{currentSlide + 1}</strong>
              <span className="mx-1">/</span>
              <span>0{slides.length}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => paginate(-1)}
                className="w-9 h-9 rounded-full border border-[#C9A66B]/40 hover:border-[#C9A66B] hover:bg-[#C9A66B]/20 active:scale-95 text-[#C9A66B] flex items-center justify-center transition-all cursor-pointer shadow-md"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-9 h-9 rounded-full border border-[#C9A66B]/40 hover:border-[#C9A66B] hover:bg-[#C9A66B]/20 active:scale-95 text-[#C9A66B] flex items-center justify-center transition-all cursor-pointer shadow-md"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slide Animation Container */}
        <div className="relative min-h-[500px] lg:min-h-[480px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              {/* Left Column: Typography, Price, Offer and CTAs */}
              <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
                
                {/* Kicker */}
                <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A66B] flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-6 h-[1.5px] bg-[#C9A66B]" />
                  <span>{slide.kicker}</span>
                </div>

                {/* Main Heading */}
                <h1
                  className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F3EC] leading-[1.12]"
                  style={{ textWrap: 'balance' }}
                >
                  {slide.title}{' '}
                  <span className="text-[#C9A66B] italic font-normal block sm:inline">
                    {slide.highlightText}
                  </span>
                </h1>

                {/* Gold Accent Divider */}
                <div className="w-12 h-[2px] bg-[#C9A66B] mx-auto lg:mx-0" />

                {/* Description */}
                <p className="text-sm sm:text-base text-[#EDE6DA]/85 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {slide.description}
                </p>

                {/* Special Offer Highlight Strip */}
                <div className="inline-flex items-center gap-2.5 p-2.5 rounded-xl bg-[#2A1B14]/90 border border-[#C9A66B]/30 text-xs shadow-md">
                  <Tag className="w-4 h-4 text-[#D1112B] shrink-0" />
                  <span className="text-[#F7F3EC] font-semibold">{slide.offerText}</span>
                  <span className="text-[#138A55] font-bold">· Cash on Delivery</span>
                </div>

                {/* Action Buttons: Shop Now & WhatsApp */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
                  <button
                    onClick={() => navigate(`/product/${slide.productSlug}`)}
                    className="bg-[#D1112B] hover:bg-[#A80D22] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-xl hover:shadow-[#D1112B]/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Shop Now ({formatPrice(slide.price)})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                      `Salam! I am interested in ordering *${slide.title} ${slide.highlightText}* on Cash on Delivery.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#C9A66B] hover:bg-[#C9A66B] text-[#C9A66B] hover:text-[#0B0B0D] font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-98 group"
                  >
                    <MessageCircle className="w-5 h-5 text-[#138A55] group-hover:text-black transition-colors" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#EDE6DA]/75 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#138A55]" />
                    Cash on Delivery
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A66B]" />
                    7-Day Size Exchange
                  </span>
                  <span>·</span>
                  <span>100% Genuine Leather</span>
                </div>

              </div>

              {/* Right Column: Large Showcase Card with Framer Motion hover effects */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="relative w-full max-w-md lg:max-w-lg aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-3xl overflow-hidden border border-[#C9A66B]/30 shadow-2xl bg-[#140F0D] group">
                  
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Price Tag Floating Badge */}
                  <div className="absolute top-4 left-4 bg-[#0B0B0D]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#C9A66B]/30 flex items-center gap-2 shadow-lg">
                    <span className="font-mono text-base font-bold text-[#F7F3EC] tabular-nums">
                      {formatPrice(slide.price)}
                    </span>
                    {slide.oldPrice && (
                      <span className="font-mono text-xs text-[#6B645B] line-through tabular-nums">
                        {formatPrice(slide.oldPrice)}
                      </span>
                    )}
                    {slide.oldPrice && (
                      <span className="bg-[#D1112B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* Top Review Rating Badge */}
                  <div className="absolute top-4 right-4 bg-[#0B0B0D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#C9A66B]/30 flex items-center gap-1.5 shadow-lg text-xs">
                    <Star className="w-3.5 h-3.5 text-[#C9A66B] fill-current" />
                    <span className="font-bold text-[#F7F3EC]">{slide.rating}</span>
                    <span className="text-[#EDE6DA]/70 text-[10px]">({slide.reviewsCount})</span>
                  </div>

                  {/* Bottom Quick Look Bar */}
                  <div className="absolute bottom-4 inset-x-4 bg-[#0B0B0D]/85 backdrop-blur-md p-3.5 rounded-2xl border border-[#C9A66B]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C9A66B] font-bold block">
                        {slide.kicker}
                      </span>
                      <div className="font-playfair text-sm sm:text-base font-bold text-[#F7F3EC] truncate">
                        {slide.title} {slide.highlightText}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/product/${slide.productSlug}`)}
                      className="bg-[#D1112B] hover:bg-[#A80D22] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Interactive Slide Thumbnails & Progress Bar */}
        <div className="mt-8 pt-4 border-t border-[#C9A66B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Clickable Slide Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className={`shrink-0 text-left px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                  currentSlide === idx
                    ? 'bg-[#2A1B14] border-[#C9A66B] text-[#C9A66B] shadow-md'
                    : 'bg-white/5 border-transparent text-[#EDE6DA]/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider">
                  0{idx + 1}. {s.kicker.split(' ')[0]}
                </div>
                <div className="text-xs font-bold text-[#F7F3EC] truncate max-w-[120px] hidden sm:block">
                  {s.highlightText}
                </div>
              </button>
            ))}
          </div>

          {/* Animated Timeline Bar */}
          <div className="w-full sm:w-44 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              key={currentSlide}
              className="bg-[#C9A66B] h-full rounded-full"
              style={{
                animation: `progressBar ${slideDuration}ms linear`
              }}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
