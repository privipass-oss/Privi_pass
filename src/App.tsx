import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// Importar todos os componentes que você tinha
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import ClientArea from './components/ClientArea';
import PartnerArea from './components/PartnerArea';
import MembersList from './components/MembersList';
import PartnersManager from './components/PartnersManager';
import ProductManager from './components/ProductManager';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import BenefitsManager from './components/BenefitsManager';
import MarketingManager from './components/MarketingManager';
import FAQManager from './components/FAQManager';
import Concierge from './components/Concierge';

type UserRole = 'admin' | 'customer' | 'partner';
type Screen = 'landing' | 'login' | 'register' | 'dashboard' | 'client' | 'partner' | 'members' | 'partners' | 'products' | 'settings' | 'analytics' | 'benefits' | 'marketing' | 'faq' | 'concierge';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        const email = session.user.email || '';
        
        if (email.includes('admin') || email.includes('@privilegepass.com')) {
          setUserRole('admin');
          setCurrentScreen('dashboard');
        } else if (email.includes('partner') || email.includes('@lounge')) {
          setUserRole('partner');
          setCurrentScreen('partner');
        } else {
          setUserRole('customer');
          setCurrentScreen('client');
        }
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        await checkUser();
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleRegister = async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user);
        setUserRole('customer');
        setCurrentScreen('client');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setCurrentScreen('landing');
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

  if (currentScreen === 'landing') {
    return (
      <LandingPage
        onLogin={() => setCurrentScreen('login')}
        onRegister={() => setCurrentScreen('register')}
      />
    );
  }

  if (currentScreen === 'login' || currentScreen === 'register') {
    return (
      <AuthScreen
        mode={currentScreen}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onBack={() => setCurrentScreen('landing')}
        onSwitchMode={() => setCurrentScreen(currentScreen === 'login' ? 'register' : 'login')}
      />
    );
  }

  if (userRole === 'admin') {
    return (
      <>
        {currentScreen === 'dashboard' && (
          <Dashboard
            user={user}
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'members' && (
          <MembersList
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'partners' && (
          <PartnersManager
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'products' && (
          <ProductManager
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'analytics' && (
          <Analytics
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'benefits' && (
          <BenefitsManager
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'marketing' && (
          <MarketingManager
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'faq' && (
          <FAQManager
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'concierge' && (
          <Concierge
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'settings' && (
          <Settings
            user={user}
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
          />
        )}
      </>
    );
  }

  if (userRole === 'customer') {
    return (
      <ClientArea
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  if (userRole === 'partner') {
    return (
      <PartnerArea
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

export default App;
