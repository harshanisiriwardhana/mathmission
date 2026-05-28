export const stage0 = [
  {
    worldId: 0,
    worldName: 'Counting Forest',
    lessons: [
      {
        id: 0,
        title: 'Count and Tap — Numbers 1 to 5',
        learn: {
          title: "Let's Count to 5! 🌲",
          scenes: [
            { objects: ['🍎'], number: 1, word: 'One' },
            { objects: ['🍎', '🍎'], number: 2, word: 'Two' },
            { objects: ['🍎', '🍎', '🍎'], number: 3, word: 'Three' },
            { objects: ['🍎', '🍎', '🍎', '🍎'], number: 4, word: 'Four' },
            { objects: ['🍎', '🍎', '🍎', '🍎', '🍎'], number: 5, word: 'Five' },
          ]
        },
        play: [
          { objects: ['🌟'], answer: 1, choices: [1, 2, 3] },
          { objects: ['🐱', '🐱'], answer: 2, choices: [1, 2, 3] },
          { objects: ['🍎', '🍎', '🍎'], answer: 3, choices: [2, 3, 4] },
          { objects: ['🦋', '🦋', '🦋', '🦋'], answer: 4, choices: [3, 4, 5] },
          { objects: ['🌸', '🌸', '🌸', '🌸', '🌸'], answer: 5, choices: [3, 4, 5] },
        ],
        proveit: [
          { question: 'How many stars?', objects: ['⭐', '⭐', '⭐'], choices: ['2', '3', '4'], answer: '3' },
          { question: 'How many balloons?', objects: ['🎈', '🎈', '🎈', '🎈'], choices: ['2', '4', '5'], answer: '4' },
          { question: 'How many apples?', objects: ['🍎', '🍎', '🍎'], choices: ['2', '3', '5'], answer: '3' },
          { question: 'How many ducks?', objects: ['🦆', '🦆', '🦆', '🦆'], choices: ['3', '4', '5'], answer: '4' },
          { question: 'How many candles?', objects: ['🕯️', '🕯️', '🕯️', '🕯️', '🕯️'], choices: ['3', '4', '5'], answer: '5' },
        ]
      },
      {
        id: 1,
        title: 'Count and Tap — Numbers 1 to 10',
        learn: {
          title: "Let's Count to 10! 🌲",
          scenes: [
            { objects: ['🌲', '🌲', '🌲', '🌲', '🌲', '🌲'], number: 6, word: 'Six' },
            { objects: ['🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲'], number: 7, word: 'Seven' },
            { objects: ['🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲'], number: 8, word: 'Eight' },
            { objects: ['🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲'], number: 9, word: 'Nine' },
            { objects: ['🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲'], number: 10, word: 'Ten' },
          ]
        },
        play: [
          { objects: ['🐝', '🐝', '🐝', '🐝', '🐝', '🐝'], answer: 6, choices: [5, 6, 7] },
          { objects: ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋'], answer: 7, choices: [6, 7, 8] },
          { objects: ['🍄', '🍄', '🍄', '🍄', '🍄', '🍄', '🍄', '🍄'], answer: 8, choices: [7, 8, 9] },
          { objects: ['🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸'], answer: 9, choices: [8, 9, 10] },
          { objects: ['🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺'], answer: 10, choices: [8, 9, 10] },
        ],
        proveit: [
          { question: 'How many bees?', objects: ['🐝', '🐝', '🐝', '🐝', '🐝', '🐝'], choices: ['5', '6', '7'], answer: '6' },
          { question: 'How many butterflies?', objects: ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋'], choices: ['6', '7', '8'], answer: '7' },
          { question: 'How many mushrooms?', objects: ['🍄', '🍄', '🍄', '🍄', '🍄', '🍄', '🍄', '🍄'], choices: ['7', '8', '9'], answer: '8' },
          { question: 'How many frogs?', objects: ['🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸'], choices: ['8', '9', '10'], answer: '9' },
          { question: 'How many flowers?', objects: ['🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺', '🌺'], choices: ['8', '9', '10'], answer: '10' },
        ]
      },
      {
        id: 2,
        title: 'Order Numbers 1 to 10',
        learn: {
          title: 'Numbers in Order! 🔢',
          scenes: [
            { objects: ['1️⃣'], number: 1, word: 'One comes first!' },
            { objects: ['2️⃣', '3️⃣'], number: 2, word: 'Two then Three!' },
            { objects: ['4️⃣', '5️⃣'], number: 4, word: 'Four then Five!' },
            { objects: ['6️⃣', '7️⃣', '8️⃣'], number: 6, word: 'Six Seven Eight!' },
            { objects: ['9️⃣', '🔟'], number: 9, word: 'Nine then Ten!' },
          ]
        },
        play: [
          { question: 'What comes after 3?', objects: [], choices: [2, 4, 5], answer: 4 },
          { question: 'What comes before 7?', objects: [], choices: [5, 6, 8], answer: 6 },
          { question: 'What comes after 9?', objects: [], choices: [8, 10, 11], answer: 10 },
          { question: 'What comes before 5?', objects: [], choices: [3, 4, 6], answer: 4 },
          { question: 'What comes after 6?', objects: [], choices: [5, 7, 8], answer: 7 },
        ],
        proveit: [
          { question: 'What comes after 4?', objects: [], choices: ['3', '5', '6'], answer: '5' },
          { question: 'What comes before 8?', objects: [], choices: ['6', '7', '9'], answer: '7' },
          { question: 'What comes after 7?', objects: [], choices: ['6', '8', '9'], answer: '8' },
          { question: 'What comes before 3?', objects: [], choices: ['1', '2', '4'], answer: '2' },
          { question: 'What comes after 5?', objects: [], choices: ['4', '6', '7'], answer: '6' },
        ]
      }
    ]
  }
]