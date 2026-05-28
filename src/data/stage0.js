export const stage0 = [
  {
    worldId: 0,
    worldName: 'Counting Forest',
    lessons: [
      {
        id: 0,
        title: 'Count to 5',
        learn: {
          title: 'Let\'s Count to 5!',
          content: 'counting numbers 1 to 5',
          slides: [
            { emoji: '🌲', text: '1 tree' },
            { emoji: '🌲🌲', text: '2 trees' },
            { emoji: '🌲🌲🌲', text: '3 trees' },
            { emoji: '🌲🌲🌲🌲', text: '4 trees' },
            { emoji: '🌲🌲🌲🌲🌲', text: '5 trees' },
          ]
        },
        questions: [
          { question: 'How many trees? 🌲🌲🌲', options: ['2', '3', '4', '5'], answer: '3' },
          { question: 'How many stars? ⭐⭐', options: ['1', '2', '3', '4'], answer: '2' },
          { question: 'How many apples? 🍎🍎🍎🍎', options: ['3', '4', '5', '6'], answer: '4' },
          { question: 'How many cats? 🐱🐱🐱🐱🐱', options: ['3', '4', '5', '6'], answer: '5' },
          { question: 'How many suns? ☀️', options: ['1', '2', '3', '4'], answer: '1' },
        ]
      },
      {
        id: 1,
        title: 'Count to 10',
        learn: {
          title: 'Let\'s Count to 10!',
          content: 'counting numbers 6 to 10',
          slides: [
            { emoji: '🌲🌲🌲🌲🌲🌲', text: '6 trees' },
            { emoji: '🌲🌲🌲🌲🌲🌲🌲', text: '7 trees' },
            { emoji: '🌲🌲🌲🌲🌲🌲🌲🌲', text: '8 trees' },
            { emoji: '🌲🌲🌲🌲🌲🌲🌲🌲🌲', text: '9 trees' },
            { emoji: '🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲', text: '10 trees' },
          ]
        },
        questions: [
          { question: 'How many? 🐝🐝🐝🐝🐝🐝', options: ['5', '6', '7', '8'], answer: '6' },
          { question: 'How many? 🦋🦋🦋🦋🦋🦋🦋', options: ['6', '7', '8', '9'], answer: '7' },
          { question: 'How many? 🍄🍄🍄🍄🍄🍄🍄🍄', options: ['7', '8', '9', '10'], answer: '8' },
          { question: 'How many? 🐸🐸🐸🐸🐸🐸🐸🐸🐸', options: ['8', '9', '10', '11'], answer: '9' },
          { question: 'How many? 🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺', options: ['8', '9', '10', '11'], answer: '10' },
        ]
      },
      {
        id: 2,
        title: 'Order Numbers',
        learn: {
          title: 'Numbers in Order!',
          content: 'ordering numbers 1 to 10',
          slides: [
            { emoji: '1️⃣', text: 'One comes first' },
            { emoji: '2️⃣3️⃣', text: 'Two then Three' },
            { emoji: '4️⃣5️⃣', text: 'Four then Five' },
            { emoji: '6️⃣7️⃣8️⃣', text: 'Six Seven Eight' },
            { emoji: '9️⃣🔟', text: 'Nine then Ten' },
          ]
        },
        questions: [
          { question: 'What comes after 3?', options: ['2', '3', '4', '5'], answer: '4' },
          { question: 'What comes before 7?', options: ['5', '6', '7', '8'], answer: '6' },
          { question: 'What comes after 9?', options: ['7', '8', '9', '10'], answer: '10' },
          { question: 'What comes before 5?', options: ['3', '4', '5', '6'], answer: '4' },
          { question: 'What comes after 6?', options: ['5', '6', '7', '8'], answer: '7' },
        ]
      }
    ]
  }
]