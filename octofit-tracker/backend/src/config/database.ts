import mongoose from 'mongoose';

export const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase() {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`Connected to MongoDB at ${mongoUrl}`);
  } catch (error) {
    console.error('MongoDB connection failed', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Failed to disconnect MongoDB', error);
    throw error;
  }
}
