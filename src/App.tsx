import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Plane } from 'lucide-react'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase.from('customers').select('count')
      if (error) throw error
      console.log('Supabase conectado!')
    } catch (error) {
      console.error('Erro Supabase:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Plane className="w-12 h-12 text-purple-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Privilege Pass
        </h1>
        
        <p className="text-center text-gray-600 mb-6">
          Acesso VIP a Lounges de Aeroporto
        </p>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Conectando...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
              Entrar
            </button>
            
            <button className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
              Criar Conta
            </button>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            v4.0.0 - Build Limpo
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
