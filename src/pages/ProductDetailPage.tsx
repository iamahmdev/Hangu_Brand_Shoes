import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { SEOHead } from '../components/common/SEOHead';
import { formatPrice } from '../utils/format';
import {
  Star,
  Truck,
  RefreshCw,
  ShieldCheck,
  Ruler,
  MessageCircle,
  ShoppingBag,
  Zap,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Maximize2,
  X
} from 'lucide-react';

export const ProductDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const { products, settings } = useStore();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug && p.is_active);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'care' | 'delivery'>('desc');
  const [validationError, setValidationError] = useState<string>('');
  const [addedSuccessToast, setAddedSuccessToast] = useState(false);

  // Available colors and sizes from variants
  const availableColors = Array.from(new Set(product?.variants?.map((v) => v.color) || ['Black']));
  const allSizes = [40, 41, 42, 43, 44, 45];

  // Initialize first available color
  useEffect(() => {
    if (product && availableColors.length > 0 && !selectedColor) {
      setSelectedColor(availableColors[0]);
    }
  }, [product, availableColors, selectedColor]);

  // Determine variant stock for current selection
  const currentVariant = product?.variants?.find(
    (v) => v.size === selectedSize && v.color.toLowerCase() === selectedColor.toLowerCase()
  );

  const isSelectedOutOfStock = currentVariant ? currentVariant.stock <= 0 : false;
  const isSelectedLowStock = currentVariant ? currentVariant.stock > 0 && currentVariant.stock <= 3 : false;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-playfair text-2xl font-bold text-[#17140F] mb-2">Shoe Not Found</h2>
        <p className="text-xs text-[#6B645B] mb-4">The pair you are looking for is currently unavailable or archived.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#0B0B0D] text-white text-xs font-semibold px-6 py-2.5 rounded-xl cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const productImages = (product.images || []).map((img) =>
    img.replace('/src/assets/images/', '/images/')
  );

  const discountPercent = product.old_price && product.old_price > product.price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select your shoe size (e.g. EU 41, 42).');
      return;
    }
    if (!selectedColor) {
      setValidationError('Please choose a leather color.');
      return;
    }
    setValidationError('');

    const success = addToCart(product, selectedSize, selectedColor, quantity);
    if (success) {
      setAddedSuccessToast(true);
      setTimeout(() => setAddedSuccessToast(false), 3000);
    } else {
      setValidationError('Requested quantity exceeds available stock.');
    }
  };

  // Handle Buy Now (Instant Checkout)
  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError('Please select your shoe size before checkout.');
      return;
    }
    if (!selectedColor) {
      setValidationError('Please select leather color.');
      return;
    }
    setValidationError('');
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  // Prefilled WhatsApp order URL
  const whatsappOrderUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Salam, I want to order this pair:\n\n*Product:* ${product.name}\n*Price:* ${formatPrice(product.price)}\n*Size:* EU ${selectedSize || 'Not selected yet'}\n*Color:* ${selectedColor || 'Not selected yet'}\n*URL:* ${window.location.href}\n\nPlease confirm stock and address details.`
  )}`;

  // Related products
  const relatedProducts = products
    .filter((p) => p.is_active && p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-8 sm:py-14 pb-24 lg:pb-14">
      <SEOHead
        title={product.name}
        description={product.description.slice(0, 155)}
        product={product}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B645B] mb-6 font-medium">
          <button onClick={() => navigate('/')} className="hover:text-[#17140F]">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-[#17140F]">Shop</button>
          <span>/</span>
          <button
            onClick={() => navigate(`/category/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)}
            className="hover:text-[#17140F]"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#17140F] font-semibold truncate">{product.name}</span>
        </nav>

        {/* Purchase Module: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Product Gallery with Thumbnails & Zoom */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 w-full bg-[#EDE6DA] rounded-2xl overflow-hidden border border-[#EDE6DA] shadow-md group">
              <img
                src={productImages[selectedImageIndex] || productImages[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 cursor-zoom-in"
                onClick={() => setIsZoomOpen(true)}
              />

              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#17140F] shadow-sm transition-colors cursor-pointer"
                title="Zoom image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#D1112B] text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                  SALE {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden bg-[#EDE6DA] border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx ? 'border-[#C9A66B] shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Features Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EDE6DA]">
              <div className="p-3 rounded-xl bg-white border border-[#EDE6DA] text-center space-y-1">
                <Truck className="w-4 h-4 text-[#138A55] mx-auto" />
                <div className="text-[11px] font-bold text-[#17140F]">Cash on Delivery</div>
                <div className="text-[10px] text-[#6B645B]">Pay at your doorstep</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#EDE6DA] text-center space-y-1">
                <RefreshCw className="w-4 h-4 text-[#C9A66B] mx-auto" />
                <div className="text-[11px] font-bold text-[#17140F]">7-Day Size Exchange</div>
                <div className="text-[10px] text-[#6B645B]">Fast WhatsApp support</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#EDE6DA] text-center space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#C9A66B] mx-auto" />
                <div className="text-[11px] font-bold text-[#17140F]">100% Real Leather</div>
                <div className="text-[10px] text-[#6B645B]">No synthetic blends</div>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6DA] shadow-sm space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#C9A66B] font-semibold tracking-wider uppercase mb-1.5">
                <span>{product.brand}</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-[#C9A66B]" />
                  <span className="text-[#17140F] font-mono">{product.rating || 4.9}</span>
                  <span className="text-[#6B645B]">({product.reviews_count || 32} reviews)</span>
                </span>
              </div>

              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#17140F] leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#17140F] font-mono tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.old_price && (
                  <span className="text-base text-[#6B645B] line-through font-mono tabular-nums">
                    {formatPrice(product.old_price)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#D1112B]">
                    Save {formatPrice(product.old_price! - product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Material Highlight */}
            <div className="text-xs text-[#6B645B] bg-[#F7F3EC] p-3 rounded-xl border border-[#EDE6DA]">
              <strong className="text-[#17140F]">Material: </strong>
              {product.material}
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#17140F] flex items-center justify-between">
                <span>Color: <strong className="text-[#C9A66B]">{selectedColor}</strong></span>
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((colorName) => (
                  <button
                    key={colorName}
                    onClick={() => {
                      setSelectedColor(colorName);
                      setValidationError('');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedColor.toLowerCase() === colorName.toLowerCase()
                        ? 'bg-[#0B0B0D] text-[#C9A66B] border-[#0B0B0D] shadow-xs'
                        : 'bg-[#F7F3EC] text-[#17140F] border-[#EDE6DA] hover:border-[#C9A66B]'
                    }`}
                  >
                    {colorName}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Chips and Stock notice */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#17140F]">
                  Select Size (EU): {selectedSize ? <strong className="text-[#C9A66B]">EU {selectedSize}</strong> : <span className="text-[#D1112B]">*Required</span>}
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#C9A66B] hover:text-[#17140F] flex items-center gap-1 font-medium underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {allSizes.map((sz) => {
                  const variant = product.variants?.find(
                    (v) => v.size === sz && v.color.toLowerCase() === selectedColor.toLowerCase()
                  );
                  const isZeroStock = variant ? variant.stock <= 0 : false;
                  const isSelected = selectedSize === sz;

                  return (
                    <button
                      key={sz}
                      disabled={isZeroStock}
                      onClick={() => {
                        setSelectedSize(sz);
                        setValidationError('');
                      }}
                      className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#D1112B] text-white border-[#D1112B] shadow-md scale-102'
                          : isZeroStock
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60 line-through'
                          : 'bg-[#F7F3EC] text-[#17140F] border-[#EDE6DA] hover:border-[#C9A66B]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic stock status for selected size */}
              {selectedSize && (
                <div className="text-xs pt-1">
                  {isSelectedOutOfStock ? (
                    <span className="text-[#D1112B] font-semibold">
                      Out of stock in Size {selectedSize}. Please choose another size or chat on WhatsApp.
                    </span>
                  ) : isSelectedLowStock ? (
                    <span className="text-[#D1112B] font-semibold animate-pulse">
                      ⚡ Only {currentVariant?.stock} left in stock for Size {selectedSize}! Order now.
                    </span>
                  ) : (
                    <span className="text-[#138A55] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#138A55]" />
                      Size {selectedSize} is in stock for immediate dispatch
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-semibold text-[#17140F]">Quantity:</span>
              <div className="flex items-center border border-[#EDE6DA] rounded-xl bg-[#F7F3EC]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-[#EDE6DA] text-[#17140F] transition-colors rounded-l-xl"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3.5 text-xs font-bold text-[#17140F] font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                  className="p-2 hover:bg-[#EDE6DA] text-[#17140F] transition-colors rounded-r-xl"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Validation Message */}
            {validationError && (
              <div className="p-3 bg-[#D1112B]/10 border border-[#D1112B]/30 rounded-xl text-xs text-[#D1112B] font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Added Success Banner */}
            {addedSuccessToast && (
              <div className="p-3 bg-[#138A55]/10 border border-[#138A55]/30 rounded-xl text-xs text-[#138A55] font-medium flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Added to shopping bag! Slide drawer opened.</span>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Add to Cart (Crimson) */}
              <button
                onClick={handleAddToCart}
                disabled={isSelectedOutOfStock}
                className="w-full bg-[#D1112B] hover:bg-[#A80D22] disabled:bg-gray-400 text-white py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              {/* Buy Now (Direct Checkout) */}
              <button
                onClick={handleBuyNow}
                disabled={isSelectedOutOfStock}
                className="w-full bg-[#0B0B0D] hover:bg-[#2A1B14] disabled:bg-gray-400 text-[#F7F3EC] py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 border border-[#C9A66B]/30 hover:border-[#C9A66B] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#C9A66B]" />
                <span>Buy Now (Cash on Delivery)</span>
              </button>

              {/* Order on WhatsApp */}
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#138A55] hover:bg-[#0e6940] text-white py-3 px-4 rounded-xl font-bold text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp with Size &amp; Details</span>
              </a>
            </div>

          </div>

        </div>

        {/* Product Information Tabs */}
        <div className="mt-14 bg-white rounded-2xl border border-[#EDE6DA] p-6 sm:p-8 shadow-xs">
          <div className="flex border-b border-[#EDE6DA] gap-6 text-sm font-semibold mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'text-[#0B0B0D] border-b-2 border-[#C9A66B]'
                  : 'text-[#6B645B] hover:text-[#17140F]'
              }`}
            >
              Shoe Description
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'care'
                  ? 'text-[#0B0B0D] border-b-2 border-[#C9A66B]'
                  : 'text-[#6B645B] hover:text-[#17140F]'
              }`}
            >
              Material &amp; Leather Care
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'delivery'
                  ? 'text-[#0B0B0D] border-b-2 border-[#C9A66B]'
                  : 'text-[#6B645B] hover:text-[#17140F]'
              }`}
            >
              Delivery &amp; 7-Day Exchange
            </button>
          </div>

          <div className="text-xs sm:text-sm text-[#17140F] leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <ul className="list-disc pl-5 space-y-1 text-[#6B645B]">
                  <li>Handcrafted in Lahore by master footwear artisans</li>
                  <li>Orthopedic cushioned memory foam arch support</li>
                  <li>Antimicrobial moisture-absorbing leather interior</li>
                  <li>Reinforced heel counter prevents slipping and blisters</li>
                </ul>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <p>
                  <strong>{product.material}</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F7F3EC] space-y-1.5">
                    <strong className="text-[#17140F]">Daily Maintenance:</strong>
                    <p className="text-xs text-[#6B645B]">
                      Wipe down with a dry cotton cloth after wearing to remove Pakistani dust. Avoid excessive soaking in monsoon water.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F7F3EC] space-y-1.5">
                    <strong className="text-[#17140F]">Leather Conditioning:</strong>
                    <p className="text-xs text-[#6B645B]">
                      Apply natural beeswax or quality leather cream once a month. Use shoe trees to maintain the natural shape of the shoe.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3">
                <p>
                  We deliver to every city, town, and district in Pakistan via TCS, Leopards, and CallCourier.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F7F3EC] space-y-1">
                    <strong className="text-[#17140F]">Delivery Timeline:</strong>
                    <p className="text-xs text-[#6B645B]">
                      Lahore: 1-2 working days. Karachi, Islamabad, Rawalpindi: 2-3 working days. Other cities: 3-5 working days.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F7F3EC] space-y-1">
                    <strong className="text-[#17140F]">7-Day Size Exchange:</strong>
                    <p className="text-xs text-[#6B645B]">
                      Try the shoes on a clean carpet. If size isn&apos;t comfortable, WhatsApp our team for an immediate size replacement.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block mb-1">
                Complementary Styles
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#17140F]">
                You May Also Admire
              </h3>
              <div className="w-10 h-[2px] bg-[#C9A66B] mt-2" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Bottom Bar (Under 15% Viewport Cap) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EDE6DA] p-3 z-30 shadow-2xl flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] text-[#6B645B] truncate">{product.name}</div>
          <div className="text-sm font-bold text-[#17140F] font-mono tabular-nums">
            {formatPrice(product.price)}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-[#D1112B] hover:bg-[#A80D22] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>

        <a
          href={whatsappOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#138A55] text-white p-2.5 rounded-xl flex items-center justify-center shrink-0"
          title="WhatsApp Order"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={productImages[selectedImageIndex] || productImages[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
          />
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

    </div>
  );
};
