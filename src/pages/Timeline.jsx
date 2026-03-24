import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Map, Clock, MessageSquare, BarChart3, LogOut, Heart, Image } from 'lucide-react'

export default function Timeline({ onLogout }) {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('ourlife_trips') || '[]')
    // 按时间倒序排序
    savedTrips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setTrips(savedTrips)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const months = ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']
    return `${date.getFullYear()}年 ${months[date.getMonth()]}${date.getDate()}日`
  }

  return (
    <div className="min-h-screen p-4 pt-20 pb-24">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel mx-4 mt-4 px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">📅 时光轴</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/map')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <Map className="w-5 h-5 text-dream-blue-400" />
            </button>
            <button onClick={() => navigate('/timeline')} className="p-2 bg-dream-blue-500/20 rounded-lg transition-colors">
              <Clock className="w-5 h-5 text-dream-pink-400" />
            </button>
            <button onClick={() => navigate('/messages')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5 text-dream-blue-400" />
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

      {/* 时间线内容 */}
      <div className="max-w-2xl mx-auto">
        {trips.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-dream-pink-400/50 mx-auto mb-4" />
            <p className="text-dream-blue-300 text-lg">还没有旅行记录哦～</p>
            <p className="text-dream-blue-400/60 mt-2">快去地图上点亮第一个城市吧！</p>
          </div>
        ) : (
          <div className="space-y-6">
            {trips.map((trip, index) => (
              <div key={trip.id} className="relative pl-8 pb-6 border-l-2 border-dream-blue-500/30">
                {/* 时间线节点 */}
                <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-dream-blue-400 to-dream-pink-400 rounded-full" />
                
                {/* 日期 */}
                <div className="text-dream-blue-400/60 text-sm mb-2">
                  {formatDate(trip.createdAt)}
                </div>

                {/* 卡片 */}
                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">📍</span>
                    <h3 className="text-lg font-bold text-white">{trip.cityName}</h3>
                  </div>
                  
                  <h4 className="text-dream-pink-300 font-semibold mb-2">{trip.title}</h4>
                  <p className="text-dream-blue-200 text-sm leading-relaxed mb-3">
                    {trip.content}
                  </p>

                  {trip.photos && trip.photos.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {trip.photos.map((photo, i) => (
                        <div key={i} className="w-24 h-24 rounded-lg overflow-hidden border border-dream-blue-500/30">
                          <img src={photo} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
