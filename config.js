import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  defaultExamDurationMinutes: parseInt(process.env.DEFAULT_EXAM_DURATION_MINUTES || '30', 10),
  defaultQuestionCount: parseInt(process.env.DEFAULT_QUESTION_COUNT || '10', 10),
};
