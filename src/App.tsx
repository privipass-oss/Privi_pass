import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Plane, Users, Package, TrendingUp, LogOut, Menu, X } from 'lucide-react'

type Screen = 'login' | 'dashboard' | 'clientes' | 'parceiros' | 'produtos'

interface User {
  id: string
  email: string
  role: string
}

function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email || '',
        role: 'admin'
      })
      setScreen('dashboard')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          role: 'admin'
        })
        setScreen('dashboard')
      }
    } catch (error: any) {
      alert('Erro ao fazer login: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setScreen('login')
    setMenuOpen(false)
  }

  if (screen === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Plane className="w-16 h-16 text-purple-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Privilege Pass
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            Sistema de Gestão VIP
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-center text-gray-500">
              v4.0.0 - Privilege Pass Pro
            </p>
          </div>
        </div>
      </div>
    )
  }

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
            <nav className="hidden md:flex space-x-4">
              <button
                onClick={() => setScreen('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  screen === 'dashboard'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setScreen('clientes')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  screen === 'clientes'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Clientes
              </button>
              <button
                onClick={() => setScreen('parceiros')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  screen === 'parceiros'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Parceiros
              </button>
              <button
                onClick={() => setScreen('produtos')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  screen === 'produtos'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Produtos
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="hidden md:block text-sm text-gray-600">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div
