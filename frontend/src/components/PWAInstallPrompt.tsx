import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed / standalone
    const isRunningStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isRunningStandalone);

    if (isRunningStandalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt (Android / Desktop Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Check if user dismissed recently
      const dismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Custom trigger from anywhere in the app
    const handleManualTrigger = () => {
      setShowPrompt(true);
    };
    window.addEventListener('open-pwa-install', handleManualTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('open-pwa-install', handleManualTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:left-auto sm:w-96 z-50 animate-scaleUp">
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-500/40 shadow-2xl backdrop-blur-lg flex flex-col gap-3 relative">
        
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          title="Fechar"
        >
          <X size={16} />
        </button>

        {/* Top Info */}
        <div className="flex items-center gap-3 pr-6">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md shrink-0 bg-[#001869] border border-white/10 flex items-center justify-center">
            <img
              src="/pwa-192x192.png"
              alt="Evangelismo Prático"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white leading-tight">
              Instalar Aplicativo
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
              Evangelismo Prático | Pr. Roberto Casas
            </p>
          </div>
        </div>

        {/* Body content based on OS */}
        {isIOS ? (
          <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">
            <p className="font-semibold flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
              <Smartphone size={14} /> Como instalar no iPhone/iPad:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-1">
                Toque no botão <Share size={12} className="inline text-teal-500" /> Compartilhar.
              </li>
              <li className="flex items-center gap-1">
                Selecione <PlusSquare size={12} className="inline text-teal-500" /> Adicionar à Tela de Início.
              </li>
            </ol>
          </div>
        ) : (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Instale o app no seu smartphone ou computador para acesso rápido e modo offline!
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-md shadow-teal-600/20 transition-all active:scale-95"
            >
              <Download size={14} /> Instalar Agora
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Agora não
          </button>
        </div>

      </div>
    </div>
  );
};
