import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
};

const cached = globalWithMongoose.mongoose || (globalWithMongoose.mongoose = {
  conn: null,
  promise: null,
});

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then(m => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
