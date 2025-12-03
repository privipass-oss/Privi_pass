import { useState } from 'react';
import { Plane, MapPin, Calendar, CreditCard, User, LogOut, Menu, X, QrCode } from 'lucide-react';

interface ClientAreaProps {
  user: any;
  onLogout: () => void;
}

export default function ClientArea({ user, onLogout }: ClientAreaProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Plane className="w-8 h-8" />
              <h1 className="text-xl font-bold">Privilege Pass</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="hidden md:block text-sm">{user?.email}</span>
              <button
                onClick={onLogout}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
              
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/20"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="px-4 py-2">
              <button onClick={onLogout} className="w-full text-left px-4 py-2 hover:bg-white/20 rounded-lg">Sair</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-2">Olá, {user?.user_metadata?.name || 'Viajante'}! ✈️</h2>
          <p className="text-purple-100 text-lg">Seu próximo voo será ainda melhor com acesso VIP</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Membership Card */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-purple-200 mb-2">Plano Atual</p>
              <h3 className="text-3xl font-bold">Premium</h3>
            </div>
            <QrCode className="w-16 h-16" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-purple-200 text-sm mb-1">Membro desde</p>
              <p className="font-semibold">Janeiro 2024</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Próxima renovação</p>
              <p className="font-semibold">Janeiro 2025</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm mb-2">Acessos disponíveis este mês</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white/30 rounded-full h-2">
                <div className="bg-yellow-300 h-2 rounded-full" style={{width: '70%'}}></div>
              </div>
              <span className="font-bold">7/10</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <MapPin className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">50+</h3>
            <p className="text-gray-600">Lounges Disponíveis</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Calendar className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
            <p className="text-gray-600">Acesso Ilimitado</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <CreditCard className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">0%</h3>
            <p className="text-gray-600">Taxa Adicional</p>
          </div>
        </div>

        {/* Recent Visits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Seus Últimos Acessos</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lounge GRU - Terminal 3</p>
                  <p className="text-sm text-gray-500">15 de Dezembro, 2024</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">✓ Confirmado</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lounge CGH - VIP</p>
                  <p className="text-sm text-gray-500">10 de Dezembro, 2024</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">✓ Confirmado</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lounge SDU - Santos Dumont</p>
                  <p className="text-sm text-gray-500">5 de Dezembro, 2024</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">✓ Confirmado</span>
            </div>
          </div>
        </div>

        {/* Available Lounges */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Lounges Disponíveis</h3>
          <p className="text-gray-600 mb-4">Explore os lounges que você pode acessar com seu plano</p>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
            Ver Todos os Lounges
          </button>
        </div>
      </main>
    </div>
  );
}
