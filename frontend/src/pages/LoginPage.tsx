import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BaseLayout } from '../core/BaseLayout';
import { 
  Mail, Lock, User, Eye, EyeOff, ArrowRight, 
  Sparkles, AlertCircle 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const { login, register, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isRegister && password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoadingAction(true);

    try {
      if (isRegister) {
        const res = await register(name, email, password);
        if (!res.success) {
          setError(res.error || 'Erro ao realizar cadastro.');
        } else {
          navigate('/app');
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || 'E-mail ou senha incorretos.');
        } else {
          navigate('/app');
        }
      }
    } catch (err: any) {
      setError('Ocorreu um erro ao processar sua requisição.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDemoAccess = () => {
    loginAsDemo();
    navigate('/app');
  };

  return (
    <BaseLayout hideHeaderFooter={false}>
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-slate-100 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20">
        <div className="w-full max-w-md">
          
          {/* Card Wrapper with Rounded Corners */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 transition-all duration-300">
            
            {/* Header Icon & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#001869] mx-auto shadow-lg shadow-teal-500/25 mb-4 border border-white/10 flex items-center justify-center">
                <img src="/pwa-192x192.png" alt="Logo Oficial Evangelismo Prático" className="w-full h-full object-cover" />
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                {isRegister ? 'Criar Nova Conta' : 'Acessar Plataforma'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                {isRegister
                  ? 'Cadastre-se para acessar os materiais e estudos exclusivos'
                  : 'Entre com seu e-mail e senha cadastrados'}
              </p>
            </div>

            {/* Mode Switch (Entrar vs Cadastrar) */}
            <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1.5 mb-6 border border-slate-200 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => { setIsRegister(false); setError(null); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  !isRegister
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => { setIsRegister(true); setError(null); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isRegister
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Criar Conta
              </button>
            </div>

            {/* Error Feedback */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle size={18} className="shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome ou ministério"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Senha
                  </label>
                  {!isRegister && (
                    <a href="#recuperar" onClick={(e) => { e.preventDefault(); alert('Instruções de redefinição foram simuladas para o seu e-mail!'); }} className="text-xs font-medium text-teal-600 dark:text-teal-400 hover:underline">
                      Esqueceu a senha?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a senha"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loadingAction}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-teal-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loadingAction ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                ) : (
                  <>
                    <span>{isRegister ? 'Criar Minha Conta' : 'Entrar na Plataforma'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Super Admin & Demo Access */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Acesso Rápido Super Administradores
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('pastorrobertocasas57@gmail.com');
                      setPassword('123456');
                      setIsRegister(false);
                      setError(null);
                    }}
                    className="py-2 px-3 rounded-xl border border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/30 hover:bg-teal-100/70 text-teal-800 dark:text-teal-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>👑 Pr. Roberto Casas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail('edukadoshmda@gmail.com');
                      setPassword('123456');
                      setIsRegister(false);
                      setError(null);
                    }}
                    className="py-2 px-3 rounded-xl border border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/30 hover:bg-teal-100/70 text-teal-800 dark:text-teal-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>👑 Edukadosh</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01]"
              >
                <Sparkles size={16} className="text-amber-500" />
                <span>Testar Acesso Imediato (Modo Demonstração)</span>
              </button>
            </div>

          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              ← Voltar para a Página de Apresentação
            </Link>
          </div>

        </div>
      </div>
    </BaseLayout>
  );
};
