-- ==========================================
-- Radiance RIS - Supabase Database Schema
-- ==========================================

-- 1. الفروع (Branches)
CREATE TABLE public.branches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    contact_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. المستخدمون والأطباء (Users / Profiles)
-- نربط هذا الجدول بنظام توثيق Supabase (auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'doctor', 'receptionist', 'technician')),
    branch_id UUID REFERENCES public.branches(id),
    specialty TEXT, -- للأطباء
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. المرضى (Patients)
CREATE TABLE public.patients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female')),
    date_of_birth DATE,
    phone_number TEXT,
    national_id TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. الفحوصات والمواعيد (Exams / Appointments)
CREATE TABLE public.exams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
    branch_id UUID REFERENCES public.branches(id) NOT NULL,
    doctor_id UUID REFERENCES public.profiles(id), -- الطبيب المحول أو الفاحص
    exam_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    accession_number TEXT UNIQUE,
    appointment_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. التقارير الطبية (Medical Reports)
CREATE TABLE public.medical_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL UNIQUE,
    doctor_id UUID REFERENCES public.profiles(id) NOT NULL,
    report_content TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'final')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- إعدادات الأمان (Row Level Security - RLS)
-- ==========================================

-- تفعيل RLS لجميع الجداول
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_reports ENABLE ROW LEVEL SECURITY;

-- سياسات مبسطة (مؤقتاً للبدء: السماح للمستخدمين المسجلين بالوصول)
CREATE POLICY "Allow authenticated users to read branches" ON public.branches FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert branches" ON public.branches FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users to view profiles" ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow users to update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow authenticated users full access to patients" ON public.patients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to exams" ON public.exams FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access to medical_reports" ON public.medical_reports FOR ALL USING (auth.role() = 'authenticated');
