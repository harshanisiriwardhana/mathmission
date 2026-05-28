import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveChildName } from '../utils/storage'

export default function ChildNameScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit() {
    if (name.trim().length < 2) {
      setError('Please tell us your name! 😊')
      return
    }
    saveChildName(name.trim())
    navigate('/worlds')
  }

  return (
    <div className="name-screen">
      <div className="name-card">
        <div className="name-icon">🌟</div>
        <h1 className="name-title">What's your name?</h1>
        <p className="name-subtitle">Let's personalise your adventure!</p>
        <input
          className="access-input"
          type="text"
          placeholder="Type your name here..."
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError('')
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          maxLength={20}
        />
        {error && <p className="access-error">{error}</p>}
        <button className="access-btn" onClick={handleSubmit}>
          Start My Adventure! 🚀
        </button>
      </div>
    </div>
  )
}