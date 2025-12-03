import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LogOut, Menu, X, User } from 'lucide-react';

// Importar tipos
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  membership_type: string;
  status: string;
  created_at: string;
}

interface Partner {
  id: string;
  name: string;
  airport_code: string;
  terminal: string;
  location: string;
  type: string;
  status: string;
}

type UserRole = 'admin' | 'customer' | 'partner';
type Screen = 'landing' | 'login' | 'register' | 'dashboard' | 'client' | 'partner' | 'members' | 'partners' | 'products' | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        // Determinar role do usuário
        const email = session.user.email || '';
        if (email.includes('admin') || email.includes('@privilegepass.com')) {
          setUserRole('admin');
          setCurrentScreen('dashboard');
        } else {
          setUserRole('customer');
          setCurrentScreen('client');
        }
      } else {
        setCurrentScreen('landing');
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setCurrentScreen('landing');
    setMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  // LANDING PAGE
  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800">
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-2xl font-bold text-white">Privilege Pass</span>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentScreen('login')}
                className="px-6 py-2 text-white border-2 border-white rounded-full hover:bg-white hover:text-purple-700 transition"
              >
                Entrar
              </button>
              <button
                onClick={() => setCurrentScreen('register')}
                className="px-6 py-2 bg-white text-purple-700 rounded-full hover:bg-purple-100 transition font-semibold"
              >
                Começar
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-6">
              Acesso VIP aos Melhores Lounges
            </h1>
            <p className="text-2xl text-purple-100 mb-12">
              Relaxe antes do seu voo em lounges exclusivos nos principais aeroportos do Brasil
            </p>
            <button
              onClick={() => setCurrentScreen('register')}
              className="px-12 py-4 bg-white text-purple-700 text-xl rounded-full hover:bg-purple-100 transition font-bold shadow-2xl"
            >
              Quero Conhecer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✈️</div>
              <h3 className="text-2xl font-bold text-white mb-3">+50 Lounges</h3>
              <p className="text-purple-100">Acesso aos principais lounges do Brasil</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-white mb-3">Conforto Total</h3>
              <p className="text-purple-100">Wifi, alimentação e bebidas inclusas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-white mb-3">Planos Flexíveis</h3>
              <p className="text-purple-100">Escolha o melhor plano para você</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // LOGIN SCREEN
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Bem-vindo de volta</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Entrar
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentScreen('landing')}
              className="text-purple-600 hover:text-purple-700"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD (ADMIN)
  if (currentScreen === 'dashboard' && userRole === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Privilege Pass - Admin</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total de Clientes</h3>
              <p className="text-4xl font-bold text-purple-600">247</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Parceiros Ativos</h3>
              <p className="text-4xl font-bold text-green-600">89</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Vendas do Mês</h3>
              <p className="text-4xl font-bold text-blue-600">R$ 124k</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Área em Desenvolvimento</h2>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}

export default App;
