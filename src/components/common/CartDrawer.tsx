import React from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';
import { formatPrice } from '../../utils/format';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryCharge,
    total,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    isCartOpen,
    setIsCartOpen
  } = useCart();
  const { navigate } = useRouter();

  if (!isCartOpen) return null;

  const percentProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F3EC] text-[#17140F] shadow-2xl flex flex-col border-l border-[#C9A66B]/30">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#0B0B0D] text-[#F7F3EC] flex items-center justify-between border-b border-[#C9A66B]/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C9A66B]" />
              <h3 className="font-playfair text-lg font-semibold tracking-wide">
                Your Shopping Bag
              </h3>
              <span className="text-xs text-[#C9A66B] font-mono">
                ({items.reduce((acc, i) => acc + i.qty, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg text-[#EDE6DA]/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#EDE6DA] p-3.5 border-b border-[#C9A66B]/20">
            <div className="flex items-center justify-between text-xs font-medium text-[#17140F] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#138A55]" />
                {amountNeededForFreeDelivery > 0 ? (
                  <span>
                    Add <strong className="text-[#D1112B]">{formatPrice(amountNeededForFreeDelivery)}</strong> more for <strong className="text-[#138A55]">FREE Delivery</strong>
                  </span>
                ) : (
                  <span className="text-[#138A55] font-semibold">
                    ✓ You have unlocked FREE Delivery all over Pakistan!
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#6B645B] font-mono">
                {Math.round(percentProgress)}%
              </span>
            </div>
            <div className="w-full bg-[#D8CEBE] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#138A55] h-full transition-all duration-300 rounded-full"
                style={{ width: `${percentProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#6B645B] space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#EDE6DA] flex items-center justify-center text-[#C9A66B]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-semibold text-[#17140F]">Your bag is empty</h4>
                  <p className="text-xs text-[#6B645B] mt-1">Discover our handcrafted leather footwear</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] text-xs font-semibold px-6 py-2.5 rounded-xl border border-[#C9A66B]/30 hover:border-[#C9A66B] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-[#EDE6DA] shadow-xs"
                >
                  <img
                    src={(item.product.images[0] || '').replace('/src/assets/images/', '/images/')}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-lg bg-[#EDE6DA] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#17140F] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B645B] hover:text-[#D1112B] p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-[#6B645B] mt-0.5">
                        <span>Size: <strong>EU {item.size}</strong></span>
                        <span className="mx-1.5">·</span>
                        <span>Color: <strong>{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center border border-[#EDE6DA] rounded-lg bg-[#F7F3EC]">
                        <button
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="p-1 hover:bg-[#EDE6DA] text-[#17140F] transition-colors rounded-l-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#17140F] font-mono">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          className="p-1 hover:bg-[#EDE6DA] text-[#17140F] transition-colors rounded-r-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-sm font-bold text-[#17140F] font-mono tabular-nums">
                        {formatPrice(item.price * item.qty)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#EDE6DA] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B645B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#17140F] font-mono tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery (Nationwide)</span>
                  <span className="font-semibold font-mono tabular-nums">
                    {deliveryCharge === 0 ? (
                      <span className="text-[#138A55]">FREE</span>
                    ) : (
                      formatPrice(deliveryCharge)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#17140F] pt-2 border-t border-[#EDE6DA]">
                  <span>Total (Cash on Delivery)</span>
                  <span className="text-base text-[#17140F] font-mono tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-[#D1112B] hover:bg-[#A80D22] text-white py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full bg-[#EDE6DA] hover:bg-[#D8CEBE] text-[#17140F] py-2.5 px-4 rounded-xl font-medium text-xs transition-colors cursor-pointer text-center block"
                >
                  View Full Cart & Details
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
