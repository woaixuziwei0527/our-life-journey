import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import MapView from './pages/MapView'
import Timeline from './pages/Timeline'
import Messages from './pages/Messages'
import Stats from './pages/Stats'
import { SHARED_PASSWORD } from './config/supabase'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedAuth = localStorage.getItem('ourlife_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('ourlife_auth', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('ourlife_auth')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-dream-blue-400 mx-auto mb-4"></div>
          <p className="text-dream-blue-300 text-lg">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/map" /> : <Login onLogin={handleLogin} />} 
        />
        <Route path="/map" element={isAuthenticated ? <MapView onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/timeline" element={isAuthenticated ? <Timeline onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/messages" element={isAuthenticated ? <Messages onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/stats" element={isAuthenticated ? <Stats onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
