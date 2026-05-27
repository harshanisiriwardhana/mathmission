import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/global.css'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/access'), 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash">
      <div className="logo-wrap">
        <div className="logo-rocket">🚀</div>
        <h1 className="logo-title">Math<span>Mission</span></h1>
        <p className="logo-tagline">Learning is your superpower!</p>
      </div>
      <div className="splash-stars">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="star-float" style={{ '--i': i }}>⭐</span>
        ))}
      </div>
    </div>
  )
}