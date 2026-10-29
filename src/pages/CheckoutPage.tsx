import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { StoreService } from '../services/store';
import { PAKISTAN_CITIES } from '../data/seedProducts';
import { formatPrice } from '../utils/format';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import {
  Truck,
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, deliveryCharge, total, clearCart } = useCart();
  const { navigate } = useRouter();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(PAKISTAN_CITIES[0]);
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Promo coupon discount
  const [couponInput, setCouponInput] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');

  const handleApplyCoupon = (codeToApply?: string) => {
    setCouponError('');
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    if (code === 'HANGU20' || code === 'MARKHOR20') {
      const discount = Math.round(subtotal * 0.20);
      setCouponDiscount(discount);
      setAppliedCoupon(code);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try HANGU20 for 20% off.');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon('');
    setCouponError('');
  };

  const finalPayableTotal = Math.max(0, subtotal - couponDiscount + deliveryCharge);

  if (items.length === 0) {
    return (
      <div className="bg-[#F7F3EC] min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-playfair text-2xl font-bold text-[#17140F] mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-[#6B645B] mb-6">
          Please add a pair of shoes to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#0B0B0D] text-white text-xs font-semibold px-6 py-3 rounded-xl cursor-pointer"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Pakistani phone validation: 03XX-XXXXXXX or 03XXXXXXXXX (11 digits starting with 03)
  const validatePhone = (val: string): boolean => {
    const clean = val.replace(/[^0-9]/g, '');
    return clean.length === 11 && clean.startsWith('03');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!validatePhone(phone)) {
      setErrorMessage('Please enter a valid 11-digit Pakistani mobile number (e.g., 03001234567 or 0321-9876543).');
      return;
    }

    if (!address.trim() || address.trim().length < 10) {
      setErrorMessage('Please provide a complete delivery address (House/Shop #, Street, Area/Sector).');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = items.map((i) => ({
        product_id: i.product_id,
        name: i.product.name,
        size: i.size,
        color: i.color,
        qty: i.qty,
        price: i.price,
        image: (i.product.images[0] || '').replace('/src/assets/images/', '/images/')
      }));

      const orderNote = [
        note.trim(),
        appliedCoupon ? `Promo Coupon: ${appliedCoupon} (-${formatPrice(couponDiscount)})` : ''
      ]
        .filter(Boolean)
        .join(' | ');

      const newOrder = await StoreService.createOrder({
        customer_name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city,
        address: address.trim(),
        note: orderNote,
        subtotal,
        delivery_charge: deliveryCharge,
        total: finalPayableTotal,
        items: orderItems
      });

      // Clear local cart
      clearCart();

      // Navigate to order success page
      navigate(`/order-success?order=${newOrder.order_number}`);
    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrorMessage(err?.message || 'Failed to submit order. Please try again or order on WhatsApp.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-14">
      <SEOHead title="Checkout" description="Complete your Cash on Delivery footwear order." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <SectionHeading
            kicker="FAST &amp; SECURE CHECKOUT"
            title="Complete Your Order"
            subtitle="Pay upon delivery anywhere in Pakistan. No advance online payment required."
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Customer Information & Delivery Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6DA] shadow-xs">
            
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EDE6DA]">
                  <span className="w-6 h-6 rounded-full bg-[#0B0B0D] text-[#C9A66B] flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-[#17140F]">
                    Contact &amp; Recipient Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#17140F]">
                      Full Name <span className="text-[#D1112B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Usman Farooq"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-3 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#17140F]">
                      Mobile Phone (03XX-XXXXXXX) <span className="text-[#D1112B]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 03001234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-3 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                    />
                    <span className="text-[10px] text-[#6B645B] block">
                      Our courier will send SMS &amp; call on this number
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#17140F]">
                    Email Address <span className="text-gray-400 font-normal">(Optional for tracking receipts)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. usman@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-3 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EDE6DA]">
                  <span className="w-6 h-6 rounded-full bg-[#0B0B0D] text-[#C9A66B] flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-[#17140F]">
                    Delivery Address in Pakistan
                  </h3>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#17140F]">
                    City <span className="text-[#D1112B]">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-3 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B] cursor-pointer"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#17140F]">
                    Complete Street Address <span className="text-[#D1112B]">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="House / Apartment number, Street name, Sector / Block / Phase, Landmark..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-3 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#17140F]">
                    Special Delivery Instructions <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please call before arriving or deliver after 3 PM"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2.5 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EDE6DA]">
                  <span className="w-6 h-6 rounded-full bg-[#0B0B0D] text-[#C9A66B] flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-[#17140F]">
                    Payment Method
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Cash on Delivery (Active) */}
                  <label className="flex items-center justify-between p-4 rounded-xl border-2 border-[#138A55] bg-[#138A55]/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#138A55] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#138A55]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#17140F] flex items-center gap-2">
                          <span>Cash on Delivery (COD)</span>
                          <span className="text-[10px] bg-[#138A55] text-white px-2 py-0.5 rounded-full font-medium">
                            RECOMMENDED
                          </span>
                        </div>
                        <div className="text-[11px] text-[#6B645B] mt-0.5">
                          Pay cash to the courier rider upon parcel receipt
                        </div>
                      </div>
                    </div>
                    <Truck className="w-5 h-5 text-[#138A55]" />
                  </label>

                  {/* JazzCash / Easypaisa (Disabled coming soon) */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border border-gray-300" />
                      <div>
                        <div className="text-xs font-bold text-gray-500">
                          JazzCash / Easypaisa Online Gateway
                        </div>
                        <div className="text-[10px] text-gray-400">
                          Instant mobile wallet checkout
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                      COMING SOON
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Box */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-[#D1112B]/10 border border-[#D1112B]/30 text-xs text-[#D1112B] font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D1112B] hover:bg-[#A80D22] disabled:bg-gray-400 text-white py-4 px-6 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm Order (Pay {formatPrice(finalPayableTotal)} on Delivery)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-[#6B645B]">
                By placing your order, you agree to our 7-Day Size Exchange policy.
              </div>

            </form>

          </div>

          {/* Right: Sticky Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6DA] shadow-xs space-y-6 sticky top-28">
            <h3 className="font-playfair text-xl font-bold text-[#17140F] pb-3 border-b border-[#EDE6DA]">
              Your Shoe Order
            </h3>

            <div className="space-y-3 divide-y divide-[#EDE6DA]">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={(item.product.images[0] || '').replace('/src/assets/images/', '/images/')}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-lg bg-[#EDE6DA] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#17140F] truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-[#6B645B]">
                      Size: EU {item.size} · {item.color} · Qty: {item.qty}
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#17140F] tabular-nums">
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-3 border-t border-[#EDE6DA] space-y-2">
              <label className="text-[11px] font-bold text-[#17140F] uppercase tracking-wider block">
                Discount Coupon
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#138A55]/10 border border-[#138A55]/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#138A55]" />
                    <div>
                      <span className="text-xs font-bold text-[#138A55] tracking-wider">{appliedCoupon}</span>
                      <span className="text-[11px] text-[#138A55] ml-2">(-{formatPrice(couponDiscount)} applied)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-[11px] text-[#D1112B] hover:underline font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. HANGU20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-3 py-2 text-xs text-[#17140F] uppercase font-mono tracking-wider focus:outline-none focus:border-[#C9A66B]"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon()}
                      className="bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#C9A66B] px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon('HANGU20')}
                    className="text-[10px] text-[#138A55] hover:underline font-semibold cursor-pointer block text-left"
                  >
                    💡 Have code <span className="font-bold underline">HANGU20</span>? Tap to apply 20% discount
                  </button>
                  {couponError && (
                    <span className="text-[10px] text-[#D1112B] font-semibold block">{couponError}</span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-4 border-t border-[#EDE6DA] text-xs text-[#6B645B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#17140F] font-mono tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#138A55]">
                  <span>Promo Discount ({appliedCoupon})</span>
                  <span className="font-semibold font-mono tabular-nums">
                    -{formatPrice(couponDiscount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-semibold font-mono tabular-nums">
                  {deliveryCharge === 0 ? (
                    <span className="text-[#138A55] font-bold">FREE</span>
                  ) : (
                    formatPrice(deliveryCharge)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#17140F] pt-2 border-t border-[#EDE6DA]">
                <span>Total Payable</span>
                <span className="text-lg font-mono tabular-nums text-[#0B0B0D]">
                  {formatPrice(finalPayableTotal)}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F3EC] border border-[#EDE6DA] text-xs space-y-1.5">
              <div className="font-bold text-[#17140F] flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#138A55]" />
                <span>Verification Phone Call</span>
              </div>
              <p className="text-[#6B645B] text-[11px] leading-relaxed">
                After order submission, our customer care representative will call or WhatsApp you within 2-4 hours to confirm your size and address before dispatch.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
