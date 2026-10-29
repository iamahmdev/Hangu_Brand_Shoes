import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminMessages } from './AdminMessages';
import { AdminSettings } from './AdminSettings';
import { SEOHead } from '../../components/common/SEOHead';

export const AdminPage: React.FC<{ initialSubView?: string }> = ({ initialSubView = 'dashboard' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('markhor_admin_auth') === 'true';
  });

  const [currentTab, setCurrentTab] = useState<'dashboard' | 'products' | 'orders' | 'messages' | 'settings'>(
    (initialSubView as any) || 'dashboard'
  );

  useEffect(() => {
    if (initialSubView && ['dashboard', 'products', 'orders', 'messages', 'settings'].includes(initialSubView)) {
      setCurrentTab(initialSubView as any);
    }
  }, [initialSubView]);

  const handleLogout = () => {
    sessionStorage.removeItem('markhor_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEOHead title="Admin Portal Login" description="Sign in to store administration." />
        <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return (
    <>
      <SEOHead title={`Admin - ${currentTab.toUpperCase()}`} description="Store administration portal." />
      <AdminLayout
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        onLogout={handleLogout}
      >
        {currentTab === 'dashboard' && <AdminDashboard onNavigateTab={(t) => setCurrentTab(t)} />}
        {currentTab === 'products' && <AdminProducts />}
        {currentTab === 'orders' && <AdminOrders />}
        {currentTab === 'messages' && <AdminMessages />}
        {currentTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    </>
  );
};
