-- ==============================================================================
-- SCHEMA ADITIVO - VISÃO DE CRESCIMENTO DE IGREJA (NÃO ALTERA TABELAS EXISTENTES)
-- Cole no SQL Editor do Supabase para habilitar sincronização em nuvem das Células e 12
-- ==============================================================================

-- 1. Células (P.G.M. - Regra de multiplicação ao chegar a 12 pessoas)
CREATE TABLE IF NOT EXISTS public.celulas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  lider_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  lider_nome TEXT NOT NULL,
  dia_horario TEXT DEFAULT 'Semanal • 1h30',
  membros_count INTEGER DEFAULT 0 CHECK (membros_count >= 0 AND membros_count <= 12),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.celulas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários autenticados visualizam células"
  ON public.celulas FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados gerenciam células"
  ON public.celulas FOR ALL USING (auth.role() = 'authenticated');

-- 2. Lista Oikós (3 a 5 pessoas por membro)
CREATE TABLE IF NOT EXISTS public.oikos_contatos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  vinculo TEXT,
  status TEXT DEFAULT 'Orando' CHECK (status IN ('Orando', 'Convidado', 'Na Célula', 'Decisão')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.oikos_contatos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário gerencia seu próprio Oikós"
  ON public.oikos_contatos FOR ALL USING (auth.uid() = user_id);

-- 3. Discipulado dos 12 (Coletivo quinzenal & Individual)
CREATE TABLE IF NOT EXISTS public.discipulados_12 (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  discipulador_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  discipulo_nome TEXT NOT NULL,
  degrau TEXT DEFAULT '1. Ganhar' CHECK (degrau IN ('1. Ganhar', '2. Consolidar', '3. Discipular', '4. Enviar')),
  batizado BOOLEAN DEFAULT false,
  nota_individual TEXT,
  ultimo_individual DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.discipulados_12 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Discipulador gerencia seus até 12 discípulos"
  ON public.discipulados_12 FOR ALL USING (auth.uid() = discipulador_id);
