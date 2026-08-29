-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE payment_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');
CREATE TYPE export_format AS ENUM ('pdf', 'docx');

-- ==========================================
-- PROFILES
-- ==========================================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    professional_title TEXT,
    location TEXT,
    website TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- TEMPLATES
-- ==========================================
CREATE TABLE templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    thumbnail_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- RESUMES
-- ==========================================
CREATE TABLE resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT DEFAULT 'Untitled Resume',
    content JSONB DEFAULT '{}'::jsonb,
    template_id TEXT DEFAULT 'modern-1',
    design_settings JSONB DEFAULT '{
        "font": "Inter",
        "fontSize": 11,
        "accentColor": "#1e40af",
        "lineHeight": 1.5,
        "margins": 20,
        "sectionSpacing": 12,
        "headingSize": 14,
        "layout": "classic"
    }'::jsonb,
    ats_score INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- RESUME VERSIONS
-- ==========================================
CREATE TABLE resume_versions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    content JSONB NOT NULL,
    template_id TEXT NOT NULL,
    design_settings JSONB NOT NULL,
    version_label TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- PAYMENTS
-- ==========================================
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
    resume_version_id UUID REFERENCES resume_versions(id) ON DELETE SET NULL,
    provider TEXT NOT NULL CHECK (provider IN ('stripe', 'flutterwave')),
    provider_transaction_id TEXT UNIQUE,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    currency TEXT DEFAULT 'USD',
    status payment_status DEFAULT 'PENDING',
    payment_type TEXT DEFAULT 'cv_download',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_resume_id ON payments(resume_id);
CREATE INDEX idx_payments_provider_transaction_id ON payments(provider_transaction_id);
CREATE INDEX idx_payments_status ON payments(status);

-- ==========================================
-- CV EXPORTS
-- ==========================================
CREATE TABLE cv_exports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    resume_version_id UUID REFERENCES resume_versions(id) ON DELETE SET NULL,
    payment_id UUID REFERENCES payments(id),
    format export_format NOT NULL DEFAULT 'pdf',
    file_path TEXT,
    status TEXT DEFAULT 'pending',
    download_count INTEGER DEFAULT 0,
    first_downloaded_at TIMESTAMP WITH TIME ZONE,
    last_downloaded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_cv_exports_user_id ON cv_exports(user_id);
CREATE INDEX idx_cv_exports_resume_id ON cv_exports(resume_id);

-- ==========================================
-- ATS ANALYSES
-- ==========================================
CREATE TABLE ats_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    feedback JSONB NOT NULL DEFAULT '[]'::jsonb,
    missing_keywords JSONB DEFAULT '[]'::jsonb,
    job_description TEXT,
    analysis_type TEXT DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ats_analyses_resume_id ON ats_analyses(resume_id);

-- ==========================================
-- JOB MATCHES
-- ==========================================
CREATE TABLE job_matches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
    job_description TEXT NOT NULL,
    match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
    matched_skills JSONB DEFAULT '[]'::jsonb,
    missing_skills JSONB DEFAULT '[]'::jsonb,
    missing_keywords JSONB DEFAULT '[]'::jsonb,
    weak_areas JSONB DEFAULT '[]'::jsonb,
    recommendations JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_job_matches_resume_id ON job_matches(resume_id);

-- ==========================================
-- COVER LETTERS
-- ==========================================
CREATE TABLE cover_letters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    company TEXT,
    position TEXT,
    job_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_cover_letters_user_id ON cover_letters(user_id);

-- ==========================================
-- AI GENERATIONS
-- ==========================================
CREATE TABLE ai_generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
    generation_type TEXT NOT NULL,
    input_text TEXT,
    output_text TEXT,
    model TEXT,
    tokens_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ai_generations_user_id ON ai_generations(user_id);
CREATE INDEX idx_ai_generations_created_at ON ai_generations(created_at);

-- ==========================================
-- DOWNLOAD TOKENS
-- ==========================================
CREATE TABLE download_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    export_id UUID REFERENCES cv_exports(id) ON DELETE CASCADE NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_download_tokens_token ON download_tokens(token);
CREATE INDEX idx_download_tokens_expires_at ON download_tokens(expires_at);

-- ==========================================
-- ANALYTICS EVENTS
-- ==========================================
CREATE TABLE analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    event_name TEXT NOT NULL,
    event_data JSONB DEFAULT '{}'::jsonb,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);

-- ==========================================
-- ADMIN USERS
-- ==========================================
CREATE TABLE admin_users (
    id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- AUDIT LOGS
-- ==========================================
CREATE TABLE audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id UUID,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ==========================================
-- RLS POLICIES
-- ==========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Templates: Everyone can read active templates
CREATE POLICY "Anyone can view active templates" ON templates
    FOR SELECT USING (is_active = TRUE);

-- Resumes: Users can only see and edit their own resumes
CREATE POLICY "Users can view own resumes" ON resumes
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON resumes
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON resumes
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON resumes
    FOR DELETE USING (auth.uid() = user_id);

-- Resume Versions: Users can only see and create versions for their own resumes
CREATE POLICY "Users can view own resume versions" ON resume_versions
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM resumes WHERE resumes.id = resume_versions.resume_id AND resumes.user_id = auth.uid())
    );
CREATE POLICY "Users can insert own resume versions" ON resume_versions
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM resumes WHERE resumes.id = resume_versions.resume_id AND resumes.user_id = auth.uid())
    );

-- Payments: Users can only see their own payments
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- CV Exports: Users can only see their own exports
CREATE POLICY "Users can view own exports" ON cv_exports
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own exports" ON cv_exports
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own exports" ON cv_exports
    FOR UPDATE USING (auth.uid() = user_id);

-- ATS Analyses: Users can only see their own analyses
CREATE POLICY "Users can view own analyses" ON ats_analyses
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON ats_analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Job Matches: Users can only see their own matches
CREATE POLICY "Users can view own job matches" ON job_matches
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own job matches" ON job_matches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Cover Letters: Users can only see their own cover letters
CREATE POLICY "Users can view own cover letters" ON cover_letters
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cover letters" ON cover_letters
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cover letters" ON cover_letters
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cover letters" ON cover_letters
    FOR DELETE USING (auth.uid() = user_id);

-- AI Generations: Users can only see their own generations
CREATE POLICY "Users can view own AI generations" ON ai_generations
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own AI generations" ON ai_generations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Download Tokens: Users can only see their own tokens
CREATE POLICY "Users can view own download tokens" ON download_tokens
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own download tokens" ON download_tokens
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own download tokens" ON download_tokens
    FOR UPDATE USING (auth.uid() = user_id);

-- Analytics Events: Users can only see their own events
CREATE POLICY "Users can view own analytics events" ON analytics_events
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analytics events" ON analytics_events
    FOR INSERT WITH CHECK (true);

-- Admin Users: Only admins can see
CREATE POLICY "Admins can view admin users" ON admin_users
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
    );

-- Audit Logs: Only admins can see
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
    );
