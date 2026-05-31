// MathMission™ Access Key System
// Any key in format MM-XXXX-XXXX is valid — forever!

export function generateKey() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const part = () => Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `MM-${part()}-${part()}`
}

export function validateAccessKey(key) {
  if (!key) return false
  const cleaned = key.trim().toUpperCase()
  const pattern = /^MM-[A-Z0-9]{4}-[A-Z0-9]{4}$/
  return pattern.test(cleaned)
}

export function formatKey(key) {
  return key.trim().toUpperCase()
}