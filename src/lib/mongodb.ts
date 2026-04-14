import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("[MongoDB] CRITICAL: MONGODB_URI environment variable is missing!");
  throw new Error(
    'Please define the MONGODB_URI environment variable inside your deployment settings (Vercel).'
  );
} else {
  console.log("[MongoDB] URI found. Initializing connection...");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log("[MongoDB] Connection established successfully.");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("[MongoDB] Connection Error:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
