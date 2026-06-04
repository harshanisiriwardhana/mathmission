import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { worlds } from '../data/worlds'
import { stage0 } from '../data/stage0'
import { saveLessonProgress } from '../utils/progress'
import { loadAccessKey } from '../utils/storage'

const allData = [...stage0]

const OBJECT_IMAGES = {
  '🍎': 'obj_apple.png',
  '🎈': 'obj_balloon.png',
  '🦋': 'obj_butterfly.png',
  '🐱': 'obj_cat.png',
  '☁️': 'obj_cloud.png',
  '🦆': 'obj_duck.png',
  '🐟': 'obj_fish.png',
  '🌸': 'obj_flower.png',
  '🌺': 'obj_flower.png',
  '⭐': 'obj_star.png',
  '🌟': 'obj_star.png',
  '🌲': 'obj_tree.png',
}

const NUMBER_WORDS = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten']

function sizeForCount(count) {
  return 90
}

function audioKeyFromText(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-')
}

const missingAudio = {}

function browserSpeak(text) {
  try {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(String(text))
    u.rate = 0.9; u.pitch = 1.15; u.lang = 'en-US'
    window.speechSynthesis.speak(u)
  } catch (e) {}
}

function say(text, audioKeyOverride) {
  const key = audioKeyOverride || audioKeyFromText(text)
  if (!key) { browserSpeak(text); return }
  if (missingAudio[key]) { browserSpeak(text); return }
  try {
    const audio = new Audio(`/assets/audio/${key}.mp3`)
    let usedFallback = false
    audio.onerror = () => { if (usedFallback) return; usedFallback = true; missingAudio[key] = true; browserSpeak(text) }
    const p = audio.play()
    if (p && p.catch) { p.catch(() => { if (usedFallback) return; usedFallback = true; missingAudio[key] = true; browserSpeak(text) }) }
  } catch (e) { browserSpeak(text) }
}

function stopVoice() { try { window.speechSynthesis && window.speechSynthesis.cancel() } catch (e) {} }

function ObjectIcon({ obj, size = 90 }) {
  const file = OBJECT_IMAGES[obj]
  if (file) {
    return <img src={`/assets/images/${file}`} alt="" style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', display: 'inline-block' }} />
  }
  return <span style={{ fontSize: `${Math.round(size * 0.8)}px`, lineHeight: 1, display: 'inline-block' }}>{obj}</span>
}

export default function LessonScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const worldId = location.state?.worldId || 0
  const world = worlds[worldId]
  const worldData = allData.find(w => w.worldId === worldId)

  const [lessonIndex] = useState(0)
  const [part, setPart] = useState('LEARN')

  const [sceneIndex, setSceneIndex] = useState(0)
  const [revealCount, setRevealCount] = useState(0)

  const [playIndex, setPlayIndex] = useState(0)
  const [tapped, setTapped] = useState([])
  const [playSelected, setPlaySelected] = useState(null)
  const [playAnswered, setPlayAnswered] = useState(false)
  const [playScore, setPlayScore] = useState(0)

  const [proveIndex, setProveIndex] = useState(0)
  const [proveSelected, setProveSelected] = useState(null)
  const [proveAnswered, setProveAnswered] = useState(false)
  const [proveScore, setProveScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const lesson = worldData ? worldData.lessons[lessonIndex] : null

  const learnTimer = useRef(null)
  useEffect(() => {
    if (part !== 'LEARN' || !lesson) return
    const scene = lesson.learn.scenes[sceneIndex]
    const total = scene.objects.length
    setRevealCount(0)
    let n = 0
    function step() {
      n += 1
      setRevealCount(n)
      if (n <= 10) say(NUMBER_WORDS[n] || String(n))
      if (n < total) learnTimer.current = setTimeout(step, 800)
    }
    learnTimer.current = setTimeout(step, 400)
    return () => clearTimeout(learnTimer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [part, sceneIndex, lessonIndex, worldId])

  if (!worldData) {
    return (
      <div className="lesson-screen">
        <div className="lesson-card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '4rem' }}>🚧</div>
            <h2 style={{ fontFamily: 'Fredoka One', fontSize: '1.8rem', margin: '16px 0' }}>Coming Soon!</h2>
            <p style={{ marginBottom: '24px', color: '#666' }}>This world is being built!</p>
            <button className="access-btn" onClick={() => navigate('/worlds')}>Back to World Map 🗺️</button>
          </div>
        </div>
      </div>
    )
  }

  function nextScene() {
    stopVoice()
    if (sceneIndex < lesson.learn.scenes.length - 1) {
      setSceneIndex(sceneIndex + 1)
    } else {
      setPart('PLAY'); setSceneIndex(0); setPlayIndex(0); setTapped([]); setPlaySelected(null); setPlayAnswered(false)
    }
  }

  const playQ = lesson.play[playIndex]
  const playObjects = (playQ && playQ.objects) || []
  const allTapped = playObjects.length > 0 && tapped.length >= playObjects.length

  function tapObject(i) {
    if (playAnswered) return
    if (tapped.includes(i)) return
    const newTapped = [...tapped, i]
    setTapped(newTapped)
    say(NUMBER_WORDS[newTapped.length] || String(newTapped.length))
  }

  function handlePlayAnswer(choice) {
    if (playAnswered) return
    if (playObjects.length > 0 && !allTapped) return
    setPlaySelected(choice); setPlayAnswered(true)
    if (choice === playQ.answer) { setPlayScore(playScore + 1); say('Correct! Well done!') }
    else { say(`The answer was ${playQ.answer}`) }
  }

  function nextPlay() {
    if (playIndex < lesson.play.length - 1) {
      setPlayIndex(playIndex + 1); setTapped([]); setPlaySelected(null); setPlayAnswered(false)
    } else {
      setPart('PROVE IT'); setProveIndex(0); setProveSelected(null); setProveAnswered(false)
    }
  }

  const proveQ = lesson.proveit[proveIndex]
  const proveType = proveQ.type || 'count'

  function handleProveCount(choice) {
    if (proveAnswered) return
    setProveSelected(choice); setProveAnswered(true)
    if (String(choice) === String(proveQ.answer)) { setProveScore(proveScore + 1); say('Correct!') }
    else { say(`The answer was ${proveQ.answer}`) }
  }

  function handleProveGroup(groupIndex) {
    if (proveAnswered) return
    setProveSelected(groupIndex); setProveAnswered(true)
    if (groupIndex === proveQ.answer) { setProveScore(proveScore + 1); say('Correct!') }
    else { say('Good try!') }
  }

  function nextProve() {
    if (proveIndex < lesson.proveit.length - 1) {
      setProveIndex(proveIndex + 1); setProveSelected(null); setProveAnswered(false)
    } else { setShowResult(true) }
  }

  function finishLesson() {
    const stars = proveScore === 5 ? 3 : proveScore >= 4 ? 2 : 0
    const accessKey = loadAccessKey()
    if (stars > 0) saveLessonProgress(accessKey, worldId, lessonIndex, stars)
    navigate('/stars', { state: { stars, worldId, lessonIndex, score: proveScore } })
  }

  function retryProveIt() {
    setProveIndex(0); setProveSelected(null); setProveAnswered(false); setProveScore(0); setShowResult(false)
  }

  useEffect(() => {
    if (part === 'PROVE IT' && !showResult && proveQ) say(proveQ.voice || proveQ.question)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [part, proveIndex, showResult])

  const scene = lesson.learn.scenes[sceneIndex]
  const learnSize = sizeForCount(scene.objects.length)
  const playSize = sizeForCount(playObjects.length)
  const proveSize = proveQ.objects ? sizeForCount(proveQ.objects.length) : 70

  return (
    <div className="lesson-screen">
      <style>{`
        @keyframes objPop { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 70% { transform: scale(1.2) rotate(6deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        .obj-pop { animation: objPop 0.4s ease both; }
        .obj-stage { height: 250px; max-width: 540px; margin: 0 auto; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; align-items: center; gap: 10px; overflow: hidden; }
        .tap-obj { cursor: pointer; transition: transform 0.12s ease, filter 0.12s ease; border-radius: 16px; padding: 4px; }
        .tap-obj.untapped { filter: grayscale(55%) opacity(0.75); }
        .tap-obj.tapped { filter: none; transform: scale(1.08); background: #FFF3BF; }
        .count-bubble { font-family: 'Fredoka One', cursive; font-size: 3rem; color: #4DABF7; text-shadow: 3px 3px 0 #1A1A2E; text-align: center; height: 60px; line-height: 60px; }
        .group-box { border: 4px solid #1A1A2E; border-radius: 20px; padding: 16px; margin: 8px; cursor: pointer; background: #F8F9FA; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 6px; transition: all 0.12s ease; }
        .group-box:hover { transform: translateY(-3px); box-shadow: 4px 6px 0 #1A1A2E; }
        .group-box.correct { background: #69DB7C; border-color: #2F9E44; }
        .group-box.wrong { background: #FF6B6B; border-color: #C92A2A; }
      `}</style>

      <div className="lesson-header">
        <button className="back-btn" onClick={() => { stopVoice(); navigate('/worlds') }}>← Back</button>
        <h2 className="lesson-world-name">{world.emoji} {world.name}</h2>
        <span className={`lesson-part-badge ${part === 'PROVE IT' ? 'prove-badge' : part === 'PLAY' ? 'play-badge' : ''}`}>{part}</span>
      </div>

      <div className="lesson-card">

        {part === 'LEARN' && (
          <div className="learn-section">
            <h2 className="learn-title">{lesson.learn.title}</h2>
            <div className="obj-stage">
              {scene.objects.slice(0, revealCount).map((obj, i) => (
                <span key={i} className="obj-pop"><ObjectIcon obj={obj} size={learnSize} /></span>
              ))}
            </div>
            <div className="scene-number">{revealCount > 0 ? revealCount : ''}</div>
            <div className="scene-word">{revealCount >= scene.objects.length ? scene.word : ''}</div>
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

        {part === 'PLAY' && (
          <div className="play-section">
            <div className="question-counter">Round {playIndex + 1} of {lesson.play.length}</div>
            {playQ.question && <div className="question-text">{playQ.question}</div>}

            {playObjects.length > 0 && (
              <>
                <p className="play-instruction">Tap each one to count! 👆</p>
                <div className="obj-stage">
                  {playObjects.map((obj, i) => (
                    <span key={i} className={`tap-obj ${tapped.includes(i) ? 'tapped' : 'untapped'}`} onClick={() => tapObject(i)}>
                      <ObjectIcon obj={obj} size={playSize} />
                    </span>
                  ))}
                </div>
                <div className="count-bubble">{tapped.length > 0 ? tapped.length : ''}</div>
              </>
            )}

            {(playObjects.length === 0 || allTapped) && (
              <>
                <p className="play-instruction">{playObjects.length === 0 ? '' : 'How many altogether?'}</p>
                <div className="choices-row">
                  {playQ.choices.map(choice => (
                    <button key={choice}
                      className={`choice-btn ${playAnswered ? (choice === playQ.answer ? 'correct' : choice === playSelected ? 'wrong' : '') : ''}`}
                      onClick={() => handlePlayAnswer(choice)}>
                      {choice}
                    </button>
                  ))}
                </div>
              </>
            )}

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

        {part === 'PROVE IT' && !showResult && (
          <div className="proveit-section">
            <div className="question-counter">Question {proveIndex + 1} of {lesson.proveit.length}</div>
            <div className="proveit-stars">
              {[1,2,3,4,5].map(i => (<span key={i}>{i <= proveScore ? '⭐' : '☆'}</span>))}
            </div>
            <div className="question-text">{proveQ.question}</div>

            {proveType === 'count' && (
              <>
                {proveQ.objects && proveQ.objects.length > 0 && (
                  <div className="obj-stage">
                    {proveQ.objects.map((obj, i) => (<span key={i}><ObjectIcon obj={obj} size={proveSize} /></span>))}
                  </div>
                )}
                <div className="options-grid">
                  {proveQ.choices.map(choice => (
                    <button key={choice}
                      className={`option-btn ${proveAnswered ? (String(choice) === String(proveQ.answer) ? 'correct' : String(choice) === String(proveSelected) ? 'wrong' : '') : ''}`}
                      onClick={() => handleProveCount(choice)}>
                      {choice}
                    </button>
                  ))}
                </div>
              </>
            )}

            {proveType === 'group' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {proveQ.groups.map((group, gi) => (
                  <div key={gi}
                    className={`group-box ${proveAnswered ? (gi === proveQ.answer ? 'correct' : gi === proveSelected ? 'wrong' : '') : ''}`}
                    onClick={() => handleProveGroup(gi)}>
                    {group.map((obj, oi) => (<span key={oi}><ObjectIcon obj={obj} size={55} /></span>))}
                  </div>
                ))}
              </div>
            )}

            {proveAnswered && (
              <div>
                <div className="feedback">
                  {(proveType === 'count' ? String(proveSelected) === String(proveQ.answer) : proveSelected === proveQ.answer) ? '⭐ Correct!' : 'Good try!'}
                </div>
                <button className="access-btn" onClick={nextProve}>
                  {proveIndex < lesson.proveit.length - 1 ? 'Next Question ➡️' : 'See My Result! 🌟'}
                </button>
              </div>
            )}
          </div>
        )}

        {part === 'PROVE IT' && showResult && (
          <div className="result-section">
            {proveScore >= 4 ? (
              <div>
                <div style={{ fontSize: '4rem', textAlign: 'center' }}>🎉</div>
                <h2 className="learn-title">{proveScore === 5 ? 'PERFECT! Amazing! 🌟' : 'Well Done! You Passed! 👏'}</h2>
                <p style={{ textAlign: 'center', fontWeight: 900, color: '#666', marginBottom: '24px' }}>You got {proveScore} out of 5 correct!</p>
                <button className="access-btn" onClick={finishLesson}>Collect My Stars! ⭐</button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '4rem', textAlign: 'center' }}>💪</div>
                <h2 className="learn-title">Keep Trying!</h2>
                <p style={{ textAlign: 'center', fontWeight: 900, color: '#666', marginBottom: '8px' }}>You got {proveScore} out of 5.</p>
                <p style={{ textAlign: 'center', color: '#888', marginBottom: '24px' }}>You need 4 out of 5 to pass. You can do it! 🚀</p>
                <button className="access-btn" onClick={retryProveIt}>Try Again! 🔄</button>
                <button className="retry-btn" style={{ marginTop: '12px' }} onClick={() => navigate('/worlds')}>Back to World Map 🗺️</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}