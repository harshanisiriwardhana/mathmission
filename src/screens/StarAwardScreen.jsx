import { useNavigate, useLocation } from 'react-router-dom'

export default function StarAwardScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { stars, score, worldId } = location.state || { stars: 3, score: 5, worldId: 0 }

  const messages = {
    3: "AMAZING! Perfect score! 🎉",
    2: "Great job! Well done! 👏",
    0: "Keep trying! You can do it! 💪"
  }

  return (
    <div className="stars-screen">
      <div className="stars-card">
        <div className="stars-title">{messages[stars]}</div>
        <div className="stars-display">
          {[1, 2, 3].map(i => (
            <span key={i} className={`big-star ${i <= stars ? 'earned' : 'empty'}`}>
              ⭐
            </span>
          ))}
        </div>
        <div className="stars-score">
          You got {score} out of 5 correct!
        </div>
        <div className="stars-buttons">
          <button className="access-btn" onClick={() => navigate('/worlds')}>
            🗺️ World Map
          </button>
          <button
            className="retry-btn"
            onClick={() => navigate('/lesson', { state: { worldId } })}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    </div>
  )
}