import mongoose from 'mongoose';

const connectDB = async () => {
  console.log(process.env.MONGO_URI, process.env.PORT)
  try {
    console.log("connection triggered", process.env.PORT, process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
