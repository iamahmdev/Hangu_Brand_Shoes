import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { ArrowRight, Award, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

const heroImg = '/images/hero_leather_dress_shoe_1793279534707.jpg';
const formalImg = '/images/category_formal_oxford_1793279534927.jpg';
const loaferImg = '/images/category_loafers_leather_1793279536094.jpg';
const casualImg = '/images/category_casual_slipon_1793279537181.jpg';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-16">
      <SEOHead
        title="Our Story & Master Craftsmanship"
        description="Learn about our artisanal footwear roots in Lahore and our dedication to handcrafted genuine leather shoes."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A66B] block">
              The Heritage of Lahore
            </span>
            <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-[#17140F] leading-tight">
              Honoring Centuries of Pakistani Shoemaking
            </h1>
            <div className="w-12 h-[2px] bg-[#C9A66B]" />
            <p className="text-sm sm:text-base text-[#6B645B] leading-relaxed">
              Founded in the historic leather districts of Lahore, our atelier was built with a single resolute promise: to rescue men&apos;s footwear from overpriced synthetic fast fashion. 
            </p>
            <p className="text-sm sm:text-base text-[#6B645B] leading-relaxed">
              Pakistan has long produced some of the world’s finest bovine leathers for top luxury houses in Milan and London. We believe Pakistani gentlemen deserve those very same world-class full-grain calfskins, handcrafted locally with uncompromising standards, orthopedic arch comfort, and fair workshop pricing.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden aspect-4/3 bg-[#EDE6DA] border border-[#C9A66B]/30 shadow-2xl">
              <img
                src={heroImg}
                alt="Shoemaker finishing leather oxford"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block bg-[#0B0B0D] text-[#F7F3EC] p-4 rounded-2xl border border-[#C9A66B]/30 shadow-xl max-w-xs">
              <div className="text-xs font-bold text-[#C9A66B]">Hand-Lasted in Lahore</div>
              <div className="text-[11px] text-[#EDE6DA]/70 mt-1">
                Every pair undergoes 48 individual bench operations before passing inspection.
              </div>
            </div>
          </div>
        </div>

        {/* Numbers Strip */}
        <div className="bg-[#0B0B0D] text-[#F7F3EC] rounded-3xl p-8 sm:p-12 border border-[#C9A66B]/20 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="font-playfair text-3xl sm:text-4xl font-bold text-[#C9A66B] font-mono tabular-nums">
                18,000+
              </div>
              <div className="text-xs uppercase tracking-wider text-[#EDE6DA]/80">Pairs Delivered</div>
              <div className="text-[11px] text-[#6B645B]">Across all Pakistani cities</div>
            </div>

            <div className="space-y-1">
              <div className="font-playfair text-3xl sm:text-4xl font-bold text-[#C9A66B] font-mono tabular-nums">
                4.9 / 5
              </div>
              <div className="text-xs uppercase tracking-wider text-[#EDE6DA]/80">Satisfaction Rating</div>
              <div className="text-[11px] text-[#6B645B]">From verified buyers</div>
            </div>

            <div className="space-y-1">
              <div className="font-playfair text-3xl sm:text-4xl font-bold text-[#C9A66B] font-mono tabular-nums">
                14 Years
              </div>
              <div className="text-xs uppercase tracking-wider text-[#EDE6DA]/80">Artisanal Craft</div>
              <div className="text-[11px] text-[#6B645B]">Master cobbler lineage</div>
            </div>

            <div className="space-y-1">
              <div className="font-playfair text-3xl sm:text-4xl font-bold text-[#C9A66B] font-mono tabular-nums">
                100%
              </div>
              <div className="text-xs uppercase tracking-wider text-[#EDE6DA]/80">Real Leather</div>
              <div className="text-[11px] text-[#6B645B]">Zero synthetic plastic</div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div>
          <SectionHeading
            kicker="PILLARS OF OUR HOUSE"
            title="Our Three Commitments"
            subtitle="The core values that guide every pattern we cut and every sole we stitch."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2A1B14] text-[#C9A66B] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#17140F]">
                1. Uncompromising Quality
              </h3>
              <p className="text-xs sm:text-sm text-[#6B645B] leading-relaxed">
                We reject shortcuts. Only genuine full-grain leather, solid brass hardware, and dense latex arch cushions earn their place inside a pair of our shoes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2A1B14] text-[#C9A66B] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#17140F]">
                2. Fair Workshop Prices
              </h3>
              <p className="text-xs sm:text-sm text-[#6B645B] leading-relaxed">
                By designing, lasting, and retailing directly to Pakistani customers, we eliminate middleman markups and expensive mall distributor cuts.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2A1B14] text-[#C9A66B] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#17140F]">
                3. Customer Trust First
              </h3>
              <p className="text-xs sm:text-sm text-[#6B645B] leading-relaxed">
                With nationwide Cash on Delivery and a frictionless 7-Day Size Exchange policy, your peace of mind is unconditionally protected.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-[#EDE6DA] shadow-sm">
            <img src={formalImg} alt="Formal leather shoe" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-[#EDE6DA] shadow-sm">
            <img src={loaferImg} alt="Penny loafer stitching" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-4/3 bg-[#EDE6DA] shadow-sm">
            <img src={casualImg} alt="Driving moccasin craft" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4 pt-6">
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#17140F]">
            Ready to Experience True Leather Comfort?
          </h3>
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 bg-[#D1112B] hover:bg-[#A80D22] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
