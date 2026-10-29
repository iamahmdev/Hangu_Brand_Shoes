import React, { useEffect, useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { StoreService } from '../services/store';
import { formatPrice } from '../utils/format';
import { SEOHead } from '../components/common/SEOHead';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Truck,
  MessageCircle,
  ShoppingBag,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

export const OrderSuccessPage: React.FC<{ orderNumber: string }> = ({ orderNumber }) => {
  const { navigate } = useRouter();
  const { settings } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A66B', '#D1112B', '#138A55', '#2A1B14']
      });
    } catch {
      // ignore
    }

    if (!orderNumber) {
      navigate('/', { replace: true });
      return;
    }

    const fetchOrder = async () => {
      const orders = await StoreService.getOrders();
      const match = orders.find((o) => o.order_number.toUpperCase() === orderNumber.toUpperCase());
      setOrder(match || null);
      setLoading(false);
    };

    fetchOrder();
  }, [orderNumber, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6 text-xs text-[#6B645B]">
        Loading order confirmation...
      </div>
    );
  }

  const whatsappConfirmUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Salam! I just placed order *${orderNumber}* on your website for ${order?.customer_name || 'shoes'}. Please confirm my order.`
  )}`;

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-12 sm:py-16">
      <SEOHead title={`Order ${orderNumber} Confirmed`} description="Your footwear order has been successfully placed." />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl border border-[#EDE6DA] shadow-xl p-6 sm:p-10 text-center space-y-6">
          
          {/* Animated checkmark */}
          <div className="w-20 h-20 bg-[#138A55]/10 rounded-full flex items-center justify-center mx-auto text-[#138A55] border-2 border-[#138A55]">
            <CheckCircle className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#138A55] block mb-1">
              Shukriya! Order Placed Successfully
            </span>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#17140F]">
              Order #{orderNumber}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B645B] max-w-md mx-auto mt-2 leading-relaxed">
              We have received your Cash on Delivery order. Our customer experience team will call or message you on WhatsApp to verify your sizing before courier handover.
            </p>
          </div>

          {/* Quick Action: Instant WhatsApp Confirmation */}
          <div className="p-4 rounded-2xl bg-[#138A55]/5 border border-[#138A55]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-[#138A55] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#17140F]">
                  Want priority same-day dispatch?
                </div>
                <div className="text-[11px] text-[#6B645B]">
                  Send your order number on WhatsApp for instant confirmation.
                </div>
              </div>
            </div>

            <a
              href={whatsappConfirmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#138A55] hover:bg-[#0e6940] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>
          </div>

          {/* Order Details Breakdown */}
          {order && (
            <div className="text-left bg-[#F7F3EC] p-5 sm:p-6 rounded-2xl border border-[#EDE6DA] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE6DA] text-xs">
                <span className="font-bold text-[#17140F]">Delivery To:</span>
                <span className="font-semibold text-[#138A55]">Cash on Delivery</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-semibold text-[#17140F]">{order.customer_name}</div>
                  <div className="text-[#6B645B] flex items-center gap-1 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-[#C9A66B]" />
                    <span>{order.phone}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[#6B645B] flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A66B] shrink-0 mt-0.5" />
                    <span>{order.address}, {order.city}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EDE6DA] space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#C9A66B]">
                  Items Ordered
                </div>
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-[#17140F]">{item.name}</span>
                      <span className="text-[#6B645B] ml-2">(Size: EU {item.size}, {item.color}) × {item.qty}</span>
                    </div>
                    <span className="font-mono font-semibold text-[#17140F] tabular-nums">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EDE6DA] flex justify-between text-sm font-bold text-[#17140F]">
                <span>Total Amount Due on Delivery</span>
                <span className="text-base font-mono tabular-nums text-[#D1112B]">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          )}

          {/* Action Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/shop')}
              className="w-full sm:w-auto bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#C9A66B]" />
              <span>Continue Shopping</span>
            </button>

            <button
              onClick={() => navigate(`/track-order?order=${orderNumber}&phone=${order?.phone || ''}`)}
              className="w-full sm:w-auto bg-[#EDE6DA] hover:bg-[#D8CEBE] text-[#17140F] text-xs font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-[#C9A66B]" />
              <span>Track This Order</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
