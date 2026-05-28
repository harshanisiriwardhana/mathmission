import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadAccessKey, loadChildName, loadProgress } from '../utils/storage'

const PARENT_PIN = '1234'

export default function ParentDashboard() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')

  function checkPin() {
    if (pin === PARENT_PIN) {
      setUnlocked(true)
      setError('')
    } else {
      setError('Wrong PIN! Try again 🔒')
      setPin('')
    }
  }

  if (!unlocked) {
    return (
      <div className="parent-screen">
        <div className="parent-login-card">
          <div style={{ fontSize: '3rem', textAlign: 'center' }}>👨‍👩‍👧</div>
          <h1 className="parent-title">Parent Dashboard</h1>
          <p className="parent-subtitle">Enter your 4-digit PIN</p>
          <input
            className="access-input"
            type="password"
            placeholder="• • • •"
            value={pin}
            onChange={e => { setPin(e.target.value); setError('') }}
            onKeyPress={e => e.key === 'Enter' && checkPin()}
            maxLength={4}
            style={{ textAlign: 'center', fontSize: '2rem', letterSpacing: '8px' }}
          />
          {error && <p className="access-error">{error}</p>}
          <button className="access-btn" onClick={checkPin}>Unlock 🔓</button>
          <button
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', marginTop: '12px', fontFamily: 'Nunito', fontSize: '0.9rem' }}
            onClick={() => navigate('/worlds')}
          >
            ← Back to App
          </button>
          <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '8px' }}>Default PIN: 1234</p>
        </div>
      </div>
    )
  }

  return <Dashboard navigate={navigate} />
}

function Dashboard({ navigate }) {
  const accessKey = loadAccessKey()
  const childName = loadChildName() || 'Your Child'
  const progress = loadProgress(accessKey) || { worlds: {} }
  const totalLessons = Object.values(progress.worlds).reduce((sum, w) => sum + Object.keys(w).length, 0)
  const totalStars = Object.values(progress.worlds).reduce((sum, w) =>
    sum + Object.values(w).reduce((s, l) => s + (l.stars || 0), 0), 0)

  return (
    <div className="parent-screen">
      <div className="parent-dashboard">
        <div className="parent-header">
          <h1 className="parent-title">👨‍👩‍👧 Parent Dashboard</h1>
          <p className="parent-subtitle">{childName}'s Progress Report</p>
          <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Key: {accessKey}</p>
        </div>

        <div className="parent-stats">
          <div className="parent-stat-card">
            <div className="parent-stat-num">{totalLessons}</div>
            <div className="parent-stat-label">Lessons Complete</div>
          </div>
          <div className="parent-stat-card">
            <div className="parent-stat-num">⭐ {totalStars}</div>
            <div className="parent-stat-label">Stars Earned</div>
          </div>
          <div className="parent-stat-card">
            <div className="parent-stat-num">{Object.keys(progress.worlds).length}</div>
            <div className="parent-stat-label">Worlds Visited</div>
          </div>
        </div>

        {totalLessons === 0 ? (
          <div className="parent-empty">
            <div style={{ fontSize: '3rem' }}>🌟</div>
            <p>No lessons completed yet!</p>
            <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Start playing to see progress here.</p>
          </div>
        ) : (
          <div className="parent-progress-list">
            <h2 style={{ fontFamily: 'Fredoka One', fontSize: '1.2rem', marginBottom: '12px', color: '#1A1A2E' }}>
              Completed Lessons
            </h2>
            {Object.entries(progress.worlds).map(([worldId, lessons]) => (
              <div key={worldId} className="parent-world-row">
                <div className="parent-world-name">World {parseInt(worldId) + 1}</div>
                <div className="parent-lessons">
                  {Object.entries(lessons).map(([lessonId, data]) => (
                    <div key={lessonId} className="parent-lesson-badge">
                      Lesson {parseInt(lessonId) + 1}: {'⭐'.repeat(data.stars || 0)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="access-btn" style={{ marginTop: '20px' }} onClick={() => navigate('/worlds')}>
          ← Back to App
        </button>
      </div>
    </div>
  )
}