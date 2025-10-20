import express from 'express';
import dotenv, { configDotenv } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.route.js';
import errorHandler from './middleware/errorHandler.js';
import memberRoutes from './modules/member/member.route.js';
import executiveRoutes from './modules/executive/executive.route.js';
import eventRoutes from './modules/event/event.route.js';
// Add routes

configDotenv();

connectDB();

const app = express();

// Middleware
app.use(express.json({limit:"10mb"}));
app.use(cors( {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Adjust as needed for your frontend
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));

app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/member', memberRoutes);
app.use('/api/v1/executive', executiveRoutes);
app.use('/api/v1/event', eventRoutes) ;

// Test route
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Backend is working 🚀' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
