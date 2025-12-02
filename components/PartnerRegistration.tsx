import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Instagram, CreditCard, Loader2, Crown } from 'lucide-react';
import { LOGO_URL } from '@/constants';
import type { PartnerCategory, PixType } from '@/types';
import { isValidEmail } from '@/utils';

interface PartnerRegistrationProps {
  onBack: () => void;
  onRegisterSuccess: (data: any) => void;
  onLoginClick: () => void;
}

export const PartnerRegistration: React.FC<PartnerRegistrationProps> = ({
  onBack,
  onRegisterSuccess,
  onLoginClick,
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', instagram: '',
    category: 'Motorista' as PartnerCategory,
    pixKey: '', pixType: 'CPF' as PixType,
    couponCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.pixKey) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    if (!isValidEmail(form.email)) {
      alert('Email inválido');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const coupon = form.couponCode || form.name.split(' ')[0].toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
      onRegisterSuccess({ ...form, couponCode: coupon });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8">
          <ArrowLeft size={18} /> Voltar
        </button>

        <div className="glass-card p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-black" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">Seja um Parceiro</h1>
          <p className="text-zinc-400 text-center text-sm mb-8">
            Ganhe comissões indicando o Privilege Pass
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Nome Completo *</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-dark" placeholder="João Silva" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Email *</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-dark" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">WhatsApp *</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-dark" placeholder="(11) 99999-9999" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Instagram</label>
              <input type="text" value={form.instagram} onChange={e => setForm({...form, instagram: e.target.value})} className="input-dark" placeholder="@seuinstagram" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Categoria</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value as PartnerCategory})} className="input-dark">
                <option value="Motorista">Motorista Executivo</option>
                <option value="Influencer">Influenciador</option>
                <option value="Agência">Agência de Viagens</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <select value={form.pixType} onChange={e => setForm({...form, pixType: e.target.value as PixType})} className="input-dark">
                <option value="CPF">CPF</option>
                <option value="Email">Email</option>
                <option value="Telefone">Telefone</option>
                <option value="Aleatoria">Chave Aleatória</option>
              </select>
              <input type="text" value={form.pixKey} onChange={e => setForm({...form, pixKey: e.target.value})} className="input-dark col-span-2" placeholder="Sua chave PIX *" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Cupom Personalizado (opcional)</label>
              <input type="text" value={form.couponCode} onChange={e => setForm({...form, couponCode: e.target.value.toUpperCase()})} className="input-dark" placeholder="SEUCUPOM" maxLength={12} />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 btn-gold flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Cadastrar como Parceiro'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Já é parceiro? <button onClick={onLoginClick} className="text-amber-500 font-bold hover:underline">Fazer Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegistration;
