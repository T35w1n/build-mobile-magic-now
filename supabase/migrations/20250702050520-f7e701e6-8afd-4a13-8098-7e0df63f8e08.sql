
-- Create enum for job categories
CREATE TYPE public.job_category AS ENUM (
  'technology',
  'healthcare',
  'finance',
  'education',
  'retail',
  'hospitality',
  'construction',
  'manufacturing',
  'transportation',
  'marketing',
  'sales',
  'customer_service',
  'other'
);

-- Create enum for job types
CREATE TYPE public.job_type AS ENUM (
  'full_time',
  'part_time',
  'contract',
  'freelance',
  'internship',
  'temporary'
);

-- Create job listings table
CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min NUMERIC,
  salary_max NUMERIC,
  salary_currency TEXT DEFAULT 'USD',
  category job_category NOT NULL,
  job_type job_type NOT NULL,
  requirements TEXT[],
  benefits TEXT[],
  application_deadline DATE,
  is_remote BOOLEAN DEFAULT FALSE,
  experience_level TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

-- RLS policies for job listings
CREATE POLICY "Anyone can view active job listings" 
  ON public.job_listings 
  FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Employers can create job listings" 
  ON public.job_listings 
  FOR INSERT 
  WITH CHECK (employer_id = auth.uid());

CREATE POLICY "Employers can manage their own job listings" 
  ON public.job_listings 
  FOR ALL 
  USING (employer_id = auth.uid());

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.job_listings(id) ON DELETE CASCADE NOT NULL,
  applicant_id UUID REFERENCES auth.users NOT NULL,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, applicant_id)
);

-- Enable RLS for applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for job applications
CREATE POLICY "Applicants can view their own applications" 
  ON public.job_applications 
  FOR SELECT 
  USING (applicant_id = auth.uid());

CREATE POLICY "Employers can view applications for their jobs" 
  ON public.job_applications 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.job_listings 
    WHERE id = job_applications.job_id AND employer_id = auth.uid()
  ));

CREATE POLICY "Applicants can create applications" 
  ON public.job_applications 
  FOR INSERT 
  WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Employers can update application status" 
  ON public.job_applications 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.job_listings 
    WHERE id = job_applications.job_id AND employer_id = auth.uid()
  ));
