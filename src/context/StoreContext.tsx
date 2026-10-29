import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, Order, OrderStatus, ContactMessage, StoreSettings } from '../types';
import { StoreService } from '../services/store';
import { INITIAL_SETTINGS } from '../data/seedProducts';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  messages: ContactMessage[];
  settings: StoreSettings;
  isLoading: boolean;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  sendMessage: (msg: Omit<ContactMessage, 'id' | 'created_at'>) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    StoreService.init();
    loadAll();
  }, []);

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const [p, o, m, s] = await Promise.all([
        StoreService.getProducts(),
        StoreService.getOrders(),
        StoreService.getMessages(),
        StoreService.getSettings()
      ]);
      setProducts(p);
      setOrders(o);
      setMessages(m);
      setSettings(s);
    } catch (err) {
      console.error('Error loading store data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProducts = async () => {
    const p = await StoreService.getProducts();
    setProducts(p);
  };

  const refreshOrders = async () => {
    const o = await StoreService.getOrders();
    setOrders(o);
  };

  const refreshMessages = async () => {
    const m = await StoreService.getMessages();
    setMessages(m);
  };

  const saveProduct = async (product: Product) => {
    await StoreService.saveProduct(product);
    await refreshProducts();
  };

  const deleteProduct = async (id: string) => {
    await StoreService.deleteProduct(id);
    await refreshProducts();
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await StoreService.updateOrderStatus(orderId, status);
    await refreshOrders();
  };

  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    const updated = await StoreService.updateSettings(newSettings);
    setSettings(updated);
  };

  const sendMessage = async (msg: Omit<ContactMessage, 'id' | 'created_at'>) => {
    await StoreService.createMessage(msg);
    await refreshMessages();
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        messages,
        settings,
        isLoading,
        refreshProducts,
        refreshOrders,
        refreshMessages,
        saveProduct,
        deleteProduct,
        updateOrderStatus,
        updateSettings,
        sendMessage
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
