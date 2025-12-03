import { useState } from 'react';
import { Plane, Users, TrendingUp, Clock, LogOut, Menu, X, CheckCircle, XCircle } from 'lucide-react';

interface PartnerAreaProps {
  user: any;
  onLogout: () => void;
}

export default function PartnerArea({ user, onLogout }: PartnerAreaProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Plane className="w-8 h-8" />
              <h1 className="text-xl font-bold">Privilege Pass - Parceiro</h1>
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
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-2">Portal do Parceiro</h2>
          <p className="text-green-100 text-lg">Lounge GRU - Terminal 3</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Users className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">142</h3>
            <p className="text-gray-600">Visitantes Hoje</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">1.2k</h3>
            <p className="text-gray-600">Total Mês</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Clock className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">3.5h</h3>
            <p className="text-gray-600">Tempo Médio</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <CheckCircle className="w-8 h-8 text-teal-600 mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">98%</h3>
            <p className="text-gray-600">Satisfação</p>
          </div>
        </div>

        {/* Check-ins Today */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Check-ins de Hoje</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">João Silva</p>
                <p className="text-sm text-gray-500">Plano Premium • Check-in: 14:30</p>
              </div>
              <span className="flex items-center text-green-600 font-medium">
                <CheckCircle className="w-5 h-5 mr-1" />
                Ativo
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">Maria Santos</p>
                <p className="text-sm text-gray-500">Plano Gold • Check-in: 13:15</p>
              </div>
              <span className="flex items-center text-gray-600 font-medium">
                <XCircle className="w-5 h-5 mr-1" />
                Finalizado
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">Pedro Costa</p>
                <p className="text-sm text-gray-500">Plano Premium • Check-in: 12:00</p>
              </div>
              <span className="flex items-center text-gray-600 font-medium">
                <XCircle className="w-5 h-5 mr-1" />
                Finalizado
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-gray-900">Ana Oliveira</p>
                <p className="text-sm text-gray-500">Plano Business • Check-in: 11:45</p>
              </div>
              <span className="flex items-center text-gray-600 font-medium">
                <XCircle className="w-5 h-5 mr-1" />
                Finalizado
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Validar Acesso</h3>
            <p className="text-gray-600 mb-4">Escaneie o QR Code do cliente para validar o acesso</p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold w
