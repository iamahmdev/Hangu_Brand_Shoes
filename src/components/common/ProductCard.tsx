import React, { useState } from 'react';
import { Product } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { formatPrice } from '../../utils/format';
import { ShoppingBag, Eye, MessageCircle, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { settings } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Total stock across variants
  const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 10;
  const isOutOfStock = totalStock <= 0;
  const isLowStock = totalStock > 0 && totalStock <= 4;

  // Calculate discount percentage if old price exists
  const discountPercent = product.old_price && product.old_price > product.price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;

  // Choose display image (swap on hover if 2nd image available)
  const rawImage = isHovered && product.images.length > 1 ? product.images[1] : (product.images[0] || '');
  const displayImage = rawImage.replace('/src/assets/images/', '/images/');

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const availableVariant = product.variants?.find((v) => v.stock > 0) || { size: 42, color: 'Black' };
    addToCart(product, availableVariant.size, availableVariant.color, 1);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const availableVariant = product.variants?.find((v) => v.stock > 0) || { size: 42, color: 'Black' };
    const msg = `Salam! I want to order *${product.name}* from Hangu Brand Shoes (${formatPrice(product.price)}, Size: EU ${availableVariant.size}). Please confirm my Cash on Delivery order.`;
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#EDE6DA] shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
    >
      {/* Image Container with Sand background */}
      <div className="relative aspect-4/3 w-full bg-[#EDE6DA] overflow-hidden flex items-center justify-center">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.is_new_arrival && (
            <span className="bg-[#0B0B0D] text-[#C9A66B] text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md shadow-xs border border-[#C9A66B]/30">
              NEW
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#D1112B] text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md shadow-xs">
              SAVE {discountPercent}%
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {isOutOfStock ? (
            <span className="bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              SOLD OUT
            </span>
          ) : isLowStock ? (
            <span className="bg-white/95 text-[#D1112B] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-[#D1112B]/20">
              Only {totalStock} pairs left
            </span>
          ) : (
            <span className="bg-white/90 backdrop-blur-xs text-[#138A55] text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#138A55]" />
              In Stock
            </span>
          )}
        </div>

        {/* Product Image */}
        {!imageError ? (
          <img
            src={displayImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#EDE6DA] text-[#6B645B] text-center">
            <span className="font-playfair font-semibold text-sm text-[#17140F]">
              {product.name}
            </span>
            <span className="text-xs text-[#C9A66B] mt-1">{product.material.split(',')[0]}</span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-white text-xs font-bold tracking-widest uppercase bg-black/80 px-4 py-1.5 rounded-lg border border-white/20">
              Out of Stock
            </span>
          </div>
        )}

        {/* Desktop Quick Hover Actions */}
        <div className="absolute bottom-3 inset-x-3 hidden sm:flex items-center gap-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="flex-1 bg-[#D1112B] hover:bg-[#A80D22] disabled:bg-gray-400 text-white text-[11px] font-bold py-2 px-2 rounded-xl flex items-center justify-center gap-1 shadow-md transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>

          <button
            onClick={handleWhatsAppOrder}
            className="bg-[#138A55] hover:bg-[#0e6940] text-white text-[11px] font-bold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 shadow-md transition-colors"
            title="Fast WhatsApp Order"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="bg-white/95 hover:bg-white text-[#17140F] p-2 rounded-xl shadow-md transition-colors"
              title="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#C9A66B] mb-0.5">
            {product.brand} · {product.category}
          </div>
          <h3 className="font-playfair text-sm sm:text-base font-bold text-[#17140F] group-hover:text-[#2A1B14] line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#6B645B] line-clamp-1 mt-0.5">
            {product.material.split(',')[0]}
          </p>
        </div>

        {/* Price & Rating */}
        <div className="mt-3 pt-2.5 border-t border-[#EDE6DA] flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-[#17140F] font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.old_price && (
              <span className="text-[11px] text-[#6B645B] line-through font-mono tabular-nums">
                {formatPrice(product.old_price)}
              </span>
            )}
          </div>

          <div className="text-[11px] text-[#C9A66B] font-medium flex items-center gap-0.5">
            <span>★</span>
            <span className="font-mono text-[#17140F] font-bold">{product.rating || 4.9}</span>
          </div>
        </div>

        {/* Mobile Quick Action Buttons (Visible on phones for instant orders!) */}
        <div className="grid grid-cols-2 gap-1.5 mt-2.5 sm:hidden">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="bg-[#D1112B] text-white py-1.5 px-2 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 shadow-xs"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Order COD</span>
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="bg-[#138A55] text-white py-1.5 px-2 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 shadow-xs"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
