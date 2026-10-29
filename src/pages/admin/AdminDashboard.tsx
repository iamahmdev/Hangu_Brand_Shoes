import React from 'react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../utils/format';
import {
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2,
  Phone,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: 'products' | 'orders' | 'messages' | 'settings') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { orders, products } = useStore();

  // Metrics
  const totalSales = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered');

  // Low stock products (total stock across variants <= 5)
  const lowStockProducts = products.filter((p) => {
    const totalVariantStock = p.variants?.reduce((acc, v) => acc + v.stock, 0) ?? 0;
    return totalVariantStock <= 5;
  });

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block mb-1">
          Atelier Performance
        </span>
        <h1 className="font-playfair text-3xl font-bold text-[#17140F]">
          Store Operations Dashboard
        </h1>
        <p className="text-xs text-[#6B645B] mt-1">
          Real-time summary of sales, pending Cash on Delivery orders, and inventory stock.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6B645B]">
            <span>Total Revenue</span>
            <div className="p-2 rounded-xl bg-[#2A1B14] text-[#C9A66B]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#17140F] font-mono tabular-nums">
            {formatPrice(totalSales)}
          </div>
          <div className="text-[11px] text-[#138A55] font-medium">
            Cash on Delivery settlements
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6B645B]">
            <span>Pending Verification</span>
            <div className="p-2 rounded-xl bg-[#D1112B]/10 text-[#D1112B]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#D1112B] font-mono tabular-nums">
            {pendingOrders.length}
          </div>
          <div className="text-[11px] text-[#6B645B]">
            Awaiting phone confirmation
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6B645B]">
            <span>Delivered Parcels</span>
            <div className="p-2 rounded-xl bg-[#138A55]/10 text-[#138A55]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#17140F] font-mono tabular-nums">
            {deliveredOrders.length}
          </div>
          <div className="text-[11px] text-[#138A55]">
            Successful collections
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EDE6DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6B645B]">
            <span>Low Stock Alerts</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 font-mono tabular-nums">
            {lowStockProducts.length}
          </div>
          <div className="text-[11px] text-[#6B645B]">
            Styles below 5 pairs
          </div>
        </div>

      </div>

      {/* Grid: Recent Orders + Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#EDE6DA] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE6DA]">
            <h3 className="font-playfair text-lg font-bold text-[#17140F]">
              Recent Orders
            </h3>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-semibold text-[#C9A66B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F3EC] text-[#6B645B] border-y border-[#EDE6DA]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Order</th>
                  <th className="py-2.5 px-3 font-semibold">Customer</th>
                  <th className="py-2.5 px-3 font-semibold">City</th>
                  <th className="py-2.5 px-3 font-semibold">Total</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE6DA]">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7F3EC]/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#17140F]">
                      {ord.order_number}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-[#17140F]">{ord.customer_name}</div>
                      <div className="text-[11px] text-[#6B645B]">{ord.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-[#17140F]">{ord.city}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#17140F] tabular-nums">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ord.status === 'Pending'
                          ? 'bg-[#D1112B]/15 text-[#D1112B]'
                          : ord.status === 'Confirmed'
                          ? 'bg-[#C9A66B]/20 text-[#2A1B14]'
                          : ord.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-[#138A55]/15 text-[#138A55]'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#EDE6DA] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE6DA]">
            <h3 className="font-playfair text-lg font-bold text-[#17140F] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Low Stock Alerts</span>
            </h3>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs text-[#C9A66B] hover:underline"
            >
              Inventory
            </button>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#6B645B]">
              ✓ All products have sufficient stock.
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.slice(0, 5).map((p) => {
                const totalStock = p.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;
                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-[#F7F3EC] border border-[#EDE6DA] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-[#17140F] truncate">{p.name}</div>
                      <div className="text-[11px] text-[#6B645B]">{p.category}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-[#D1112B]">
                        {totalStock} pairs left
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="p-3 bg-[#2A1B14] rounded-xl text-[#F7F3EC] text-xs space-y-1">
            <div className="font-bold text-[#C9A66B]">Workshop Advice</div>
            <div className="text-[11px] text-[#EDE6DA]/70">
              Update variant stock counts directly in Products tab whenever a new shoe lot arrives from Lahore workshops.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
