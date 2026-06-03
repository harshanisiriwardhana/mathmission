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
      <style>{`
        @keyframes starPop {
          0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
          60%  { transform: scale(1.25) rotate(8deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .award-star {
          width: 130px;
          height: 130px;
          object-fit: contain;
          margin: 0 10px;
        }
        .award-star.earned {
          animation: starPop 0.6s ease-out both;
          filter: drop-shadow(0 0 14px rgba(255, 200, 0, 0.7));
        }
        .award-star.earned.s1 { animation-delay: 0.1s; }
        .award-star.earned.s2 { animation-delay: 0.35s; }
        .award-star.earned.s3 { animation-delay: 0.6s; }
        .award-star.empty {
          opacity: 0.3;
        }
        @media (max-width: 600px) {
          .award-star { width: 90px; height: 90px; margin: 0 6px; }
        }
      `}</style>
      <div className="stars-card">
        <div className="stars-title">{messages[stars]}</div>
        <div className="stars-display">
          {[1, 2, 3].map(i => (
            <img
              key={i}
              src={i <= stars ? '/assets/images/star_gold.png' : '/assets/images/star_silver.png'}
              alt={i <= stars ? 'Gold star' : 'Empty star'}
              className={`award-star ${i <= stars ? `earned s${i}` : 'empty'}`}
            />
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