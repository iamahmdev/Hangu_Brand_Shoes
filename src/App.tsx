/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { DeliveryPolicyPage } from './pages/DeliveryPolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/admin/AdminPage';

const AppContent: React.FC = () => {
  const { route } = useRouter();

  // If currently in Admin view, render isolated admin portal layout
  if (route.name === 'admin') {
    return <AdminPage initialSubView={route.subView} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#17140F]">
      <Header />

      <main className="flex-1">
        {route.name === 'home' && <HomePage />}
        {route.name === 'shop' && <ShopPage />}
        {route.name === 'category' && <CategoryPage slug={route.slug} />}
        {route.name === 'product' && <ProductDetailPage slug={route.slug} />}
        {route.name === 'cart' && <CartPage />}
        {route.name === 'checkout' && <CheckoutPage />}
        {route.name === 'order-success' && <OrderSuccessPage orderNumber={route.orderNumber} />}
        {route.name === 'track-order' && (
          <TrackOrderPage initialOrder={route.orderNumber} initialPhone={route.phone} />
        )}
        {route.name === 'contact' && <ContactPage />}
        {route.name === 'about' && <AboutPage />}
        {route.name === 'delivery-policy' && <DeliveryPolicyPage />}
        {route.name === 'privacy-policy' && <PrivacyPolicyPage />}
        {route.name === 'not-found' && <NotFoundPage />}
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </CartProvider>
    </StoreProvider>
  );
}
