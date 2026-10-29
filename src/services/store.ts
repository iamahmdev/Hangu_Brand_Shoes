import { Product, Order, OrderStatus, ContactMessage, StoreSettings, OrderItem, ProductVariant } from '../types';
import { SEED_PRODUCTS, INITIAL_SETTINGS } from '../data/seedProducts';
import { supabase, isSupabaseConfigured } from './supabase';

const PRODUCTS_STORAGE_KEY = 'hangu_products_v3';
const ORDERS_STORAGE_KEY = 'hangu_orders_v3';
const MESSAGES_STORAGE_KEY = 'hangu_messages_v3';
const SETTINGS_STORAGE_KEY = 'hangu_settings_v3';

// Seed sample orders for realistic Pakistani retail feel
const SEED_ORDERS: Order[] = [
  {
    id: 'ord-100241',
    order_number: 'ORD-100241',
    customer_name: 'Bilal Tariq',
    phone: '03014529811',
    email: 'bilal.tariq@gmail.com',
    city: 'Lahore',
    address: 'House #42, Street 7, Phase 5 DHA, Lahore',
    note: 'Please deliver after 4 PM',
    subtotal: 8950,
    delivery_charge: 0,
    total: 8950,
    payment_method: 'Cash on Delivery',
    status: 'Delivered',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    items: [
      {
        product_id: 'prod-01',
        name: 'The Sovereign Wholecut Oxford',
        size: 42,
        color: 'Black',
        qty: 1,
        price: 8950,
        image: '/images/category_formal_oxford_1793279534927.jpg'
      }
    ]
  },
  {
    id: 'ord-100242',
    order_number: 'ORD-100242',
    customer_name: 'Usman Farooq',
    phone: '03332190884',
    email: 'usman.f@hotmail.com',
    city: 'Karachi',
    address: 'Apartment 4B, Clifton Block 4, Karachi',
    note: 'Call before delivery',
    subtotal: 6850,
    delivery_charge: 0,
    total: 6850,
    payment_method: 'Cash on Delivery',
    status: 'Shipped',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        product_id: 'prod-04',
        name: 'Riviera Artisan Penny Loafer',
        size: 43,
        color: 'Tan',
        qty: 1,
        price: 6850,
        image: '/images/category_loafers_leather_1793279536094.jpg'
      }
    ]
  },
  {
    id: 'ord-100243',
    order_number: 'ORD-100243',
    customer_name: 'Hamza Sheikh',
    phone: '03215543219',
    email: 'hamza.sheikh@live.com',
    city: 'Islamabad',
    address: 'House 18, Street 14, Sector F-7/2, Islamabad',
    note: '',
    subtotal: 4950,
    delivery_charge: 200,
    total: 5150,
    payment_method: 'Cash on Delivery',
    status: 'Confirmed',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        product_id: 'prod-07',
        name: 'Amalfi Leather Driving Moccasin',
        size: 42,
        color: 'Deep Brown',
        qty: 1,
        price: 4950,
        image: '/images/category_casual_slipon_1793279537181.jpg'
      }
    ]
  },
  {
    id: 'ord-100244',
    order_number: 'ORD-100244',
    customer_name: 'Zaryab Khan',
    phone: '03459102834',
    email: 'zaryab.k@yahoo.com',
    city: 'Peshawar',
    address: 'University Town, Circular Road, Peshawar',
    note: 'Please bring exact change',
    subtotal: 5950,
    delivery_charge: 0,
    total: 5950,
    payment_method: 'Cash on Delivery',
    status: 'Pending',
    created_at: new Date().toISOString(),
    items: [
      {
        product_id: 'prod-10',
        name: 'The Grand Court Leather Sneaker',
        size: 41,
        color: 'Beige',
        qty: 1,
        price: 5950,
        image: '/images/category_sneakers_leather_1793279535993.jpg'
      }
    ]
  }
];

const SEED_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-01',
    name: 'Dr. Tariq Mahmood',
    phone: '03009876543',
    email: 'tariq.m@gmail.com',
    subject: 'Custom Size 46 Inquiry',
    message: 'Salam, do you manufacture Oxford wholecuts in Size 46 or custom widths? I have slightly wider feet.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    is_read: true
  },
  {
    id: 'msg-02',
    name: 'Ali Raza',
    phone: '03224411990',
    email: 'ali.raza@outlook.com',
    subject: 'Store Visit Lahore MM Alam',
    message: 'Can I try sizes in person at the MM Alam store today around 7 PM?',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    is_read: false
  }
];

// Helper to get local storage item safely
function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Local storage write error:', err);
  }
}

export class StoreService {
  // Initialize local data if empty
  static init(): void {
    // Self-healing migration for Vercel/production: replace any legacy /src/assets/images with /images
    try {
      const storedProds = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (storedProds && storedProds.includes('/src/assets/images/')) {
        localStorage.setItem(
          PRODUCTS_STORAGE_KEY,
          storedProds.split('/src/assets/images/').join('/images/')
        );
      }
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders && storedOrders.includes('/src/assets/images/')) {
        localStorage.setItem(
          ORDERS_STORAGE_KEY,
          storedOrders.split('/src/assets/images/').join('/images/')
        );
      }
    } catch (e) {
      console.warn('Path migration error:', e);
    }

    if (!localStorage.getItem(PRODUCTS_STORAGE_KEY)) {
      setLocal(PRODUCTS_STORAGE_KEY, SEED_PRODUCTS);
    }
    if (!localStorage.getItem(ORDERS_STORAGE_KEY)) {
      setLocal(ORDERS_STORAGE_KEY, SEED_ORDERS);
    }
    if (!localStorage.getItem(MESSAGES_STORAGE_KEY)) {
      setLocal(MESSAGES_STORAGE_KEY, SEED_MESSAGES);
    }
    if (!localStorage.getItem(SETTINGS_STORAGE_KEY)) {
      setLocal(SETTINGS_STORAGE_KEY, INITIAL_SETTINGS);
    }
  }

  // --- PRODUCTS ---
  static async getProducts(): Promise<Product[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: prodData, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!prodErr && prodData && prodData.length > 0) {
          // Fetch variants for all products
          const { data: variantData } = await supabase.from('product_variants').select('*');
          return prodData.map((p) => ({
            ...p,
            variants: variantData ? variantData.filter((v) => v.product_id === p.id) : []
          }));
        }
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to local storage', e);
      }
    }
    return getLocal<Product[]>(PRODUCTS_STORAGE_KEY, SEED_PRODUCTS);
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find((p) => p.slug === slug && p.is_active) || null;
  }

  static async saveProduct(product: Product): Promise<Product> {
    const products = getLocal<Product[]>(PRODUCTS_STORAGE_KEY, SEED_PRODUCTS);
    const existingIndex = products.findIndex((p) => p.id === product.id);
    let updatedProducts: Product[];

    if (existingIndex >= 0) {
      updatedProducts = [...products];
      updatedProducts[existingIndex] = product;
    } else {
      updatedProducts = [product, ...products];
    }
    setLocal(PRODUCTS_STORAGE_KEY, updatedProducts);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').upsert({
          id: product.id,
          name: product.name,
          slug: product.slug,
          brand: product.brand,
          category: product.category,
          price: product.price,
          old_price: product.old_price,
          description: product.description,
          material: product.material,
          images: product.images,
          is_featured: product.is_featured,
          is_new_arrival: product.is_new_arrival,
          is_active: product.is_active
        });

        // Insert variants
        if (product.variants?.length) {
          await supabase.from('product_variants').delete().eq('product_id', product.id);
          await supabase.from('product_variants').insert(
            product.variants.map((v) => ({
              product_id: product.id,
              size: v.size,
              color: v.color,
              stock: v.stock
            }))
          );
        }
      } catch (err) {
        console.warn('Failed to upsert product into Supabase', err);
      }
    }

    return product;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const products = getLocal<Product[]>(PRODUCTS_STORAGE_KEY, SEED_PRODUCTS);
    const filtered = products.filter((p) => p.id !== id);
    setLocal(PRODUCTS_STORAGE_KEY, filtered);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.warn('Failed to delete product from Supabase', err);
      }
    }
    return true;
  }

  // --- ORDERS ---
  static async getOrders(): Promise<Order[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, items:order_items(*)')
          .order('created_at', { ascending: false });
        if (!error && data) return data as Order[];
      } catch (e) {
        console.warn('Supabase getOrders failed', e);
      }
    }
    return getLocal<Order[]>(ORDERS_STORAGE_KEY, SEED_ORDERS);
  }

  static async createOrder(orderInput: {
    customer_name: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    note?: string;
    subtotal: number;
    delivery_charge: number;
    total: number;
    items: OrderItem[];
  }): Promise<Order> {
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      customer_name: orderInput.customer_name,
      phone: orderInput.phone,
      email: orderInput.email || '',
      city: orderInput.city,
      address: orderInput.address,
      note: orderInput.note || '',
      subtotal: orderInput.subtotal,
      delivery_charge: orderInput.delivery_charge,
      total: orderInput.total,
      payment_method: 'Cash on Delivery',
      status: 'Pending',
      created_at: new Date().toISOString(),
      items: orderInput.items
    };

    // Update stock in products
    const products = getLocal<Product[]>(PRODUCTS_STORAGE_KEY, SEED_PRODUCTS);
    const updatedProducts = products.map((prod) => {
      const purchasedVariantItems = orderInput.items.filter((it) => it.product_id === prod.id);
      if (purchasedVariantItems.length === 0) return prod;

      const updatedVariants = prod.variants.map((v) => {
        const match = purchasedVariantItems.find((it) => it.size === v.size && it.color.toLowerCase() === v.color.toLowerCase());
        if (match) {
          return { ...v, stock: Math.max(0, v.stock - match.qty) };
        }
        return v;
      });
      return { ...prod, variants: updatedVariants };
    });
    setLocal(PRODUCTS_STORAGE_KEY, updatedProducts);

    // Save order locally
    const currentOrders = getLocal<Order[]>(ORDERS_STORAGE_KEY, SEED_ORDERS);
    setLocal(ORDERS_STORAGE_KEY, [newOrder, ...currentOrders]);

    // Push to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: ordRow, error: ordErr } = await supabase.from('orders').insert({
          order_number: newOrder.order_number,
          customer_name: newOrder.customer_name,
          phone: newOrder.phone,
          email: newOrder.email,
          city: newOrder.city,
          address: newOrder.address,
          note: newOrder.note,
          subtotal: newOrder.subtotal,
          delivery_charge: newOrder.delivery_charge,
          total: newOrder.total,
          payment_method: 'Cash on Delivery',
          status: 'Pending'
        }).select().single();

        if (!ordErr && ordRow) {
          await supabase.from('order_items').insert(
            newOrder.items.map((it) => ({
              order_id: ordRow.id,
              product_id: it.product_id,
              name: it.name,
              size: it.size,
              color: it.color,
              qty: it.qty,
              price: it.price
            }))
          );
        }
      } catch (err) {
        console.warn('Failed to insert order into Supabase', err);
      }
    }

    return newOrder;
  }

  static async updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    const orders = getLocal<Order[]>(ORDERS_STORAGE_KEY, SEED_ORDERS);
    const updated = orders.map((o) => (o.id === orderId || o.order_number === orderId ? { ...o, status } : o));
    setLocal(ORDERS_STORAGE_KEY, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({ status }).or(`id.eq.${orderId},order_number.eq.${orderId}`);
      } catch (err) {
        console.warn('Failed to update status in Supabase', err);
      }
    }
    return true;
  }

  static async findOrderByNumberAndPhone(orderNumber: string, phone: string): Promise<Order | null> {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const cleanOrd = orderNumber.trim().toUpperCase();

    const orders = await this.getOrders();
    return (
      orders.find((o) => {
        const oNum = o.order_number.trim().toUpperCase();
        const oPhone = o.phone.replace(/[^0-9]/g, '');
        return oNum === cleanOrd && (oPhone.endsWith(cleanPhone.slice(-7)) || cleanPhone.endsWith(oPhone.slice(-7)));
      }) || null
    );
  }

  // --- MESSAGES ---
  static async getMessages(): Promise<ContactMessage[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as ContactMessage[];
      } catch (err) {
        console.warn('Supabase getMessages error', err);
      }
    }
    return getLocal<ContactMessage[]>(MESSAGES_STORAGE_KEY, SEED_MESSAGES);
  }

  static async createMessage(msg: Omit<ContactMessage, 'id' | 'created_at'>): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      created_at: new Date().toISOString(),
      is_read: false
    };

    const messages = getLocal<ContactMessage[]>(MESSAGES_STORAGE_KEY, SEED_MESSAGES);
    setLocal(MESSAGES_STORAGE_KEY, [newMessage, ...messages]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('messages').insert({
          name: msg.name,
          phone: msg.phone,
          email: msg.email,
          subject: msg.subject,
          message: msg.message
        });
      } catch (err) {
        console.warn('Supabase createMessage error', err);
      }
    }

    return newMessage;
  }

  // --- SETTINGS ---
  static async getSettings(): Promise<StoreSettings> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase.from('settings').select('*').limit(1).single();
        if (data) return data as StoreSettings;
      } catch (err) {
        console.warn('Supabase getSettings error', err);
      }
    }
    return getLocal<StoreSettings>(SETTINGS_STORAGE_KEY, INITIAL_SETTINGS);
  }

  static async updateSettings(updates: Partial<StoreSettings>): Promise<StoreSettings> {
    const current = getLocal<StoreSettings>(SETTINGS_STORAGE_KEY, INITIAL_SETTINGS);
    const updated = { ...current, ...updates };
    setLocal(SETTINGS_STORAGE_KEY, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('settings').upsert({ id: 1, ...updated });
      } catch (err) {
        console.warn('Supabase updateSettings error', err);
      }
    }
    return updated;
  }
}
