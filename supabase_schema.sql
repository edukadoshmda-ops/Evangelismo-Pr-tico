-- ==============================================================================
-- SCHEMA SQL OFICIAL - PLATAFORMA EVANGELISMO PRÁTICO (PR. ROBERTO CASAS)
-- Cole este script no SQL Editor do seu projeto Supabase caso deseje sincronização em nuvem
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Perfis de Usuários
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfis visíveis publicamente" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Usuários podem atualizar próprio perfil" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 2. Vídeos e Aulas
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  theme TEXT NOT NULL DEFAULT 'Evangelismo',
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  speaker TEXT DEFAULT 'Pr. Roberto Casas',
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vídeos visíveis para todos" 
  ON public.videos FOR SELECT 
  USING (true);

CREATE POLICY "Apenas Super Admins podem inserir vídeos" 
  ON public.videos FOR INSERT 
  WITH CHECK (
    auth.email() IN ('pastorrobertocasas57@gmail.com', 'edukadoshmda@gmail.com')
  );

CREATE POLICY "Apenas Super Admins podem atualizar vídeos" 
  ON public.videos FOR UPDATE 
  USING (
    auth.email() IN ('pastorrobertocasas57@gmail.com', 'edukadoshmda@gmail.com')
  );

CREATE POLICY "Apenas Super Admins podem deletar vídeos" 
  ON public.videos FOR DELETE 
  USING (
    auth.email() IN ('pastorrobertocasas57@gmail.com', 'edukadoshmda@gmail.com')
  );

-- 3. Projetos Missionários
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  responsible TEXT DEFAULT 'Pr. Roberto Casas',
  location TEXT DEFAULT 'Brasil',
  target TEXT,
  status TEXT DEFAULT 'Em Execução',
  progress INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projetos visíveis para todos" 
  ON public.projects FOR SELECT 
  USING (true);

CREATE POLICY "Apenas Super Admins podem inserir projetos" 
  ON public.projects FOR INSERT 
  WITH CHECK (
    auth.email() IN ('pastorrobertocasas57@gmail.com', 'edukadoshmda@gmail.com')
  );

CREATE POLICY "Apenas Super Admins podem atualizar projetos" 
  ON public.projects FOR UPDATE 
  USING (
    auth.email() IN ('pastorrobertocasas57@gmail.com', 'edukadoshmda@gmail.com')
  );

CREATE POLICY "Apenas Super Admins podem deletar projetos" 
  ON public.projects FOR DELETE 
  USING (
    auth.email() IN ('pastorrobertocasas57@gmail.com', 'edukadoshmda@gmail.com')
  );

-- 4. Testemunhos da Comunidade
CREATE TABLE IF NOT EXISTS public.testimonies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_role TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testemunhos visíveis para todos" 
  ON public.testimonies FOR SELECT 
  USING (true);

CREATE POLICY "Usuários autenticados podem postar testemunho" 
  ON public.testimonies FOR INSERT 
  WITH CHECK (true);
