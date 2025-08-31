import mongoose from 'mongoose';
import { Question } from '../models/Question.js';
import { config } from '../config.js';

const sample = [
  {
    text: 'Which HTTP method is idempotent?',
    options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
    correctIndex: 1,
    tags: ['web']
  },
  {
    text: 'What does JWT stand for?',
    options: ['Java Web Token', 'JavaScript Web Token', 'JSON Web Token', 'Joint Web Token'],
    correctIndex: 2,
    tags: ['auth']
  },
  {
    text: 'Which hook is used for side effects in React?',
    options: ['useState', 'useReducer', 'useEffect', 'useMemo'],
    correctIndex: 2,
    tags: ['react']
  },
  {
    text: 'MongoDB stores records as what structure?',
    options: ['Rows', 'Tables', 'Documents (BSON)', 'KeyFiles'],
    correctIndex: 2,
    tags: ['db']
  },
  {
    text: 'Which status code means Unauthorized?',
    options: ['200', '201', '401', '403'],
    correctIndex: 2,
    tags: ['http']
  },
  {
    text: 'In Express, which middleware parses JSON body?',
    options: ['express.json()', 'bodyParser.text()', 'express.static()', 'cookieParser()'],
    correctIndex: 0,
    tags: ['node']
  },
  {
    text: 'Which of these is NOT a NoSQL database?',
    options: ['MongoDB', 'PostgreSQL', 'Cassandra', 'CouchDB'],
    correctIndex: 1,
    tags: ['db']
  },
  {
    text: 'React Router is primarily used for:',
    options: ['State management', 'Routing', 'Testing', 'Styling'],
    correctIndex: 1,
    tags: ['react']
  },
  {
    text: 'Which command creates a production build in Vite?',
    options: ['vite build', 'npm run build', 'vite make', 'npm run prod'],
    correctIndex: 1,
    tags: ['build']
  },
  {
    text: 'Bcrypt is used for:',
    options: ['Session storage', 'Password hashing', 'Data encryption at rest', 'Logging'],
    correctIndex: 1,
    tags: ['security']
  }
];

async function run() {
  await mongoose.connect(config.mongoUri);
  await Question.deleteMany({});
  await Question.insertMany(sample);
  console.log('Seeded questions:', sample.length);
  await mongoose.disconnect();
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
