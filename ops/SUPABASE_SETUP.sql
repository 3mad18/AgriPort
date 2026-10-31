-- ==============================================================================
-- AgriPort — Supabase Complete Database & Realtime Setup Script
-- ==============================================================================
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gwdyyuezddpbgmmdwiey/sql
-- ==============================================================================

-- 1. Table: INQUIRIES (طلبات عروض الأسعار والتواصل)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    date TEXT NOT NULL,
    name TEXT NOT NULL,
    company TEXT DEFAULT '',
    country TEXT DEFAULT '',
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    product TEXT DEFAULT '',
    quantity TEXT DEFAULT '',
    incoterms TEXT DEFAULT 'FOB',
    destination_port TEXT DEFAULT '',
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'جديد' NOT NULL,
    read BOOLEAN DEFAULT false NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert of inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert of inquiries"
ON public.inquiries FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow ops read all inquiries" ON public.inquiries;
CREATE POLICY "Allow ops read all inquiries"
ON public.inquiries FOR SELECT
TO anon, authenticated, service_role
USING (true);

DROP POLICY IF EXISTS "Allow ops update inquiries" ON public.inquiries;
CREATE POLICY "Allow ops update inquiries"
ON public.inquiries FOR UPDATE
TO anon, authenticated, service_role
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow ops delete inquiries" ON public.inquiries;
CREATE POLICY "Allow ops delete inquiries"
ON public.inquiries FOR DELETE
TO anon, authenticated, service_role
USING (true);


-- 2. Table: PRODUCTS (المنتجات المعروضة في موقع الزوار والتحكم الكامل بها)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    variety TEXT NOT NULL,
    season TEXT NOT NULL,
    pack TEXT NOT NULL,
    specs TEXT NOT NULL,
    image_url TEXT NOT NULL,
    icon TEXT NOT NULL,
    status TEXT NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    sort_order INT DEFAULT 0
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read products" ON public.products;
CREATE POLICY "Allow public read products"
ON public.products FOR SELECT
TO anon, authenticated, service_role
USING (true);

DROP POLICY IF EXISTS "Allow ops insert products" ON public.products;
CREATE POLICY "Allow ops insert products"
ON public.products FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow ops update products" ON public.products;
CREATE POLICY "Allow ops update products"
ON public.products FOR UPDATE
TO anon, authenticated, service_role
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow ops delete products" ON public.products;
CREATE POLICY "Allow ops delete products"
ON public.products FOR DELETE
TO anon, authenticated, service_role
USING (true);

-- Seed initial catalog products (المنتجات التصديرية الأساسية)
INSERT INTO public.products (id, name, category, variety, season, pack, specs, image_url, icon, status, featured, sort_order)
VALUES
(
    'citrus',
    'برتقال فالنسيا وموالح مصرية',
    'موالح',
    'برتقال صيفي فالنسيا، أبو صرة، ليمون، يوسفي',
    'نوفمبر — مايو',
    'كراتين تليسكوبيك 15 كجم، أوبن توب، شبك',
    'معايرات كاليبر: 40، 48، 56، 64، 72، 80، 88',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
    '🍊',
    'متاح للتصدير',
    true,
    1
),
(
    'onions',
    'بصل مصري طازج (أحمر وذهبي)',
    'خضروات',
    'بصل أحمر إيطالي، بصل ذهبي مجفف طبيعياً',
    'فبراير — أغسطس',
    'أكياس شبكية 10 كجم و 25 كجم، جامبو باج 1 طن',
    'أحجام: 40/60 مم، 50/70 مم، 70/90 مم، 80/100 مم',
    'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    '🧅',
    'متاح للتصدير',
    true,
    2
),
(
    'strawberries',
    'فراولة طازجة فاخرة',
    'فواكه',
    'فورتونا، فستيفال، سنشريشن',
    'نوفمبر — مارس',
    'بانيتات 250 جم داخل كراتين 2 كجم و 2.5 كجم',
    'شحن جوي مبرد سريع، فحص متبقيات معتمد',
    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
    '🍓',
    'متاح للتصدير',
    true,
    3
),
(
    'pomegranates',
    'رمان وندرفول أحمر',
    'فواكه',
    'رمان وندرفول عالي السكرية وبريكس مرتفع',
    'سبتمبر — ديسمبر',
    'كراتين 4.5 كجم و 5 كجم (بانيتات أو كراتين مفتوحة)',
    'أحجام: 6، 7، 8، 9، 10، 12، 14 حبة بالكرتونة',
    'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=800&q=80',
    '🍎',
    'موسم قادم',
    false,
    4
),
(
    'potatoes',
    'بطاطس مجهزة للتصدير',
    'خضروات',
    'سبونتا، مونديال، ليدي روزيتا، كارا',
    'يناير — يونيو',
    'أكياس شبك 10 كجم، 25 كجم، جامبو باج 1250 كجم',
    'مغسولة ومجففة، أحجام 35/55 مم و 55+ مم',
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    '🥔',
    'متاح للتصدير',
    false,
    5
),
(
    'grapes',
    'عنب طازج بدون بذور',
    'فواكه',
    'إيرلي سويت، سوبيريور، فليم، كريمسون',
    'مايو — أغسطس',
    'بانيتات 500 جم أو كيس ورقي داخل كرتونة 4.5 كجم',
    'مستوى بريكس مرتفع، قطر الحبة 18-22 مم+',
    'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80',
    '🍇',
    'موسم قادم',
    false,
    6
)
ON CONFLICT (id) DO NOTHING;


-- 3. Table: SITE_SETTINGS (بيانات التواصل وإعدادات الموقع المشتركة)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    company_name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    export_banner_text TEXT NOT NULL,
    show_export_banner BOOLEAN DEFAULT true NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
CREATE POLICY "Allow public read site_settings"
ON public.site_settings FOR SELECT
TO anon, authenticated, service_role
USING (true);

DROP POLICY IF EXISTS "Allow ops update site_settings" ON public.site_settings;
CREATE POLICY "Allow ops update site_settings"
ON public.site_settings FOR ALL
TO anon, authenticated, service_role
USING (true)
WITH CHECK (true);

INSERT INTO public.site_settings (id, company_name, tagline, email, phone, location, export_banner_text, show_export_banner)
VALUES (
    'main',
    'AgriPort',
    'تصدير الحاصلات الزراعية والخضروات والفواكه المصرية الفاخرة',
    'agriporteg@gmail.com',
    '+20 100 720 2636',
    'جمهورية مصر العربية — محافظة البحيرة / كفر الدوار',
    'موسم تصدير البرتقال والبصل مفتوح حالياً للشحن الفوري إلى أوروبا ودول الخليج!',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 4. Enable Realtime Publications (تفعيل المزامنة اللحظية)
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;


-- 5. Table: REGISTERED_USERS (بيانات العملاء والمستخدمين المسجلين بالموقع)
CREATE TABLE IF NOT EXISTS public.registered_users (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT DEFAULT '',
    country_code TEXT DEFAULT '+20',
    country_iso TEXT DEFAULT 'EG',
    password_hash TEXT DEFAULT ''
);

ALTER TABLE public.registered_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert registered_users" ON public.registered_users;
CREATE POLICY "Allow public insert registered_users"
ON public.registered_users FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow ops read registered_users" ON public.registered_users;
CREATE POLICY "Allow ops read registered_users"
ON public.registered_users FOR SELECT
TO anon, authenticated, service_role
USING (true);

DROP POLICY IF EXISTS "Allow ops update registered_users" ON public.registered_users;
CREATE POLICY "Allow ops update registered_users"
ON public.registered_users FOR UPDATE
TO anon, authenticated, service_role
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow ops delete registered_users" ON public.registered_users;
CREATE POLICY "Allow ops delete registered_users"
ON public.registered_users FOR DELETE
TO anon, authenticated, service_role
USING (true);

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.registered_users;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;


-- 6. Table: SITE_VISITS (سجل رصد حركة وزوار الموقع في الوقت الفعلي بدون تسجيل)
CREATE TABLE IF NOT EXISTS public.site_visits (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    visitor_id TEXT NOT NULL,
    path TEXT NOT NULL,
    page_title TEXT DEFAULT '',
    country TEXT DEFAULT '',
    country_code TEXT DEFAULT '',
    flag TEXT DEFAULT '',
    city TEXT DEFAULT '',
    device TEXT DEFAULT '',
    os TEXT DEFAULT '',
    browser TEXT DEFAULT '',
    referrer TEXT DEFAULT '',
    referrer_icon TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_site_visits_created_at ON public.site_visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_visits_country ON public.site_visits(country);
CREATE INDEX IF NOT EXISTS idx_site_visits_path ON public.site_visits(path);

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert site_visits" ON public.site_visits;
CREATE POLICY "Allow public insert site_visits"
ON public.site_visits FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow ops read site_visits" ON public.site_visits;
CREATE POLICY "Allow ops read site_visits"
ON public.site_visits FOR SELECT
TO anon, authenticated, service_role
USING (true);

DROP POLICY IF EXISTS "Allow ops delete site_visits" ON public.site_visits;
CREATE POLICY "Allow ops delete site_visits"
ON public.site_visits FOR DELETE
TO anon, authenticated, service_role
USING (true);

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.site_visits;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;
