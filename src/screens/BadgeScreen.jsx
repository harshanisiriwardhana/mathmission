import { useNavigate, useLocation } from 'react-router-dom'
import { loadProgress, loadChildName, loadAccessKey } from '../utils/storage'
import '../styles/global.css'

const BADGES = [
  {
    id: 'stage0',
    name: 'Counting Explorer',
    stage: 0,
    description: 'Completed all 6 worlds in Stage 0!',
    color: '#FF9800',
    bgColor: '#FFF3E0',
    border: '#FF9800',
    image: '/assets/images/badge_stage0.png',
    worldsNeeded: [0,1,2,3,4,5],
  },
  {
    id: 'stage1',
    name: 'Number Hero',
    stage: 1,
    description: 'Completed all 12 worlds in Stage 1!',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
    border: '#9C27B0',
    image: '/assets/images/badge_stage1.png',
    worldsNeeded: [6,7,8,9,10,11,12,13,14,15,16,17],
  },
  {
    id: 'stage2',
    name: 'Math Adventurer',
    stage: 2,
    description: 'Completed all 12 worlds in Stage 2!',
    color: '#F44336',
    bgColor: '#FFEBEE',
    border: '#F44336',
    image: '/assets/images/badge_stage2.png',
    worldsNeeded: [18,19,20,21,22,23,24,25,26,27,28,29],
  },
]

function isWorldComplete(progress, worldId) {
  const world = progress?.worlds?.[worldId]
  if (!world) return false
  return world.lessons && Object.keys(world.lessons).length >= 3 &&
    Object.values(world.lessons).every(l => l.stars > 0)
}

function isBadgeEarned(progress, badge) {
  return badge.worldsNeeded.every(wId => isWorldComplete(progress, wId))
}

function getStageProgress(progress, badge) {
  const completed = badge.worldsNeeded.filter(wId => isWorldComplete(progress, wId)).length
  return { completed, total: badge.worldsNeeded.length }
}

export default function BadgeScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const key = location.state?.key || loadAccessKey() || ''
  const progress = loadProgress(key)
  const childName = loadChildName() || 'Explorer'

  const earnedCount = BADGES.filter(b => isBadgeEarned(progress, b)).length

  return (
    <div className="badge-screen">
      <div className="badge-header">
        <button className="back-btn" onClick={() => navigate('/worlds', { state: { key } })}>
          ← Back
        </button>
        <h1 className="badge-title">🏆 My Badges</h1>
        <div className="badge-count">{earnedCount}/3 earned</div>
      </div>

      <div className="badge-hero">
        <div className="badge-hero-name">{childName}'s Trophy Room</div>
        <div className="badge-hero-sub">Complete all worlds to earn every badge!</div>
      </div>

      <div className="badge-list">
        {BADGES.map(badge => {
          const earned = isBadgeEarned(progress, badge)
          const { completed, total } = getStageProgress(progress, badge)
          const percent = Math.round((completed / total) * 100)

          return (
            <div
              key={badge.id}
              className={`badge-card ${earned ? 'badge-earned' : 'badge-locked'}`}
              style={{ borderColor: earned ? badge.border : '#DDD', background: earned ? badge.bgColor : '#F5F5F5' }}
            >
              <div className="badge-img-wrap">
                <img
                  src={badge.image}
                  alt={badge.name}
                  className={`badge-img ${earned ? '' : 'badge-img-locked'}`}
                />
                {earned && <div className="badge-shine">✨</div>}
                {!earned && <div className="badge-lock">🔒</div>}
              </div>

              <div className="badge-info">
                <div className="badge-name" style={{ color: earned ? badge.color : '#999' }}>
                  {badge.name}
                </div>
                <div className="badge-desc">
                  {earned ? badge.description : `Complete ${total - completed} more worlds to unlock!`}
                </div>

                <div className="badge-progress-wrap">
                  <div className="badge-progress-bar">
                    <div
                      className="badge-progress-fill"
                      style={{ width: `${percent}%`, background: badge.color }}
                    />
                  </div>
                  <div className="badge-progress-label" style={{ color: badge.color }}>
                    {completed}/{total} worlds
                  </div>
                </div>
              </div>

              {earned && (
                <div className="badge-ribbon" style={{ background: badge.color }}>
                  EARNED!
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="badge-footer">
        <button
          className="badge-worlds-btn"
          onClick={() => navigate('/worlds', { state: { key } })}
        >
          🌍 Keep Exploring!
        </button>
      </div>
    </div>
  )
}