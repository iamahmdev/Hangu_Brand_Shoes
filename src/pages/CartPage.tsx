import React from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { formatPrice } from '../utils/format';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryCharge,
    total,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery
  } = useCart();
  const { navigate } = useRouter();

  const percentProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="bg-[#F7F3EC] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <SEOHead title="Shopping Bag" description="Your shopping bag is currently empty." />
        <div className="w-20 h-20 rounded-3xl bg-[#EDE6DA] flex items-center justify-center text-[#C9A66B] mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#17140F] mb-2">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-[#6B645B] max-w-sm mb-6">
          Explore our handcrafted oxford shoes, artisanal loafers, driving moccasins, and low-top leather sneakers.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] text-xs sm:text-sm font-bold px-8 py-3.5 rounded-xl transition-colors cursor-pointer border border-[#C9A66B]/30 hover:border-[#C9A66B]"
        >
          Explore Shoes
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-14">
      <SEOHead title="Your Shopping Bag" description="Review items in your shopping bag before checkout." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <SectionHeading
            kicker="BAG &amp; ORDER DETAILS"
            title="Shopping Bag"
            subtitle="Review your chosen pairs and sizes before placing your Cash on Delivery order."
            align="left"
          />
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="bg-white p-4 rounded-2xl border border-[#EDE6DA] shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-medium text-[#17140F] mb-2 gap-2">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#138A55] shrink-0" />
              {amountNeededForFreeDelivery > 0 ? (
                <span>
                  Add <strong className="text-[#D1112B]">{formatPrice(amountNeededForFreeDelivery)}</strong> more for <strong className="text-[#138A55]">FREE Delivery Across Pakistan</strong>
                </span>
              ) : (
                <span className="text-[#138A55] font-bold">
                  ✓ Congratulations! You have unlocked FREE Delivery all over Pakistan.
                </span>
              )}
            </span>
            <span className="text-xs text-[#6B645B] font-mono">
              {Math.round(percentProgress)}% achieved
            </span>
          </div>
          <div className="w-full bg-[#EDE6DA] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#138A55] h-full transition-all duration-300 rounded-full"
              style={{ width: `${percentProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Items + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#EDE6DA] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE6DA] text-xs text-[#6B645B]">
              <span>Products ({items.length})</span>
              <button
                onClick={clearCart}
                className="hover:text-[#D1112B] transition-colors cursor-pointer"
              >
                Clear Bag
              </button>
            </div>

            <div className="divide-y divide-[#EDE6DA]">
              {items.map((item) => (
                <div key={item.id} className="py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={(item.product.images[0] || '').replace('/src/assets/images/', '/images/')}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-[#EDE6DA] shrink-0"
                    />
                    <div className="space-y-1">
                      <h3
                        onClick={() => navigate(`/product/${item.product.slug}`)}
                        className="font-playfair text-base sm:text-lg font-bold text-[#17140F] hover:text-[#C9A66B] cursor-pointer transition-colors"
                      >
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-[#6B645B]">
                        <span>Size: <strong className="text-[#17140F]">EU {item.size}</strong></span>
                        <span className="mx-2">·</span>
                        <span>Color: <strong className="text-[#17140F]">{item.color}</strong></span>
                      </div>
                      <div className="text-xs font-mono font-bold text-[#17140F] sm:hidden pt-1">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#EDE6DA] rounded-xl bg-[#F7F3EC]">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="p-1.5 hover:bg-[#EDE6DA] text-[#17140F] transition-colors rounded-l-xl"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#17140F] font-mono">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="p-1.5 hover:bg-[#EDE6DA] text-[#17140F] transition-colors rounded-r-xl"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total for item */}
                    <div className="text-base font-bold text-[#17140F] font-mono tabular-nums min-w-[90px] text-right">
                      {formatPrice(item.price * item.qty)}
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#6B645B] hover:text-[#D1112B] p-1.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EDE6DA] flex justify-between items-center text-xs">
              <button
                onClick={() => navigate('/shop')}
                className="text-[#C9A66B] hover:underline font-semibold"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Sticky Order Summary */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6DA] shadow-xs space-y-6 sticky top-28">
            <h3 className="font-playfair text-xl font-bold text-[#17140F] pb-3 border-b border-[#EDE6DA]">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-[#6B645B]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#17140F] font-mono tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-semibold font-mono tabular-nums">
                  {deliveryCharge === 0 ? (
                    <span className="text-[#138A55] font-bold">FREE</span>
                  ) : (
                    formatPrice(deliveryCharge)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-bold text-[#138A55]">Cash on Delivery</span>
              </div>

              <div className="pt-3 border-t border-[#EDE6DA] flex justify-between text-base font-bold text-[#17140F]">
                <span>Estimated Total</span>
                <span className="text-lg font-mono tabular-nums text-[#17140F]">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#D1112B] hover:bg-[#A80D22] text-white py-4 px-6 rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Micro guarantees */}
            <div className="space-y-2 pt-2 text-[11px] text-[#6B645B]">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#138A55]" />
                <span>Express 3-5 days delivery across all Pakistani cities</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A66B]" />
                <span>Inspect your parcel before or upon delivery</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
