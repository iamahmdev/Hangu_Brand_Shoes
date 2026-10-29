-- ==============================================================================
-- MARKHOR & CO. LEATHER SHOES - SUPABASE DATABASE SCHEMA & RLS
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Formal', 'Loafers', 'Casual (Slip-ons)', 'Sneakers')),
  price NUMERIC NOT NULL,
  old_price NUMERIC,
  description TEXT NOT NULL,
  material TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Product Variants Table (size, color, stock)
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  size INT NOT NULL CHECK (size BETWEEN 39 AND 46),
  color TEXT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, size, color)
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  note TEXT,
  subtotal NUMERIC NOT NULL,
  delivery_charge NUMERIC NOT NULL DEFAULT 200,
  total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'Cash on Delivery',
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  size INT NOT NULL,
  color TEXT NOT NULL,
  qty INT NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Messages Table (Contact Form)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
  id INT PRIMARY KEY DEFAULT 1,
  shop_name TEXT NOT NULL DEFAULT 'Markhor Leathercraft',
  city TEXT NOT NULL DEFAULT 'Lahore',
  phone TEXT NOT NULL DEFAULT '+92 300 8472910',
  whatsapp TEXT NOT NULL DEFAULT '923008472910',
  address TEXT NOT NULL DEFAULT 'Shop 14, Main MM Alam Road, Gulberg III, Lahore, Pakistan',
  opening_hours TEXT NOT NULL DEFAULT 'Mon - Sat: 11:00 AM - 10:00 PM | Sun: 3:00 PM - 10:00 PM',
  delivery_charge NUMERIC NOT NULL DEFAULT 200,
  free_delivery_above NUMERIC NOT NULL DEFAULT 5000,
  announcement_text TEXT NOT NULL DEFAULT 'Cash on Delivery Available All Over Pakistan · Free Delivery Above Rs. 5,000',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. User Roles Table (Admin access)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Storage Bucket for Products
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- 10. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS POLICIES:
-- Products: Everyone can read active products. Only Admin can insert/update/delete.
CREATE POLICY "Public can view active products" ON public.products
  FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Admin can modify products" ON public.products
  FOR ALL USING (public.is_admin());

-- Product Variants: Public can read, Admin can modify
CREATE POLICY "Public can view variants" ON public.product_variants
  FOR SELECT USING (true);

CREATE POLICY "Admin can modify variants" ON public.product_variants
  FOR ALL USING (public.is_admin());

-- Orders: Public can insert orders; Public can view their order by order_number; Admin can do all
CREATE POLICY "Public can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can query order status" ON public.orders
  FOR SELECT USING (true);

CREATE POLICY "Admin can modify orders" ON public.orders
  FOR ALL USING (public.is_admin());

-- Order Items: Public can insert; Admin can manage
CREATE POLICY "Public can create order items" ON public.order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view order items" ON public.order_items
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage order items" ON public.order_items
  FOR ALL USING (public.is_admin());

-- Messages: Public can insert; Admin can view/modify
CREATE POLICY "Public can submit contact messages" ON public.messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view messages" ON public.messages
  FOR ALL USING (public.is_admin());

-- Settings: Public can read; Admin can update
CREATE POLICY "Public can read settings" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "Admin can update settings" ON public.settings
  FOR ALL USING (public.is_admin());

-- Default Settings Seed
INSERT INTO public.settings (id, shop_name, city, phone, whatsapp, address, opening_hours, delivery_charge, free_delivery_above)
VALUES (1, 'Markhor Leathercraft', 'Lahore', '+92 300 8472910', '923008472910', 'Shop 14, Main MM Alam Road, Gulberg III, Lahore, Pakistan', 'Mon - Sat: 11:00 AM - 10:00 PM | Sun: 3:00 PM - 10:00 PM', 200, 5000)
ON CONFLICT (id) DO NOTHING;
