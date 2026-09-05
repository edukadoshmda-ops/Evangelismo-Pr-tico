import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'evangelismo_pratico_demo_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local demo user first
    const storedUser = localStorage.getItem(DEMO_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(DEMO_USER_KEY);
      }
    }

    // If Supabase is configured, listen to session
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
          });
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
          });
        } else if (!localStorage.getItem(DEMO_USER_KEY)) {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name || email.split('@')[0],
          });
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Erro inesperado na autenticação' };
      }
    }

    // Fallback: Modo Demonstração Local
    const demoUser: User = {
      id: 'demo-' + Date.now(),
      email,
      name: email.split('@')[0].toUpperCase(),
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return { success: true };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } }
        });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            name,
          });
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Erro ao cadastrar usuário' };
      }
    }

    // Fallback: Cadastro Demo
    const newUser: User = {
      id: 'demo-' + Date.now(),
      email,
      name,
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const loginAsDemo = () => {
    const demoUser: User = {
      id: 'demo-pr-casas',
      email: 'aluno@evangelismopratico.com',
      name: 'Discípulo / Líder',
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const logout = async () => {
    localStorage.removeItem(DEMO_USER_KEY);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isConfigured: isSupabaseConfigured,
      login,
      register,
      loginAsDemo,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
