import { useNavigate } from 'react-router-dom'
import { loadChildName, loadAccessKey } from '../utils/storage'
import { worlds, stages } from '../data/worlds'

export default function WorldMapScreen() {
  const navigate = useNavigate()
  const childName = loadChildName() || 'Explorer'
  const accessKey = loadAccessKey()

  return (
    <div className="worldmap-screen">
      <div className="worldmap-header">
        <h1 className="worldmap-title">🗺️ World Map</h1>
        <p className="worldmap-greeting">Hello, {childName}! Choose your world! 🌟</p>
      </div>

      {stages.map(stage => (
        <div key={stage.id} className="stage-section">
          <div className="stage-header">
            <span className="stage-emoji">{stage.emoji}</span>
            <h2 className="stage-title">Stage {stage.id} — {stage.name}</h2>
          </div>
          <div className="worlds-grid">
            {worlds
              .filter(w => w.stage === stage.id)
              .map(world => (
                <div
                  key={world.id}
                  className="world-card"
                  style={{ '--world-color': world.color }}
                  onClick={() => navigate('/lesson', { state: { worldId: world.id } })}
                >
                  <div className="world-emoji">{world.emoji}</div>
                  <div className="world-name">{world.name}</div>
                  <div className="world-stars">⭐⭐⭐</div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="worldmap-footer">
        <button className="parent-btn" onClick={() => navigate('/parent')}>
          👨‍👩‍👧 Parent Dashboard
        </button>
      </div>
    </div>
  )
}