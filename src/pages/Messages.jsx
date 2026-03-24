import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Map, Clock, MessageSquare, BarChart3, LogOut, Heart, Send } from 'lucide-react'

export default function Messages({ onLogout }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  // 预设城市列表（简化版）
  const cityOptions = [
    '北京', '西安', '上海', '广州', '深圳', '成都', '重庆', 
    '杭州', '南京', '苏州', '厦门', '三亚', '丽江', '大理'
  ]

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('ourlife_messages') || '[]')
    setMessages(savedMessages)
  }, [])

  const handleSend = () => {
    if (!newMessage.trim() || !selectedCity) {
      alert('请选择城市并写下想说的话哦～')
      return
    }

    const message = {
      id: Date.now(),
      city: selectedCity,
      content: newMessage,
      from: 'me', // 可以扩展为区分两个人
      createdAt: new Date().toISOString(),
    }

    const updated = [message, ...messages]
    setMessages(updated)
    localStorage.setItem('ourlife_messages', JSON.stringify(updated))
    setNewMessage('')
    setSelectedCity('')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    
    const months = ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }

  return (
    <div className="min-h-screen p-4 pt-20 pb-24">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel mx-4 mt-4 px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">💌 留言箱</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/map')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <Map className="w-5 h-5 text-dream-blue-400" />
            </button>
            <button onClick={() => navigate('/timeline')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <Clock className="w-5 h-5 text-dream-blue-400" />
            </button>
            <button onClick={() => navigate('/messages')} className="p-2 bg-dream-blue-500/20 rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5 text-dream-pink-400" />
            </button>
            <button onClick={() => navigate('/stats')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <BarChart3 className="w-5 h-5 text-dream-blue-400" />
            </button>
            <button onClick={onLogout} className="p-2 hover:bg-dream-pink-500/20 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-dream-pink-400" />
            </button>
          </div>
        </div>
      </nav>

      {/* 留言列表 */}
      <div className="max-w-2xl mx-auto mb-32">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-16 h-16 text-dream-pink-400/50 mx-auto mb-4" />
            <p className="text-dream-blue-300 text-lg">还没有留言哦～</p>
            <p className="text-dream-blue-400/60 mt-2">给 TA 写第一句话吧！</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="glass-panel p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <span className="text-dream-pink-300 font-medium">{msg.city}</span>
                  </div>
                  <span className="text-dream-blue-400/60 text-sm">{formatDate(msg.createdAt)}</span>
                </div>
                <p className="text-dream-blue-100 leading-relaxed">{msg.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部输入框 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-panel mx-4 mb-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-2 bg-dream-night-900/50 border border-dream-blue-500/30 rounded-xl text-white focus:outline-none focus:border-dream-pink-400"
          >
            <option value="">选择城市...</option>
            {cityOptions.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2 bg-dream-night-900/50 border border-dream-blue-500/30 rounded-xl text-white focus:outline-none focus:border-dream-pink-400"
              placeholder="想对 TA 说什么..."
            />
            <button
              onClick={handleSend}
              className="px-6 py-2 bg-gradient-to-r from-dream-blue-500 to-dream-pink-500 text-white font-semibold rounded-xl btn-dream flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">发送</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
