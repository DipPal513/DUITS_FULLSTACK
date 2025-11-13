import express from 'express';
import dotenv, { configDotenv } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.route.js';
import errorHandler from './middleware/errorHandler.js';
import pool from './config/db.js';
import memberRoutes from './modules/member/member.route.js';
import executiveRoutes from './modules/executive/executive.route.js';
import galleryRoutes from './modules/gallery/gallery.route.js';
import eventRoutes from './modules/event/event.route.js';
import noticeRoutes from './modules/notice/notice.route.js';
import achievementRoute from './modules/achievement/achievement.route.js';
import { createAchievement } from './modules/achievement/achievement.controller.js';
import createAchievementTable from './modules/achievement/createAchievementTable.js';
import createUserTable from './modules/auth/createUserdb.js';
import noticeTableCreator from './modules/notice/noticeTableCreator.js';
import galleryTableCreator from './modules/gallery/galleryTableMaker.js';
import eventTableCreator from './modules/event/eventtablemaker.js';
import executiveTable from './modules/executive/executiveTable.js';
// Add routes

configDotenv();

// connectDB();

const app = express();
// createUserTable();
// Middleware
app.use(express.json({limit:"10mb"}));
app.use(cors( {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Adjust as needed for your frontend
  credentials: true,
}));

// app.use(errorHandler());
app.use(helmet());
app.use(morgan('dev'));
// createAchievementTable()
app.use(cookieParser());
// console.log("DB Connection String:", pool);
// noticeTableCreator()
// executiveTable();
// galleryTableCreator()
// eventTableCreator();
// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/member', memberRoutes);
app.use('/api/v1/executive', executiveRoutes);
app.use('/api/v1/event', eventRoutes) ;
app.use('/api/v1/gallery', galleryRoutes) ;
app.use('/api/v1/notice', noticeRoutes) ;
app.use('/api/v1/achievement', achievementRoute) ;


// Test route
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Backend is working 🚀' });
});

// Error handling middleware

export default app;
