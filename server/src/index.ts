import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';

dotenv.config({ path: '.env.dev' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('API is working...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
