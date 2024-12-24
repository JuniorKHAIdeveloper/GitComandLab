import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  mongoose.set('bufferCommands', false);
  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 });
  console.log(`MongoDB connected at ${uri}`);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
