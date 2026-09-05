import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-[#001869] flex items-center justify-center shadow-md shrink-0 border border-white/10">
                <img src="/pwa-192x192.png" alt="Logo Oficial Evangelismo Prático" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading font-bold text-2xl text-white">
                Evangelismo <span className="text-teal-400">Prático</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Capacitando vidas com um método bíblico, prático e eficaz de evangelismo pessoal desenvolvido pelo Pr. Roberto Rodrigues Casas.
            </p>
            <p className="italic text-slate-400 text-xs border-l-2 border-teal-500 pl-3 py-1">
              "Pois, que aproveitaria ao homem ganhar todo o mundo e perder a sua alma?" — Marcos 8:36
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-lg">Navegação Rápida</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#inicio" className="hover:text-teal-400 transition-colors">Início</a>
              </li>
              <li>
                <a href="#trajetoria" className="hover:text-teal-400 transition-colors">Trajetória e Formação</a>
              </li>
              <li>
                <a href="#metodo" className="hover:text-teal-400 transition-colors">8 Respostas Bíblicas</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-teal-400 transition-colors">Contato & Convites</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-lg">Coordenação & Contato</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-teal-400 shrink-0" />
                <span>(68) 99239-3910</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-teal-400 shrink-0" />
                <span>edukdadoshma@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-teal-400 shrink-0" />
                <span>Acre, Brasil</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/5568992393910"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-sky-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-pink-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; 2026 Evangelismo Prático. Pr. Roberto Rodrigues Casas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
