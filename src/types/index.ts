export type CategoryType = 
  | 'Formal' 
  | 'Loafers' 
  | 'Casual (Slip-ons)' 
  | 'Sneakers'
  | 'Peshawari Chappal'
  | 'Brogues & Boots';

export interface ProductVariant {
  id?: string;
  product_id?: string;
  size: number; // 40, 41, 42, 43, 44, 45
  color: string; // Black, Deep Brown, Tan, Navy, Beige
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: CategoryType;
  price: number;
  old_price?: number;
  description: string;
  material: string;
  images: string[];
  is_featured: boolean;
  is_new_arrival: boolean;
  is_active: boolean;
  created_at?: string;
  variants: ProductVariant[];
  rating?: number;
  reviews_count?: number;
  occasion?: 'Wedding' | 'Office' | 'Casual' | 'Festive' | 'Travel';
}

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  size: number;
  color: string;
  qty: number;
  price: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  name: string;
  size: number;
  color: string;
  qty: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  note?: string;
  subtotal: number;
  delivery_charge: number;
  total: number;
  payment_method: 'Cash on Delivery';
  status: OrderStatus;
  created_at: string;
  items: OrderItem[];
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  created_at: string;
  is_read?: boolean;
}

export interface StoreSettings {
  shop_name: string;
  city: string;
  phone: string;
  whatsapp: string;
  address: string;
  opening_hours: string;
  delivery_charge: number;
  free_delivery_above: number;
  announcement_text: string;
}

export type PageRoute = 
  | { name: 'home' }
  | { name: 'shop'; query?: { category?: string; search?: string; sort?: string; size?: string; color?: string; minPrice?: string; maxPrice?: string; occasion?: string } }
  | { name: 'category'; slug: string }
  | { name: 'product'; slug: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'order-success'; orderNumber: string }
  | { name: 'track-order'; orderNumber?: string; phone?: string }
  | { name: 'contact' }
  | { name: 'about' }
  | { name: 'delivery-policy' }
  | { name: 'privacy-policy' }
  | { name: 'admin'; subView?: 'dashboard' | 'products' | 'orders' | 'messages' | 'settings' | 'login' }
  | { name: 'not-found' };
