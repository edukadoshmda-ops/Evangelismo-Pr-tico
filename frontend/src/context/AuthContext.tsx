import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const SUPER_ADMIN_EMAILS = [
  'pastorrobertocasas57@gmail.com',
  'edukadoshmda@gmail.com'
];

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role?: 'super_admin' | 'user';
}

export const isSuperAdminUser = (user: User | null): boolean => {
  if (!user || !user.email) return false;
  const email = user.email.toLowerCase().trim();
  return SUPER_ADMIN_EMAILS.includes(email) || user.role === 'super_admin';
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  isSuperAdmin: boolean;
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
        const parsed = JSON.parse(storedUser);
        // Normalize role if email is super admin
        if (parsed.email && SUPER_ADMIN_EMAILS.includes(parsed.email.toLowerCase().trim())) {
          parsed.role = 'super_admin';
        }
        setUser(parsed);
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
          const email = session.user.email || '';
          const isSA = SUPER_ADMIN_EMAILS.includes(email.toLowerCase().trim());
          setUser({
            id: session.user.id,
            email,
            name: session.user.user_metadata?.name || email.split('@')[0],
            role: isSA ? 'super_admin' : 'user'
          });
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const email = session.user.email || '';
          const isSA = SUPER_ADMIN_EMAILS.includes(email.toLowerCase().trim());
          setUser({
            id: session.user.id,
            email,
            name: session.user.user_metadata?.name || email.split('@')[0],
            role: isSA ? 'super_admin' : 'user'
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

  const login = async (rawEmail: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const email = rawEmail.trim().toLowerCase();

    // 1. Verificação Predefinida dos 2 Super Administradores
    if (email === 'pastorrobertocasas57@gmail.com') {
      if (password !== '123456') {
        return { success: false, error: 'Senha incorreta para a conta Super Admin do Pr. Roberto Casas.' };
      }
      const adminUser: User = {
        id: 'super-admin-pr-casas',
        email: 'pastorrobertocasas57@gmail.com',
        name: 'Pr. Roberto Casas',
        role: 'super_admin'
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true };
    }

    if (email === 'edukadoshmda@gmail.com') {
      if (password !== '123456') {
        return { success: false, error: 'Senha incorreta para a conta Super Admin Edukadosh.' };
      }
      const adminUser: User = {
        id: 'super-admin-edukadosh',
        email: 'edukadoshmda@gmail.com',
        name: 'Administrador Edukadosh',
        role: 'super_admin'
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true };
    }

    // 2. Supabase Login para outros usuários
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          const isSA = SUPER_ADMIN_EMAILS.includes(email);
          const loggedUser: User = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.name || email.split('@')[0],
            role: isSA ? 'super_admin' : 'user'
          };
          setUser(loggedUser);
          localStorage.setItem(DEMO_USER_KEY, JSON.stringify(loggedUser));
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Erro inesperado na autenticação' };
      }
    }

    // 3. Fallback: Usuário Comum Local
    if (!password || password.length < 6) {
      return { success: false, error: 'A senha deve conter no mínimo 6 caracteres.' };
    }

    const demoUser: User = {
      id: 'user-' + Date.now(),
      email,
      name: email.split('@')[0].toUpperCase(),
      role: 'user'
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return { success: true };
  };

  const register = async (name: string, rawEmail: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const email = rawEmail.trim().toLowerCase();

    // Se tentar cadastrar com e-mail de super admin
    if (SUPER_ADMIN_EMAILS.includes(email)) {
      return login(email, password);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } }
        });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          const newUser: User = {
            id: data.user.id,
            email: data.user.email || email,
            name,
            role: 'user'
          };
          setUser(newUser);
          localStorage.setItem(DEMO_USER_KEY, JSON.stringify(newUser));
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Erro ao cadastrar usuário' };
      }
    }

    // Fallback: Cadastro Local
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      role: 'user'
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const loginAsDemo = () => {
    const demoUser: User = {
      id: 'demo-aluno',
      email: 'aluno@evangelismopratico.com',
      name: 'Discípulo / Aluno',
      role: 'user'
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

  const isSuperAdmin = isSuperAdminUser(user);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isConfigured: isSupabaseConfigured,
      isSuperAdmin,
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
