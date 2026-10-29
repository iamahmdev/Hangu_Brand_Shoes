import React, { useState, useEffect } from 'react';
import { StoreService } from '../services/store';
import { Order, OrderStatus } from '../types';
import { formatPrice } from '../utils/format';
import { SectionHeading } from '../components/common/SectionHeading';
import { SEOHead } from '../components/common/SEOHead';
import { useStore } from '../context/StoreContext';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

export const TrackOrderPage: React.FC<{ initialOrder?: string; initialPhone?: string }> = ({
  initialOrder = '',
  initialPhone = ''
}) => {
  const { settings } = useStore();
  const [orderNumber, setOrderNumber] = useState(initialOrder);
  const [phone, setPhone] = useState(initialPhone);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialOrder && initialPhone) {
      handleSearch();
    }
  }, [initialOrder, initialPhone]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!orderNumber.trim()) {
      setErrorMessage('Please enter your order number (e.g. ORD-100245).');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const order = await StoreService.findOrderByNumberAndPhone(orderNumber, phone);
      setSearchedOrder(order);
      if (!order) {
        setErrorMessage('No order found matching these details. Please double-check your Order Number or phone.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to search order. Please contact our WhatsApp support.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStepStatus = (status: OrderStatus) => {
    const steps: { label: string; desc: string; done: boolean; active: boolean }[] = [
      {
        label: 'Order Placed',
        desc: 'Received in our system',
        done: true,
        active: status === 'Pending'
      },
      {
        label: 'Confirmed',
        desc: 'Size & phone verified by team',
        done: ['Confirmed', 'Shipped', 'Delivered'].includes(status),
        active: status === 'Confirmed'
      },
      {
        label: 'Shipped via Courier',
        desc: 'Handed to TCS / Leopards Express',
        done: ['Shipped', 'Delivered'].includes(status),
        active: status === 'Shipped'
      },
      {
        label: 'Delivered',
        desc: 'Delivered & Cash Collected',
        done: status === 'Delivered',
        active: status === 'Delivered'
      }
    ];
    return steps;
  };

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10 sm:py-16">
      <SEOHead title="Track Order Status" description="Check live courier and dispatch status of your shoe order." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="LIVE SHIPMENT STATUS"
          title="Track Your Parcel"
          subtitle="Enter your Order Number and phone number to see real-time dispatch progress."
        />

        {/* Tracking Search Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6DA] shadow-xs mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6 space-y-1">
              <label className="text-xs font-semibold text-[#17140F]">
                Order Number <span className="text-[#D1112B]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ORD-100241"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-3 text-xs uppercase font-mono font-bold text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
              />
            </div>

            <div className="sm:col-span-4 space-y-1">
              <label className="text-xs font-semibold text-[#17140F]">
                Phone Number (Last 7 Digits or Full)
              </label>
              <input
                type="tel"
                placeholder="e.g. 03014529811"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-3 text-xs text-[#17140F] focus:outline-none focus:border-[#C9A66B]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] py-3.5 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#C9A66B]" />
                <span>Track</span>
              </button>
            </div>
          </form>

          {errorMessage && (
            <div className="mt-4 p-3 bg-[#D1112B]/10 border border-[#D1112B]/30 rounded-xl text-xs text-[#D1112B] font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Search Results Display */}
        {searchedOrder && (
          <div className="bg-white rounded-2xl border border-[#EDE6DA] p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EDE6DA]">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C9A66B] font-bold">
                  Order Details
                </span>
                <h3 className="font-playfair text-2xl font-bold text-[#17140F]">
                  {searchedOrder.order_number}
                </h3>
                <div className="text-xs text-[#6B645B] mt-0.5">
                  Placed on {new Date(searchedOrder.created_at).toLocaleDateString('en-PK', { dateStyle: 'medium' })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#6B645B]">Current Status:</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  searchedOrder.status === 'Delivered'
                    ? 'bg-[#138A55]/15 text-[#138A55] border border-[#138A55]/30'
                    : searchedOrder.status === 'Shipped'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-[#C9A66B]/20 text-[#2A1B14] border border-[#C9A66B]/40'
                }`}>
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#17140F] mb-6">
                Shipment Progress
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {getStepStatus(searchedOrder.status).map((step, idx) => (
                  <div key={idx} className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      step.done
                        ? 'bg-[#138A55] text-white shadow-sm'
                        : 'bg-[#EDE6DA] text-[#6B645B]'
                    }`}>
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${step.done ? 'text-[#17140F]' : 'text-[#6B645B]'}`}>
                        {step.label}
                      </div>
                      <div className="text-[11px] text-[#6B645B]">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items & Recipient Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#EDE6DA] text-xs">
              <div className="space-y-2">
                <h5 className="font-bold uppercase tracking-wider text-[#C9A66B]">
                  Consignee Details
                </h5>
                <div className="font-semibold text-[#17140F]">{searchedOrder.customer_name}</div>
                <div className="text-[#6B645B]">{searchedOrder.phone}</div>
                <div className="text-[#6B645B]">{searchedOrder.address}, {searchedOrder.city}</div>
                <div className="text-[#138A55] font-semibold">Payment: Cash on Delivery ({formatPrice(searchedOrder.total)})</div>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold uppercase tracking-wider text-[#C9A66B]">
                  Ordered Footwear
                </h5>
                <div className="space-y-1.5 divide-y divide-[#EDE6DA]">
                  {searchedOrder.items?.map((it, i) => (
                    <div key={i} className="pt-1.5 first:pt-0 flex justify-between">
                      <div>
                        <strong className="text-[#17140F]">{it.name}</strong>
                        <div className="text-[11px] text-[#6B645B]">Size: EU {it.size} · {it.color} · Qty {it.qty}</div>
                      </div>
                      <span className="font-mono tabular-nums text-[#17140F] font-bold">
                        {formatPrice(it.price * it.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp Assistance */}
            <div className="pt-4 border-t border-[#EDE6DA] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F7F3EC] p-4 rounded-xl">
              <span className="text-xs text-[#6B645B]">
                Need to change your size or delivery address? Contact our dispatch desk.
              </span>
              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                  `Salam, I am checking status of my order *${searchedOrder.order_number}*.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#138A55] hover:bg-[#0e6940] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Dispatch</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
