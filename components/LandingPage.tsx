import { Plane, MapPin, Star, Users, Shield, Clock } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Plane className="w-10 h-10 text-white" />
            <span className="text-2xl font-bold text-white">Privilege Pass</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={onLogin}
              className="px-6 py-2 text-white border-2 border-white rounded-full hover:bg-white hover:text-purple-700 transition font-medium"
            >
              Entrar
            </button>
            <button
              onClick={onRegister}
              className="px-6 py-2 bg-white text-purple-700 rounded-full hover:bg-purple-50 transition font-semibold shadow-lg"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Acesso VIP aos Melhores
            <span className="block text-yellow-300">Lounges do Brasil</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-3xl mx-auto">
            Transforme sua experiência de viagem. Relaxe antes do voo em lounges exclusivos 
            com conforto, alimentação e serviços premium.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRegister}
              className="px-10 py-4 bg-yellow-400 text-purple-900 text-xl rounded-full hover:bg-yellow-300 transition font-bold shadow-2xl"
            >
              Quero Conhecer
            </button>
            <button className="px-10 py-4 bg-white/20 backdrop-blur-sm text-white text-xl rounded-full hover:bg-white/30 transition font-semibold border-2 border-white/50">
              Ver Lounges
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition border border-white/20">
            <MapPin className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">+50 Lounges</h3>
            <p className="text-purple-100">
              Acesso aos principais lounges em aeroportos de todo Brasil
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition border border-white/20">
            <Star className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Conforto Total</h3>
            <p className="text-purple-100">
              WiFi rápido, alimentação, bebidas e ambientes climatizados
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition border border-white/20">
            <Shield className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Planos Flexíveis</h3>
            <p className="text-purple-100">
              Escolha o plano ideal para sua frequência de viagens
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <div className="text-5xl font-bold text-white mb-2">10k+</div>
              <div className="text-purple-100 text-lg">Membros Ativos</div>
            </div>
            <div>
              <Clock className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-100 text-lg">Suporte Disponível</div>
            </div>
            <div>
              <Star className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <div className="text-5xl font-bold text-white mb-2">4.9</div>
              <div className="text-purple-100 text-lg">Avaliação Média</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-white/20">
        <div className="text-center text-purple-200">
          <p>© 2024 Privilege Pass. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
