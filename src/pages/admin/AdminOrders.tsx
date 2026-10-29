import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { formatPrice } from '../../utils/format';
import {
  Search,
  Filter,
  MessageCircle,
  Printer,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  X,
  Phone,
  MapPin
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, settings } = useStore();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.order_number.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const openWhatsAppCustomer = (ord: Order) => {
    const cleanDigits = ord.phone.replace(/[^0-9]/g, '');
    const intlPhone = cleanDigits.startsWith('92') ? cleanDigits : `92${cleanDigits.replace(/^0/, '')}`;
    const message = `Salam ${ord.customer_name}! This is from ${settings.shop_name} regarding your order *${ord.order_number}* for ${ord.items.map((i) => i.name).join(', ')}. Your total payable on delivery is ${formatPrice(ord.total)}. Please confirm if your shipping address at ${ord.address}, ${ord.city} is accurate so we can dispatch via express courier today.`;
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePrintSlip = (ord: Order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Dispatch Slip - ${ord.order_number}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #111; max-width: 600px; margin: 0 auto; }
            .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
            .shop-title { font-size: 20px; font-weight: bold; }
            .badge { background: #000; color: #fff; padding: 4px 8px; font-size: 12px; font-weight: bold; border-radius: 4px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; font-size: 13px; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f5f5f5; }
            .total-row { font-size: 16px; font-weight: bold; margin-top: 16px; text-align: right; }
            .cod-box { border: 2px dashed #000; padding: 12px; text-align: center; margin-top: 20px; font-weight: bold; font-size: 16px; background: #fafafa; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="shop-title">${settings.shop_name.toUpperCase()}</div>
              <div style="font-size: 12px; color: #666;">Lahore Atelier · Courier Consignment Slip</div>
            </div>
            <div class="badge">CASH ON DELIVERY</div>
          </div>

          <div class="grid">
            <div>
              <strong>CONSIGNEE DETAILS:</strong><br/>
              <strong>${ord.customer_name}</strong><br/>
              Phone: ${ord.phone}<br/>
              Address: ${ord.address}<br/>
              City: <strong>${ord.city}</strong>
            </div>
            <div>
              <strong>ORDER INFO:</strong><br/>
              Order #: <strong>${ord.order_number}</strong><br/>
              Date: ${new Date(ord.created_at).toLocaleDateString()}<br/>
              Status: ${ord.status}<br/>
              Notes: ${ord.note || 'None'}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Shoe Model</th>
                <th>Size</th>
                <th>Color</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${ord.items
                .map(
                  (i) => `
                <tr>
                  <td>${i.name}</td>
                  <td>EU ${i.size}</td>
                  <td>${i.color}</td>
                  <td>${i.qty}</td>
                  <td>${formatPrice(i.price * i.qty)}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div class="total-row">
            Delivery: ${ord.delivery_charge === 0 ? 'FREE' : formatPrice(ord.delivery_charge)} | Total COD: ${formatPrice(ord.total)}
          </div>

          <div class="cod-box">
            AMOUNT TO COLLECT: ${formatPrice(ord.total)} (Cash on Delivery)
          </div>

          <div style="margin-top: 30px; font-size: 11px; text-align: center; color: #888;">
            Dispatch from: ${settings.address} · Helpline: ${settings.phone}
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block mb-1">
            Dispatch &amp; Fulfillment
          </span>
          <h1 className="font-playfair text-3xl font-bold text-[#17140F]">
            Customer Orders
          </h1>
          <p className="text-xs text-[#6B645B] mt-0.5">
            Confirm customer details, WhatsApp consignees, update shipment stages, and print courier slips.
          </p>
        </div>

        <div className="text-xs font-mono text-[#6B645B] bg-white px-4 py-2 rounded-xl border border-[#EDE6DA]">
          Total: <strong>{filteredOrders.length}</strong> orders
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EDE6DA] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by Order #, customer name, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F7F3EC] border border-[#EDE6DA] rounded-xl px-4 py-2 pl-9 text-xs focus:outline-none focus:border-[#C9A66B]"
          />
          <Search className="w-4 h-4 text-[#C9A66B] absolute left-3 top-2.5" />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#0B0B0D] text-[#C9A66B]'
                : 'bg-[#F7F3EC] text-[#6B645B] hover:text-[#17140F]'
            }`}
          >
            All
          </button>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#0B0B0D] text-[#C9A66B]'
                  : 'bg-[#F7F3EC] text-[#6B645B] hover:text-[#17140F]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#EDE6DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0B0D] text-[#F7F3EC]">
              <tr>
                <th className="py-3 px-4 font-semibold text-[#C9A66B]">Order #</th>
                <th className="py-3 px-4 font-semibold">Customer &amp; City</th>
                <th className="py-3 px-4 font-semibold">Items</th>
                <th className="py-3 px-4 font-semibold">COD Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE6DA]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-xs text-[#6B645B]">
                    No orders found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7F3EC]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#17140F]">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="hover:underline text-left"
                      >
                        {ord.order_number}
                      </button>
                      <div className="text-[10px] text-[#6B645B] font-sans font-normal">
                        {new Date(ord.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#17140F]">{ord.customer_name}</div>
                      <div className="text-[11px] text-[#6B645B]">{ord.phone}</div>
                      <div className="text-[11px] text-[#C9A66B] font-medium">{ord.city}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      {ord.items?.map((it, idx) => (
                        <div key={idx} className="truncate">
                          <span className="font-semibold text-[#17140F]">{it.name}</span>
                          <span className="text-[#6B645B] text-[10px] ml-1">
                            (EU {it.size}, {it.color})
                          </span>
                        </div>
                      ))}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-[#17140F] tabular-nums">
                      {formatPrice(ord.total)}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                          ord.status === 'Pending'
                            ? 'bg-[#D1112B]/10 text-[#D1112B] border-[#D1112B]/30'
                            : ord.status === 'Confirmed'
                            ? 'bg-[#C9A66B]/20 text-[#2A1B14] border-[#C9A66B]/40'
                            : ord.status === 'Shipped'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : ord.status === 'Delivered'
                            ? 'bg-[#138A55]/15 text-[#138A55] border-[#138A55]/30'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Customer */}
                        <button
                          onClick={() => openWhatsAppCustomer(ord)}
                          className="p-1.5 text-white bg-[#138A55] hover:bg-[#0e6940] rounded-lg transition-colors cursor-pointer"
                          title="WhatsApp Customer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>

                        {/* Print Slip */}
                        <button
                          onClick={() => handlePrintSlip(ord)}
                          className="p-1.5 text-[#17140F] bg-[#EDE6DA] hover:bg-[#D8CEBE] rounded-lg transition-colors cursor-pointer"
                          title="Print Courier Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 text-[#17140F] hover:text-[#C9A66B] hover:bg-[#EDE6DA] rounded-lg transition-colors cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE6DA] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-1 text-[#6B645B] hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block mb-1">
              Order Specification
            </span>
            <h2 className="font-playfair text-2xl font-bold text-[#17140F]">
              {selectedOrder.order_number}
            </h2>
            <div className="w-8 h-[2px] bg-[#C9A66B] mt-2 mb-4" />

            <div className="space-y-4 text-xs">
              
              {/* Consignee */}
              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#EDE6DA] space-y-1.5">
                <div className="font-bold text-sm text-[#17140F]">{selectedOrder.customer_name}</div>
                <div className="text-[#6B645B] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C9A66B]" />
                  <span>{selectedOrder.phone}</span>
                </div>
                <div className="text-[#6B645B] flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A66B] shrink-0 mt-0.5" />
                  <span>{selectedOrder.address}, {selectedOrder.city}</span>
                </div>
                {selectedOrder.note && (
                  <div className="pt-2 text-[11px] text-[#2A1B14] italic">
                    Note: &ldquo;{selectedOrder.note}&rdquo;
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="space-y-2">
                <div className="font-bold text-[#17140F]">Purchased Pairs</div>
                <div className="divide-y divide-[#EDE6DA] border border-[#EDE6DA] rounded-xl overflow-hidden">
                  {selectedOrder.items?.map((it, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between bg-white">
                      <div>
                        <div className="font-bold text-[#17140F]">{it.name}</div>
                        <div className="text-[11px] text-[#6B645B]">
                          Size: EU {it.size} · Color: {it.color} · Qty: {it.qty}
                        </div>
                      </div>
                      <div className="font-mono font-bold text-[#17140F] tabular-nums">
                        {formatPrice(it.price * it.qty)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial summary */}
              <div className="p-4 rounded-xl bg-[#F7F3EC] border border-[#EDE6DA] space-y-1.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-mono font-semibold">
                    {selectedOrder.delivery_charge === 0 ? 'FREE' : formatPrice(selectedOrder.delivery_charge)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#17140F] pt-2 border-t border-[#EDE6DA]">
                  <span>Total Due on Delivery</span>
                  <span className="text-base text-[#D1112B] font-mono">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-[#17140F]">Change Order Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                  className="bg-white border border-[#EDE6DA] rounded-xl px-3 py-2 font-bold text-xs"
                >
                  {statuses.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => openWhatsAppCustomer(selectedOrder)}
                  className="flex-1 bg-[#138A55] hover:bg-[#0e6940] text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Consignee</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePrintSlip(selectedOrder)}
                  className="bg-[#0B0B0D] hover:bg-[#2A1B14] text-[#F7F3EC] py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
