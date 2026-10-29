import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: 'dashboard' | 'products' | 'orders' | 'messages' | 'settings';
  onTabChange: (tab: 'dashboard' | 'products' | 'orders' | 'messages' | 'settings') => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  onLogout,
  children
}) => {
  const { navigate } = useRouter();
  const { orders, messages, settings } = useStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const unreadMessagesCount = messages.filter((m) => !m.is_read).length;

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Overview & Sales',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'products' as const,
      label: 'Products & Inventory',
      icon: Package,
      badge: null
    },
    {
      id: 'orders' as const,
      label: 'Orders & Dispatch',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : null,
      badgeColor: 'bg-[#D1112B]'
    },
    {
      id: 'messages' as const,
      label: 'Inquiries & Messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? String(unreadMessagesCount) : null,
      badgeColor: 'bg-[#C9A66B] text-black'
    },
    {
      id: 'settings' as const,
      label: 'Shop Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EC] flex flex-col lg:flex-row text-[#17140F]">
      
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#0B0B0D] text-[#F7F3EC] p-4 flex items-center justify-between border-b border-[#C9A66B]/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#C9A66B]" />
          <span className="font-playfair font-bold text-base tracking-wide">
            Admin · {settings.shop_name}
          </span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1 text-[#EDE6DA]"
          aria-label="Toggle admin menu"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar: Obsidian with Gold accents */}
      <aside
        className={`lg:w-64 bg-[#0B0B0D] text-[#F7F3EC] flex flex-col justify-between p-6 border-r border-[#C9A66B]/20 fixed lg:static inset-y-0 left-0 z-50 transform lg:transform-none transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          
          {/* Brand Wordmark */}
          <div className="pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C9A66B]" />
              <span className="font-playfair text-xl font-bold tracking-wider text-[#F7F3EC]">
                {settings.shop_name?.toUpperCase() || 'MARKHOR'}
              </span>
            </div>
            <span className="block text-[10px] tracking-[0.2em] uppercase text-[#C9A66B] font-medium mt-1">
              Store Administration
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#2A1B14] text-[#C9A66B] border border-[#C9A66B]/30 shadow-xs'
                      : 'text-[#EDE6DA]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A66B]' : 'text-[#6B645B]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.badgeColor || 'bg-[#D1112B] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-[#C9A66B]/20 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#EDE6DA]/70 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>View Public Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A66B]" />
          </button>

          <button
            onClick={onLogout}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#D1112B] hover:bg-[#D1112B]/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-7xl">
        {children}
      </main>

    </div>
  );
};
