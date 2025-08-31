import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import examRoutes from './routes/exam.js';

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);

async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected');
    app.listen(config.port, () => console.log(`Server running on http://localhost:${config.port}`));
  } catch (e) {
    console.error('Failed to start server', e);
    process.exit(1);
  }
}

start();
