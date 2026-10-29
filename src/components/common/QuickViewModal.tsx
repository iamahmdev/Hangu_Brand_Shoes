import React, { useState } from 'react';
import { Product } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/format';
import { X, Star, ShoppingBag, MessageCircle, ArrowRight, Check } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { settings } = useStore();

  const [selectedSize, setSelectedSize] = useState<number | null>(42);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.variants?.[0]?.color || 'Black'
  );
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const allSizes = [40, 41, 42, 43, 44, 45];
  const colors = Array.from(new Set(product.variants?.map((v) => v.color) || ['Black']));

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Salam, I want to order *${product.name}* (Size: EU ${selectedSize}, Color: ${selectedColor}) priced at ${formatPrice(product.price)}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#EDE6DA] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scaleIn">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#6B645B] hover:text-black hover:bg-[#EDE6DA] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          
          {/* Shoe Image */}
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#EDE6DA] border border-[#EDE6DA]">
            <img
              src={(product.images[0] || '').replace('/src/assets/images/', '/images/')}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#C9A66B] font-bold">
                {product.brand} · {product.category}
              </div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#17140F]">
                {product.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#C9A66B] mt-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono text-[#17140F] font-bold">{product.rating || 4.9}</span>
                <span className="text-[#6B645B]">({product.reviews_count || 32} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-xl font-bold text-[#17140F] font-mono tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.old_price && (
                <span className="text-sm text-[#6B645B] line-through font-mono tabular-nums">
                  {formatPrice(product.old_price)}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#17140F]">Leather Color</label>
              <div className="flex flex-wrap gap-1.5">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      selectedColor.toLowerCase() === c.toLowerCase()
                        ? 'bg-[#0B0B0D] text-[#C9A66B] border-[#0B0B0D]'
                        : 'bg-[#F7F3EC] text-[#17140F] border-[#EDE6DA]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Chips */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#17140F]">Select Size (EU)</label>
              <div className="grid grid-cols-6 gap-1.5">
                {allSizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#D1112B] text-white border-[#D1112B]'
                        : 'bg-[#F7F3EC] text-[#17140F] border-[#EDE6DA] hover:border-[#C9A66B]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-[#D1112B] hover:bg-[#A80D22] text-white py-3 rounded-xl font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#138A55] hover:bg-[#0e6940] text-white py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/product/${product.slug}`);
                }}
                className="w-full text-center text-xs text-[#C9A66B] hover:underline font-semibold flex items-center justify-center gap-1 pt-1 cursor-pointer"
              >
                <span>View Full Product Page &amp; Size Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
