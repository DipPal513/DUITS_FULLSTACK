// import mongoose from 'mongoose';

// const connectDB = async () => {
//   console.log(process.env.MONGO_URI, process.env.PORT)
//   try {
//     console.log("connection triggered", process.env.PORT, process.env.MONGO_URI)
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ MongoDB connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ MongoDB connection failed: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;


// config/db.js
import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
  host: "127.0.0.1",
  user:"bvranzct_central_user",
  password:"iecfbestiud",
  database:"bvranzct_central",
  port:5433,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

export default pool;