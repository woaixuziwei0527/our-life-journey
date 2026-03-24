import { useState } from 'react'
import { Heart, Lock } from 'lucide-react'
import { SHARED_PASSWORD } from '../config/supabase'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === SHARED_PASSWORD) {
      onLogin()
    } else {
      setError('密码不正确哦～')
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* 星空背景 */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* 登录卡片 */}
      <div className={`glass-panel p-8 w-full max-w-md relative z-10 ${isShaking ? 'animate-pulse' : ''}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-dream-blue-400 to-dream-pink-400 mb-4 animate-float">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Our Life Journey</h1>
          <p className="text-dream-blue-200">💕 属于我们的旅行地图</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-dream-blue-300 text-sm mb-2">
              🔐 共享密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dream-blue-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dream-night-900/50 border border-dream-blue-500/30 rounded-xl text-white placeholder-dream-blue-400/50 focus:outline-none focus:border-dream-pink-400 focus:ring-1 focus:ring-dream-pink-400 transition-all"
                placeholder="输入密码"
              />
            </div>
            {error && (
              <p className="text-dream-pink-400 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-dream-blue-500 to-dream-pink-500 text-white font-semibold rounded-xl btn-dream"
          >
            进入我们的世界 ✨
          </button>
        </form>

        <div className="mt-6 text-center text-dream-blue-300/60 text-sm">
          <p>🌙 只属于两个人的私密空间</p>
        </div>
      </div>
    </div>
  )
}
