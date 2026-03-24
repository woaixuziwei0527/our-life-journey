import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Map, Clock, MessageSquare, BarChart3, LogOut, Plus, Image, X } from 'lucide-react'
import { cities, START_POINTS } from '../data/cities'

export default function MapView({ onLogout }) {
  const navigate = useNavigate()
  const mapContainerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visitedCities, setVisitedCities] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)
  const [tripData, setTripData] = useState({
    title: '',
    content: '',
    photos: [],
  })

  useEffect(() => {
    let myChart = null
    let aborted = false

    const initMap = async () => {
      try {
        const echartsModule = await import('echarts')
        const echarts = echartsModule.default || echartsModule
        const chart = echarts.init(mapContainerRef.current)
        myChart = chart

        setLoading(true)

        // 从本地加载中国地图数据（已打包到 public 目录）
        const response = await fetch('/china.json')
        if (aborted) return
        
        const geoJson = await response.json()
        if (aborted) return

        echarts.registerMap('china', geoJson)

        const option = {
          backgroundColor: 'transparent',
          geo: {
            map: 'china',
            roam: true,
            zoom: 1.2,
            label: {
              show: true,
              color: '#7dd3fc',
              fontSize: 8,
            },
            itemStyle: {
              areaColor: '#1e293b',
              borderColor: '#38bdf8',
              borderWidth: 1,
              shadowColor: 'rgba(56, 189, 248, 0.3)',
              shadowBlur: 10,
            },
            emphasis: {
              itemStyle: {
                areaColor: '#334155',
              },
              label: {
                color: '#f472b6',
              },
            },
          },
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: cities.map(city => ({
                name: city.name,
                value: [city.lng, city.lat, city.id],
                cityId: city.id,
              })),
              symbolSize: 12,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke',
                scale: 3,
              },
              label: {
                show: false,
              },
              itemStyle: {
                color: '#fbbf24',
                shadowBlur: 10,
                shadowColor: '#fbbf24',
              },
              zlevel: 1,
            },
            // 用户位置 - 北京
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: [{
                name: '👦 你',
                value: [116.4074, 39.9042],
              }],
              symbolSize: 20,
              label: {
                show: true,
                formatter: '{b}',
                position: 'top',
                color: '#38bdf8',
                fontSize: 14,
                fontWeight: 'bold',
              },
              itemStyle: {
                color: '#38bdf8',
                shadowBlur: 15,
                shadowColor: '#38bdf8',
              },
              zlevel: 2,
            },
            // 女朋友位置 - 西安
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              data: [{
                name: '👧 她',
                value: [108.9398, 34.3416],
              }],
              symbolSize: 20,
              label: {
                show: true,
                formatter: '{b}',
                position: 'top',
                color: '#f472b6',
                fontSize: 14,
                fontWeight: 'bold',
              },
              itemStyle: {
                color: '#f472b6',
                shadowBlur: 15,
                shadowColor: '#f472b6',
              },
              zlevel: 2,
            },
          ],
        }

        chart.setOption(option)
        
        // 点击事件
        chart.on('click', (params) => {
          if (params.data && params.data.cityId) {
            const city = cities.find(c => c.id === params.data.cityId)
            if (city) {
              setSelectedCity(city)
              setShowAddModal(true)
            }
          }
        })

        setLoading(false)
      } catch (err) {
        console.error('地图加载失败:', err)
        setError('地图加载失败，请刷新重试')
        setLoading(false)
      }
    }

    initMap()

    return () => {
      aborted = true
      if (myChart) {
        myChart.dispose()
      }
    }
  }, [])

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3)
    const photoPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(photoPromises).then(photos => {
      setTripData(prev => ({
        ...prev,
        photos: [...prev.photos, ...photos].slice(0, 3),
      }))
    })
  }

  const removePhoto = (index) => {
    setTripData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    if (!tripData.title || !tripData.content) {
      alert('请填写标题和内容哦～')
      return
    }

    const newTrip = {
      id: Date.now(),
      cityId: selectedCity.id,
      cityName: selectedCity.name,
      ...tripData,
      createdAt: new Date().toISOString(),
    }

    const savedTrips = JSON.parse(localStorage.getItem('ourlife_trips') || '[]')
    savedTrips.push(newTrip)
    localStorage.setItem('ourlife_trips', JSON.stringify(savedTrips))

    const newVisited = [...visitedCities, selectedCity.id]
    setVisitedCities(newVisited)
    localStorage.setItem('ourlife_visited', JSON.stringify(newVisited))

    setShowAddModal(false)
    setTripData({ title: '', content: '', photos: [] })
    alert('✨ 记录添加成功！')
  }

  return (
    <div className="min-h-screen relative">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel mx-4 mt-4 px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">💕 Our Life Journey</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => navigate('/map')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <Map className="w-5 h-5 text-dream-pink-400" />
            </button>
            <button onClick={() => navigate('/timeline')} className="p-2 hover:bg-dream-blue-500/20 rounded-lg transition-colors">
              <Clock className="w-5 h-5 text-dream-blue-400" />
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

      {/* 加载状态 */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-dream-blue-400 mx-auto mb-4"></div>
            <p className="text-dream-blue-300 text-lg">正在加载地图...</p>
          </div>
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="glass-panel p-8 text-center max-w-md mx-4">
            <p className="text-dream-pink-400 text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-dream-blue-500 to-dream-pink-500 text-white rounded-xl"
            >
              刷新页面
            </button>
          </div>
        </div>
      )}

      {/* 3D 地图容器 */}
      <div ref={mapContainerRef} className="w-full h-screen pt-20" />

      {/* 添加记录弹窗 */}
      {showAddModal && selectedCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="glass-panel w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold gradient-text">📍 {selectedCity.name}</h2>
              <button onClick={() => setShowAddModal(false)} className="text-dream-blue-400 hover:text-dream-pink-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-dream-blue-300 text-sm mb-2">标题</label>
                <input
                  type="text"
                  value={tripData.title}
                  onChange={(e) => setTripData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-dream-night-900/50 border border-dream-blue-500/30 rounded-xl text-white focus:outline-none focus:border-dream-pink-400"
                  placeholder="给我们的回忆起个名字～"
                />
              </div>

              <div>
                <label className="block text-dream-blue-300 text-sm mb-2">记录内容</label>
                <textarea
                  value={tripData.content}
                  onChange={(e) => setTripData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-2 bg-dream-night-900/50 border border-dream-blue-500/30 rounded-xl text-white focus:outline-none focus:border-dream-pink-400 h-32 resize-none"
                  placeholder="写下你们在这里的故事..."
                />
              </div>

              <div>
                <label className="block text-dream-blue-300 text-sm mb-2">
                  照片（最多 3 张）
                </label>
                <div className="flex gap-2 flex-wrap">
                  {tripData.photos.map((photo, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-dream-blue-500/30">
                      <img src={photo} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer" />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-dream-pink-500 rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  {tripData.photos.length < 3 && (
                    <label className="w-20 h-20 rounded-lg border-2 border-dashed border-dream-blue-500/50 flex items-center justify-center cursor-pointer hover:border-dream-pink-400 transition-colors">
                      <Image className="w-6 h-6 text-dream-blue-400" />
                      <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-dream-blue-500 to-dream-pink-500 text-white font-semibold rounded-xl btn-dream"
              >
                ✨ 保存回忆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 快速操作按钮 */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 bg-gradient-to-br from-dream-blue-500 to-dream-pink-500 rounded-full flex items-center justify-center shadow-lg btn-dream"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}
