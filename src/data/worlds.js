export const worlds = [
  // STAGE 0 - Foundation Worlds
  { id: 0, stage: 0, name: 'Counting Forest', emoji: '🌲', color: '#69DB7C', description: 'Count your way through the forest!' },
  { id: 1, stage: 0, name: 'Number Village', emoji: '🏘️', color: '#4DABF7', description: 'Meet the numbers in the village!' },
  { id: 2, stage: 0, name: 'Comparison Canyon', emoji: '🏔️', color: '#FF922B', description: 'Which is bigger? Which is smaller?' },
  { id: 3, stage: 0, name: 'Shape Island', emoji: '🏝️', color: '#CC5DE8', description: 'Explore shapes on the island!' },
  { id: 4, stage: 0, name: 'Pattern Jungle', emoji: '🌴', color: '#FF6B6B', description: 'Find the patterns in the jungle!' },
  { id: 5, stage: 0, name: 'Size Mountain', emoji: '⛰️', color: '#FFD43B', description: 'Big, medium and small!' },

  // STAGE 1 - Number Hero Worlds
  { id: 6, stage: 1, name: 'Number Track City', emoji: '🏙️', color: '#4DABF7', description: 'Race along the number track!' },
  { id: 7, stage: 1, name: 'Bond Mountain', emoji: '🗻', color: '#69DB7C', description: 'Master number bonds!' },
  { id: 8, stage: 1, name: 'Bridge to 20', emoji: '🌉', color: '#FF922B', description: 'Cross the bridge to 20!' },
  { id: 9, stage: 1, name: 'Addition Valley', emoji: '🌄', color: '#CC5DE8', description: 'Add your way through the valley!' },
  { id: 10, stage: 1, name: 'Subtraction River', emoji: '🏞️', color: '#FF6B6B', description: 'Subtract across the river!' },
  { id: 11, stage: 1, name: 'Difference Desert', emoji: '🏜️', color: '#FFD43B', description: 'Find the difference!' },
  { id: 12, stage: 1, name: 'Pattern Plains', emoji: '🌾', color: '#4DABF7', description: 'Spot the patterns!' },
  { id: 13, stage: 1, name: 'Clock Tower Town', emoji: '🕐', color: '#69DB7C', description: 'Learn to tell the time!' },
  { id: 14, stage: 1, name: 'Shape Kingdom', emoji: '👑', color: '#FF922B', description: 'Rule the shape kingdom!' },
  { id: 15, stage: 1, name: 'Measure Meadow', emoji: '📏', color: '#CC5DE8', description: 'Measure everything!' },
  { id: 16, stage: 1, name: 'Coin Cove', emoji: '🪙', color: '#FF6B6B', description: 'Count your coins!' },
  { id: 17, stage: 1, name: 'Even and Odd Ocean', emoji: '🌊', color: '#FFD43B', description: 'Sail the even and odd seas!' },

  // STAGE 2 - Math Explorer Worlds
  { id: 18, stage: 2, name: 'Skip Count Station', emoji: '🚂', color: '#4DABF7', description: 'Skip count like a pro!' },
  { id: 19, stage: 2, name: 'Hundred Square Hills', emoji: '🗺️', color: '#69DB7C', description: 'Explore the hundred square!' },
  { id: 20, stage: 2, name: 'Double Dome', emoji: '🎪', color: '#FF922B', description: 'Double every number!' },
  { id: 21, stage: 2, name: 'Place Value Palace', emoji: '🏰', color: '#CC5DE8', description: 'Tens and ones in the palace!' },
  { id: 22, stage: 2, name: 'Subtraction Valley', emoji: '🌋', color: '#FF6B6B', description: 'Subtract bigger numbers!' },
  { id: 23, stage: 2, name: 'Fraction Forest', emoji: '🍕', color: '#FFD43B', description: 'Share and find fractions!' },
  { id: 24, stage: 2, name: 'Share and Care Village', emoji: '🤝', color: '#4DABF7', description: 'Share equally!' },
  { id: 25, stage: 2, name: 'Time Tower', emoji: '⏰', color: '#69DB7C', description: 'Master telling the time!' },
  { id: 26, stage: 2, name: 'Money Market', emoji: '💰', color: '#FF922B', description: 'Buy and sell at the market!' },
  { id: 27, stage: 2, name: 'Shape City', emoji: '🏗️', color: '#CC5DE8', description: 'Build with 2D and 3D shapes!' },
  { id: 28, stage: 2, name: 'Multiplication Launch Pad', emoji: '🚀', color: '#FF6B6B', description: 'Blast off with multiplication!' },
  { id: 29, stage: 2, name: 'Division Docks', emoji: '⚓', color: '#FFD43B', description: 'Divide at the docks!' },
]

export const stages = [
  { id: 0, name: 'Foundation', emoji: '🌱', worlds: [0,1,2,3,4,5] },
  { id: 1, name: 'Number Hero', emoji: '⭐', worlds: [6,7,8,9,10,11,12,13,14,15,16,17] },
  { id: 2, name: 'Math Explorer', emoji: '🚀', worlds: [18,19,20,21,22,23,24,25,26,27,28,29] },
]