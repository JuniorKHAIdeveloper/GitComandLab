import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import { logger } from './middleware/logger';
import employeeRoutes from './routes/employeeRoutes';
import errorHandler from './middleware/errorHandler';

dotenv.config({ path: '.env.dev' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

connectDB();

app.use('/api/employee', employeeRoutes);

app.use(errorHandler);

export default app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}