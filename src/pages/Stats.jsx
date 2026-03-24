import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Map, Clock, MessageSquare, BarChart3, LogOut, Heart, Plane, Camera, MapPin } from 'lucide-react'

export default function Stats({ onLogout }) {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalCities: 0,
    totalTrips: 0,
    totalPhotos: 0,
    totalMessages: 0,
    visitedCities: [],
    firstTrip: null,
    recentCities: [],
  })

  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem('ourlife_trips') || '[]')
    const messages = JSON.parse(localStorage.getItem('ourlife_messages') || '[]')
    const visited = JSON.parse(localStorage.getItem('ourlife_visited') || '[]')

    const totalPhotos = trips.reduce((sum, trip) => sum + (trip.photos?.length || 0), 0)
    
    // 去重计算城市数
    const uniqueCities = [...new Set(trips.map(t => t.cityId))]
    
    // 最近去过的城市
    const recentCities = trips.slice(0, 5).map(t => t.cityName)

    setStats({
      totalCities: uniqueCities.length,
      totalTrips: trips.length,
      totalPhotos,
      totalMessages: messages.length,
      visitedCities: uniqueCities,
      firstTrip: trips.length > 0 ? trips[trips.length - 1] : null,
      recentCities,
    })
  }, [])

  const statCards = [
    { icon: MapPin, label: '一起去过', value: stats.totalCities, suffix: '个城市', color: 'from-dream-blue-500 to-cyan-500' },
    { icon: Camera, label: '留下记录', value: stats.totalTrips, suffix: '次旅行', color: 'from-dream-pink-500 to-rose-500' },
    { icon: Heart, label: '照片数量', value: stats.totalPhotos, suffix: '张', color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, label: '留言总数', value: stats.totalMessages, suffix: '条', color: 'from-orange-500 to-yellow-500' },
  ]

  return (
    <div className="min-h-screen p-4 pt-20 pb-24">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel mx-4 mt-4 px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">📊 我们的统计</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/map')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <Map className="w-5 h-5 text-dream-blue-400" />
            </button>
            <button onClick={() => navigate('/timeline')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <Clock className="w-5 h-5 text-dream-blue-400" />
            </button>
            <button onClick={() => navigate('/messages')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5 text-dream-blue-400" />
            </button>
            <button onClick={() => navigate('/stats')} className="p-2 bg-dream-blue-500/20 rounded-lg transition-colors">
              <BarChart3 className="w-5 h-5 text-dream-pink-400" />
            </button>
            <button onClick={onLogout} className="p-2 hover:bg-dream-pink-500/20 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-dream-pink-400" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <div key={index} className="glass-panel p-4 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}<span className="text-sm font-normal text-dream-blue-300">{stat.suffix}</span>
              </div>
              <div className="text-dream-blue-400/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 最近去过的城市 */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Plane className="w-5 h-5 text-dream-pink-400" />
            最近去过的地方
          </h3>
          {stats.recentCities.length === 0 ? (
            <p className="text-dream-blue-400/60">还没有旅行记录哦～</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {stats.recentCities.map((city, index) => (
                <span key={index} className="px-3 py-1 bg-gradient-to-r from-dream-blue-500/20 to-dream-pink-500/20 border border-dream-blue-500/30 rounded-full text-dream-blue-200 text-sm">
                  📍 {city}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 温馨提示 */}
        <div className="glass-panel p-6 text-center">
          <Heart className="w-12 h-12 text-dream-pink-400 mx-auto mb-4 animate-pulse-slow" fill="rgba(244, 114, 182, 0.2)" />
          <h3 className="text-xl font-bold gradient-text mb-2">每一段旅程都值得纪念</h3>
          <p className="text-dream-blue-300">
            继续点亮更多的城市，创造属于我们的美好回忆吧～ 💕
          </p>
        </div>
      </div>
    </div>
  )
}
