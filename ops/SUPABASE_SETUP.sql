-- ==============================================================================
-- AgriPort Ops — Supabase Database & Realtime Setup Script
-- ==============================================================================
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- It creates the inquiries table, sets up Row Level Security (RLS), and enables Realtime!

-- 1. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    date TEXT NOT NULL,
    name TEXT NOT NULL,
    company TEXT,
    country TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    product TEXT,
    quantity TEXT,
    incoterms TEXT,
    destination_port TEXT,
    message TEXT,
    status TEXT DEFAULT 'جديد' NOT NULL,
    read BOOLEAN DEFAULT false NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow Anyone (Public Visitors) to INSERT new inquiries
CREATE POLICY "Allow public insert of inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Allow Service Role and Authenticated Ops to SELECT, UPDATE, DELETE
CREATE POLICY "Allow ops read all inquiries"
ON public.inquiries
FOR SELECT
TO authenticated, service_role
USING (true);

CREATE POLICY "Allow ops update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated, service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow ops delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated, service_role
USING (true);

-- 5. Enable Supabase Realtime for instant alerts on new inquiries
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
