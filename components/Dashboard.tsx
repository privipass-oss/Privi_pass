import { useState } from 'react';
import { 
  Plane, Users, Package, TrendingUp, LogOut, Menu, X, 
  BarChart3, Settings as SettingsIcon, Gift, Megaphone, 
  HelpCircle, MessageSquare 
} from 'lucide-react';

interface DashboardProps {
  user: any;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export default function Dashboard({ user, onNavigate, onLogout }: DashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Plane className="w-8 h-8 text-purple-600" />
              <h1 className="text-xl font-bold text-gray-900">Privilege Pass</h1>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('members')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Clientes
              </button>
              <button
                onClick={() => onNavigate('partners')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Parceiros
              </button>
              <button
                onClick={() => onNavigate('products')}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Produtos
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="hidden md:block text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={onLogout}
                className="hidden md:flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
              
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              <button onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Dashboard</button>
              <button onClick={() => { onNavigate('members'); setMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Clientes</button>
              <button onClick={() => { onNavigate('partners'); setMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Parceiros</button>
              <button onClick={() => { onNavigate('products'); setMenuOpen(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Produtos</button>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 text-red-600 rounded-lg hover:bg-red-50">Sair</button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">247</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Clientes Ativos</h3>
            <p className="text-sm text-gray-500">+12% este mês</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">89</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Parceiros</h3>
            <p className="text-sm text-gray-500">+5 novos</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-purple-600" />
              <span className="text-3xl font-bold text-gray-900">R$ 124k</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Vendas do Mês</h3>
            <p className="text-sm text-gray-500">+28% vs anterior</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-10 h-10 text-orange-600" />
              <span className="text-3xl font-bold text-gray-900">1.2k</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Acessos</h3>
            <p className="text-sm text-gray-500">Lounges este mês</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button onClick={() => onNavigate('analytics')} className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition">
            <BarChart3 className="w-12 h-12 mb-3" />
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-blue-100">Relatórios e métricas</p>
          </button>

          <button onClick={() => onNavigate('benefits')} className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition">
            <Gift className="w-12 h-12 mb-3" />
            <h3 className="text-xl font-bold mb-2">Benefícios</h3>
            <p className="text-green-100">Gerenciar vantagens</p>
          </button>

          <button onClick={() => onNavigate('marketing')} className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition">
            <Megaphone className="w-12 h-12 mb-3" />
            <h3 className="text-xl font-bold mb-2">Marketing</h3>
            <p className="text-purple-100">Campanhas e emails</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Nova venda - Plano Premium</p>
                <p className="text-sm text-gray-500">João Silva • há 2 horas</p>
              </div>
              <span className="text-green-600 font-semibold">R$ 2.499</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Novo parceiro cadastrado</p>
                <p className="text-sm text-gray-500">Lounge GRU Terminal 3 • há 5 horas</p>
              </div>
              <span className="text-blue-600 font-semibold">Novo</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Renovação de plano</p>
                <p className="text-sm text-gray-500">Maria Santos • há 1 dia</p>
              </div>
              <span className="text-green-600 font-semibold">R$ 999</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
