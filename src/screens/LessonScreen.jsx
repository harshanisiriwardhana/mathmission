import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { worlds } from '../data/worlds'
import { stage0 } from '../data/stage0'
import { saveLessonProgress } from '../utils/progress'
import { loadAccessKey } from '../utils/storage'

const allData = [...stage0]

export default function LessonScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const worldId = location.state?.worldId || 0
  const world = worlds[worldId]
  const worldData = allData.find(w => w.worldId === worldId)

  const [lessonIndex] = useState(0)
  const [part, setPart] = useState('LEARN')
  const [sceneIndex, setSceneIndex] = useState(0)
  const [playIndex, setPlayIndex] = useState(0)
  const [playSelected, setPlaySelected] = useState(null)
  const [playAnswered, setPlayAnswered] = useState(false)
  const [playScore, setPlayScore] = useState(0)
  const [proveIndex, setProveIndex] = useState(0)
  const [proveSelected, setProveSelected] = useState(null)
  const [proveAnswered, setProveAnswered] = useState(false)
  const [proveScore, setProveScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  if (!worldData) {
    return (
      <div className="lesson-screen">
        <div className="lesson-card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '4rem' }}>🚧</div>
            <h2 style={{ fontFamily: 'Fredoka One', fontSize: '1.8rem', margin: '16px 0' }}>Coming Soon!</h2>
            <p style={{ marginBottom: '24px', color: '#666' }}>This world is being built!</p>
            <button className="access-btn" onClick={() => navigate('/worlds')}>
              Back to World Map 🗺️
            </button>
          </div>
        </div>
      </div>
    )
  }

  const lesson = worldData.lessons[lessonIndex]

  // ─── LEARN ───
  function nextScene() {
    if (sceneIndex < lesson.learn.scenes.length - 1) {
      setSceneIndex(sceneIndex + 1)
    } else {
      setPart('PLAY')
      setSceneIndex(0)
    }
  }

  // ─── PLAY ───
  function handlePlayAnswer(choice) {
    if (playAnswered) return
    setPlaySelected(choice)
    setPlayAnswered(true)
    if (choice === lesson.play[playIndex].answer) {
      setPlayScore(playScore + 1)
    }
  }

  function nextPlay() {
    if (playIndex < lesson.play.length - 1) {
      setPlayIndex(playIndex + 1)
      setPlaySelected(null)
      setPlayAnswered(false)
    } else {
      setPart('PROVE IT')
      setPlayIndex(0)
      setPlaySelected(null)
      setPlayAnswered(false)
    }
  }

  // ─── PROVE IT ───
  function handleProveAnswer(choice) {
    if (proveAnswered) return
    setProveSelected(choice)
    setProveAnswered(true)
    if (String(choice) === String(lesson.proveit[proveIndex].answer)) {
      setProveScore(proveScore + 1)
    }
  }

  function nextProve() {
    if (proveIndex < lesson.proveit.length - 1) {
      setProveIndex(proveIndex + 1)
      setProveSelected(null)
      setProveAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  function finishLesson() {
    const stars = proveScore === 5 ? 3 : proveScore >= 4 ? 2 : 0
    const accessKey = loadAccessKey()
    if (stars > 0) saveLessonProgress(accessKey, worldId, lessonIndex, stars)
    navigate('/stars', { state: { stars, worldId, lessonIndex, score: proveScore } })
  }

  function retryProveIt() {
    setProveIndex(0)
    setProveSelected(null)
    setProveAnswered(false)
    setProveScore(0)
    setShowResult(false)
  }

  const scene = lesson.learn.scenes[sceneIndex]
  const playQ = lesson.play[playIndex]
  const proveQ = lesson.proveit[proveIndex]

  return (
    <div className="lesson-screen">
      <div className="lesson-header">
        <button className="back-btn" onClick={() => navigate('/worlds')}>← Back</button>
        <h2 className="lesson-world-name">{world.emoji} {world.name}</h2>
        <span className={`lesson-part-badge ${part === 'PROVE IT' ? 'prove-badge' : part === 'PLAY' ? 'play-badge' : ''}`}>
          {part}
        </span>
      </div>

      <div className="lesson-card">

        {/* ── LEARN ── */}
        {part === 'LEARN' && (
          <div className="learn-section">
            <h2 className="learn-title">{lesson.learn.title}</h2>
            <div className="learn-scene">
              <div className="scene-objects">
                {scene.objects.map((obj, i) => (
                  <span key={i} className="scene-obj">{obj}</span>
                ))}
              </div>
              <div className="scene-number">{scene.number}</div>
              <div className="scene-word">{scene.word}</div>
            </div>
            <div className="slide-dots">
              {lesson.learn.scenes.map((_, i) => (
                <span key={i} className={`dot ${i === sceneIndex ? 'active' : ''}`} />
              ))}
            </div>
            <button className="access-btn" onClick={nextScene}>
              {sceneIndex < lesson.learn.scenes.length - 1 ? 'Next ➡️' : "Let's Play! 🎮"}
            </button>
          </div>
        )}

        {/* ── PLAY ── */}
        {part === 'PLAY' && (
          <div className="play-section">
            <div className="question-counter">Round {playIndex + 1} of {lesson.play.length}</div>
            {playQ.objects && (
              <div className="play-objects">
                {playQ.objects.map((obj, i) => (
                  <span key={i} className="play-obj">{obj}</span>
                ))}
              </div>
            )}
            {playQ.question && (
              <div className="question-text">{playQ.question}</div>
            )}
            <p className="play-instruction">How many?</p>
            <div className="choices-row">
              {playQ.choices.map(choice => (
                <button
                  key={choice}
                  className={`choice-btn ${
                    playAnswered
                      ? choice === playQ.answer ? 'correct' : choice === playSelected ? 'wrong' : ''
                      : ''
                  }`}
                  onClick={() => handlePlayAnswer(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
            {playAnswered && (
              <div>
                <div className="feedback">
                  {playSelected === playQ.answer ? '⭐ Correct! Well done!' : `The answer was ${playQ.answer}!`}
                </div>
                <button className="access-btn" onClick={nextPlay}>
                  {playIndex < lesson.play.length - 1 ? 'Next Round ➡️' : 'Prove It! 💪'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── PROVE IT ── */}
        {part === 'PROVE IT' && !showResult && (
          <div className="proveit-section">
            <div className="question-counter">Question {proveIndex + 1} of {lesson.proveit.length}</div>
            <div className="proveit-stars">
              {[1,2,3,4,5].map(i => (
                <span key={i}>{i <= proveScore ? '⭐' : '☆'}</span>
              ))}
            </div>
            <div className="question-text">{proveQ.question}</div>
            <div className="proveit-objects">
              {proveQ.objects && proveQ.objects.map((obj, i) => (
                <span key={i} className="proveit-obj">{obj}</span>
              ))}
            </div>
            <div className="options-grid">
              {proveQ.choices && proveQ.choices.map(choice => (
                <button
                  key={choice}
                  className={`option-btn ${
                    proveAnswered
                      ? String(choice) === String(proveQ.answer) ? 'correct' : String(choice) === String(proveSelected) ? 'wrong' : ''
                      : ''
                  }`}
                  onClick={() => handleProveAnswer(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
            {proveAnswered && (
              <div>
                <div className="feedback">
                  {String(proveSelected) === String(proveQ.answer) ? '⭐ Correct!' : `The answer was ${proveQ.answer}!`}
                </div>
                <button className="access-btn" onClick={nextProve}>
                  {proveIndex < lesson.proveit.length - 1 ? 'Next Question ➡️' : 'See My Result! 🌟'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT ── */}
        {part === 'PROVE IT' && showResult && (
          <div className="result-section">
            {proveScore >= 4 ? (
              <div>
                <div style={{ fontSize: '4rem', textAlign: 'center' }}>🎉</div>
                <h2 className="learn-title">
                  {proveScore === 5 ? 'PERFECT! Amazing! 🌟' : 'Well Done! You Passed! 👏'}
                </h2>
                <p style={{ textAlign: 'center', fontWeight: 900, color: '#666', marginBottom: '24px' }}>
                  You got {proveScore} out of 5 correct!
                </p>
                <button className="access-btn" onClick={finishLesson}>
                  Collect My Stars! ⭐
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '4rem', textAlign: 'center' }}>💪</div>
                <h2 className="learn-title">Keep Trying!</h2>
                <p style={{ textAlign: 'center', fontWeight: 900, color: '#666', marginBottom: '8px' }}>
                  You got {proveScore} out of 5.
                </p>
                <p style={{ textAlign: 'center', color: '#888', marginBottom: '24px' }}>
                  You need 4 out of 5 to pass. You can do it! 🚀
                </p>
                <button className="access-btn" onClick={retryProveIt}>
                  Try Again! 🔄
                </button>
                <button className="retry-btn" style={{ marginTop: '12px' }} onClick={() => navigate('/worlds')}>
                  Back to World Map 🗺️
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}