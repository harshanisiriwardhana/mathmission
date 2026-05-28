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

  const [lessonIndex, setLessonIndex] = useState(0)
  const [part, setPart] = useState('LEARN')
  const [slideIndex, setSlideIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  if (!worldData) {
    return (
      <div className="lesson-screen">
        <div className="lesson-card">
          <h2>🚧 Coming Soon!</h2>
          <p>This world is being built!</p>
          <button className="access-btn" onClick={() => navigate('/worlds')}>
            Back to World Map
          </button>
        </div>
      </div>
    )
  }

  const lesson = worldData.lessons[lessonIndex]

  function nextSlide() {
    if (slideIndex < lesson.learn.slides.length - 1) {
      setSlideIndex(slideIndex + 1)
    } else {
      setPart('PLAY')
      setSlideIndex(0)
      setQuestionIndex(0)
      setScore(0)
      setSelected(null)
      setAnswered(false)
    }
  }

  function handleAnswer(option) {
    if (answered) return
    setSelected(option)
    setAnswered(true)
    if (option === lesson.questions[questionIndex].answer) {
      setScore(score + 1)
    }
  }

  function nextQuestion() {
    if (questionIndex < lesson.questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      const stars = score >= 4 ? (score === 5 ? 3 : 2) : 0
      const accessKey = loadAccessKey()
      if (stars > 0) saveLessonProgress(accessKey, worldId, lessonIndex, stars)
      navigate('/stars', { state: { stars, worldId, lessonIndex, score } })
    }
  }

  return (
    <div className="lesson-screen">
      <div className="lesson-header">
        <button className="back-btn" onClick={() => navigate('/worlds')}>← Back</button>
        <h2 className="lesson-world-name">{world.emoji} {world.name}</h2>
        <span className="lesson-part-badge">{part}</span>
      </div>

      <div className="lesson-card">
        {part === 'LEARN' && (
          <div className="learn-section">
            <h2 className="learn-title">{lesson.learn.title}</h2>
            <div className="learn-slide">
              <div className="slide-emoji">{lesson.learn.slides[slideIndex].emoji}</div>
              <div className="slide-text">{lesson.learn.slides[slideIndex].text}</div>
            </div>
            <div className="slide-dots">
              {lesson.learn.slides.map((_, i) => (
                <span key={i} className={`dot ${i === slideIndex ? 'active' : ''}`} />
              ))}
            </div>
            <button className="access-btn" onClick={nextSlide}>
              {slideIndex < lesson.learn.slides.length - 1 ? 'Next ➡️' : 'Start Playing! 🎮'}
            </button>
          </div>
        )}

        {(part === 'PLAY' || part === 'PROVE IT') && (
          <div className="play-section">
            <div className="question-counter">
              Question {questionIndex + 1} of {lesson.questions.length}
            </div>
            <div className="question-text">
              {lesson.questions[questionIndex].question}
            </div>
            <div className="options-grid">
              {lesson.questions[questionIndex].options.map(option => (
                <button
                  key={option}
                  className={`option-btn ${
                    answered
                      ? option === lesson.questions[questionIndex].answer
                        ? 'correct'
                        : option === selected
                        ? 'wrong'
                        : ''
                      : ''
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {answered && (
              <button className="access-btn" onClick={nextQuestion}>
                {questionIndex < lesson.questions.length - 1 ? 'Next Question ➡️' : 'See My Stars! ⭐'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}