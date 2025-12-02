import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Mail, Phone, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { GlassCard } from '@/components/ui';
import { LOGO_URL } from '@/constants';
import type { FAQItem } from '@/types';

interface SupportPageProps {
  onBack: () => void;
  faqItems: FAQItem[];
}

export const SupportPage: React.FC<SupportPageProps> = ({ onBack, faqItems }) => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const openWhatsApp = () => {
    const text = encodeURIComponent(message || 'Olá! Preciso de ajuda com o Privilege Pass.');
    window.open(`https://wa.me/5521999999999?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={onBack} className="p-2 text-zinc-500 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Privilege Pass" className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-white">Suporte</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Como podemos ajudar?</h1>
          <p className="text-zinc-400">Encontre respostas ou entre em contato</p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-4">
          <GlassCard className="p-6 text-center" interactive onClick={openWhatsApp}>
            <MessageCircle className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
            <h3 className="font-bold text-white mb-1">WhatsApp</h3>
            <p className="text-sm text-zinc-500">Resposta em até 2 horas</p>
          </GlassCard>
          <GlassCard className="p-6 text-center" interactive onClick={() => window.open('mailto:contato@privilegepass.com.br')}>
            <Mail className="w-10 h-10 mx-auto mb-3 text-amber-400" />
            <h3 className="font-bold text-white mb-1">Email</h3>
            <p className="text-sm text-zinc-500">contato@privilegepass.com.br</p>
          </GlassCard>
        </div>

        {/* Quick Message */}
        <GlassCard className="p-6">
          <h3 className="font-bold text-white mb-4">Enviar Mensagem Rápida</h3>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Descreva sua dúvida ou problema..."
            className="input-dark min-h-[100px] resize-none mb-4"
          />
          <button onClick={openWhatsApp} className="w-full py-3 btn-gold flex items-center justify-center gap-2">
            <Send size={18} /> Enviar via WhatsApp
          </button>
        </GlassCard>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Perguntas Frequentes</h2>
          <div className="space-y-3">
            {faqItems.map(item => (
              <GlassCard key={item.id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-white pr-4">{item.question}</span>
                  {expandedFaq === item.id ? <ChevronUp className="w-5 h-5 text-amber-500" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
                </button>
                {expandedFaq === item.id && (
                  <div className="px-4 pb-4">
                    <p className="text-zinc-400 text-sm">{item.answer}</p>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
