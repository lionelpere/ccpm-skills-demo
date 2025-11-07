import { useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [message, setMessage] = useState('')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) throw new Error('Auth failed')

      const data = await res.json()
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setMessage(`✅ ${isLogin ? 'Logged in' : 'Registered'} successfully!`)
    } catch (err) {
      setMessage(`❌ Error: ${err}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    setEmail('')
    setPassword('')
    setMessage('Logged out')
  }

  if (token) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">✅ Authenticated!</h1>
          <p className="mb-4 text-gray-600">Backend JWT auth working!</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Todo App - {isLogin ? 'Login' : 'Register'}
        </h1>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">
                Min 8 chars, 1 uppercase, 1 number
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-sm text-blue-500 hover:underline"
        >
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center">{message}</p>
        )}
      </div>
    </div>
  )
}

export default App
