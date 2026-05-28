import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateAccessKey, formatKey } from '../utils/accessKey'
import { saveAccessKey } from '../utils/storage'

export default function AccessKeyScreen() {
  const navigate = useNavigate()
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  function handleSubmit() {
    const formatted = formatKey(key)
    if (validateAccessKey(formatted)) {
      saveAccessKey(formatted)
      navigate('/name')
    } else {
      setError('Oops! That key doesn\'t work. Check and try again! 🔑')
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="access-screen">
      <div className={`access-card ${shake ? 'shake' : ''}`}>
        <div className="access-icon">🔑</div>
        <h1 className="access-title">Enter Your Access Key</h1>
        <p className="access-subtitle">Your key looks like: MM-KIDS-0001</p>
        <input
          className="access-input"
          type="text"
          placeholder="MM-XXXX-XXXX"
          value={key}
          onChange={(e) => {
            setKey(e.target.value)
            setError('')
          }}
          onKeyPress={handleKeyPress}
          maxLength={20}
        />
        {error && <p className="access-error">{error}</p>}
        <button className="access-btn" onClick={handleSubmit}>
          Let's Go! 🚀
        </button>
        <p className="access-help">
          Need help? Ask a grown-up! 👨‍👩‍👧
        </p>
      </div>
    </div>
  )
}