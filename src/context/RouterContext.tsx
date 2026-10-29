import React, { createContext, useContext, useEffect, useState } from 'react';
import { PageRoute } from '../types';

interface RouterContextType {
  route: PageRoute;
  navigate: (path: string, options?: { replace?: boolean }) => void;
  currentPath: string;
}

const RouterContext = createContext<RouterContextType | null>(null);

function parsePath(pathname: string, search: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const urlParams = new URLSearchParams(search);

  if (clean === '/' || clean === '') {
    return { name: 'home' };
  }
  if (clean === '/shop') {
    return {
      name: 'shop',
      query: {
        category: urlParams.get('category') || undefined,
        search: urlParams.get('search') || undefined,
        sort: urlParams.get('sort') || undefined,
        size: urlParams.get('size') || undefined,
        color: urlParams.get('color') || undefined,
        minPrice: urlParams.get('minPrice') || undefined,
        maxPrice: urlParams.get('maxPrice') || undefined,
      }
    };
  }
  if (clean.startsWith('/category/')) {
    const slug = decodeURIComponent(clean.replace('/category/', ''));
    return { name: 'category', slug };
  }
  if (clean.startsWith('/product/')) {
    const slug = decodeURIComponent(clean.replace('/product/', ''));
    return { name: 'product', slug };
  }
  if (clean === '/cart') {
    return { name: 'cart' };
  }
  if (clean === '/checkout') {
    return { name: 'checkout' };
  }
  if (clean === '/order-success') {
    return { name: 'order-success', orderNumber: urlParams.get('order') || '' };
  }
  if (clean === '/track-order') {
    return {
      name: 'track-order',
      orderNumber: urlParams.get('order') || undefined,
      phone: urlParams.get('phone') || undefined
    };
  }
  if (clean === '/contact') {
    return { name: 'contact' };
  }
  if (clean === '/about') {
    return { name: 'about' };
  }
  if (clean === '/delivery-policy') {
    return { name: 'delivery-policy' };
  }
  if (clean === '/privacy-policy') {
    return { name: 'privacy-policy' };
  }
  if (clean.startsWith('/admin')) {
    const parts = clean.split('/').filter(Boolean);
    const sub = parts[1] as 'dashboard' | 'products' | 'orders' | 'messages' | 'settings' | 'login' | undefined;
    return { name: 'admin', subView: sub || 'dashboard' };
  }

  return { name: 'not-found' };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname + window.location.search);
  const [route, setRoute] = useState<PageRoute>(() => parsePath(window.location.pathname, window.location.search));

  useEffect(() => {
    const handlePopState = () => {
      const full = window.location.pathname + window.location.search;
      setCurrentPath(full);
      setRoute(parsePath(window.location.pathname, window.location.search));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    const [pathPart, searchPart] = path.split('?');
    setCurrentPath(path);
    setRoute(parsePath(pathPart, searchPart ? `?${searchPart}` : ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ route, navigate, currentPath }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
