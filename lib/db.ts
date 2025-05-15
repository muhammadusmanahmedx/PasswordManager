import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// connectToDatabase();