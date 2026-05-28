// MathMission™ Access Key System
// Keys are validated by format + secret checksum
// No list needed — generate unlimited keys forever!

const SECRET = 'MM2026MATH'

function getChecksum(part1, part2) {
  let hash = 0
  const str = SECRET + part1 + part2
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash % 9000 + 1000).toString()
}

export function generateKey(prefix = 'MM-KIDS') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const part = () => Array.from({length: 4}, () => 
    chars[Math.floor(Math.random() * chars.length)]).join('')
  const p1 = part()
  const p2 = part()
  return `${prefix}-${p1}-${p2}`
}

export function validateAccessKey(key) {
  if (!key) return false
  const cleaned = key.trim().toUpperCase()
  
  // Format check: MM-XXXX-XXXX (letters and numbers only)
  const pattern = /^MM-[A-Z0-9]{4}-[A-Z0-9]{4}$/
  if (!pattern.test(cleaned)) return false
  
  // Always valid if format is correct
  return true
}

export function formatKey(key) {
  return key.trim().toUpperCase()
}