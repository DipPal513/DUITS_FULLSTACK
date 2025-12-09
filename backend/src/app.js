import express from 'express';
import  { configDotenv } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.route.js';
import memberRoutes from './modules/member/member.route.js';
import executiveRoutes from './modules/executive/executive.route.js';
import galleryRoutes from './modules/gallery/gallery.route.js';
import eventRoutes from './modules/event/event.route.js';
import noticeRoutes from './modules/notice/notice.route.js';
import achievementRoute from './modules/achievement/achievement.route.js';
import blogRoutes from './modules/blog/blog.route.js';
import { apiLimiter, authLimiter } from './middleware/rateLimiters.js';
// import errorHandler from './middleware/errorHandler.js';
configDotenv();

const app = express();

app.use(express.json({limit:"10mb"}));

const corsOptions = {
    origin: ['https://duitsbd.org','https://dashboard.duitsbd.org','http://localhost:3000', 'http://localhost:3001'], 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRFToken'],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(morgan('dev')); 

app.use(cookieParser());

app.use('/api/v1/auth',authLimiter, authRoutes);

app.use('/api/v1/member', apiLimiter, memberRoutes);
app.use('/api/v1/executive', apiLimiter, executiveRoutes);
app.use('/api/v1/event', apiLimiter, eventRoutes) ;
app.use('/api/v1/gallery', apiLimiter, galleryRoutes) ;
app.use('/api/v1/notice', apiLimiter, noticeRoutes) ;
app.use('/api/v1/achievement', apiLimiter, achievementRoute) ;
app.use('/api/v1/blog', apiLimiter, blogRoutes) ;


// Test route
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Backend is working 🚀' });
});

// app.use(errorHandler());

export default app;
