import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import { logger } from './middleware/logger';
import employeeRoutes from './routes/employeeRoutes';

dotenv.config({ path: '.env.dev' });

class Server {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.initializeMiddlewares();
    this.initializeDatabase();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger);
  }

  private initializeDatabase() {
    connectDB();
  }

  private initializeRoutes() {
    this.app.use('/api/employees', employeeRoutes);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

if (require.main === module) {
  const server = new Server();
  server.start();
}

export default new Server().getApp();
