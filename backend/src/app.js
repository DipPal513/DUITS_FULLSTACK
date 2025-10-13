import express from 'express';
import dotenv, { configDotenv } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';

import authRoutes from './modules/auth/auth.route.js';
import errorHandler from './middleware/errorHandler.js';
import memberRoutes from './modules/member/member.route.js';

// Add routes

configDotenv();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));



// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/member', memberRoutes);

// Test route
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Backend is working 🚀' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
