import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';
import { useStore } from './StoreContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: number, color: string, qty?: number) => boolean;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  itemCount: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CART_STORAGE_KEY = 'markhor_cart_items_v1';

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useStore();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product: Product, size: number, color: string, qty = 1): boolean => {
    // Check variant stock
    const variant = product.variants?.find((v) => v.size === size && v.color.toLowerCase() === color.toLowerCase());
    const availableStock = variant ? variant.stock : 10;

    const itemId = `${product.id}_${size}_${color}`;
    const existingIndex = items.findIndex((i) => i.id === itemId);

    if (existingIndex > -1) {
      const currentQty = items[existingIndex].qty;
      if (currentQty + qty > availableStock) {
        return false;
      }
      const updated = [...items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        qty: currentQty + qty
      };
      setItems(updated);
    } else {
      if (qty > availableStock) return false;
      const newItem: CartItem = {
        id: itemId,
        product_id: product.id,
        product,
        size,
        color,
        qty,
        price: product.price
      };
      setItems([...items, newItem]);
    }
    setIsCartOpen(true);
    return true;
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const variant = item.product.variants?.find((v) => v.size === item.size && v.color.toLowerCase() === item.color.toLowerCase());
          const maxStock = variant ? variant.stock : 10;
          return { ...item, qty: Math.min(qty, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeDeliveryThreshold = settings.free_delivery_above || 5000;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold && subtotal > 0;
  const deliveryCharge = items.length === 0 ? 0 : isFreeDelivery ? 0 : (settings.delivery_charge || 200);
  const total = subtotal + deliveryCharge;
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryCharge,
        total,
        itemCount,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
