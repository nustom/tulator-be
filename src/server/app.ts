import express, { Request, Response } from 'express';
import cors from 'cors';
import { ServerInterface } from './app.interface';
import { connectToDatabase } from '../config/db';
import baseRouter from '../modules/baseRouter';
class Server implements ServerInterface {
  async server(): Promise<express.Application> {
    await connectToDatabase();
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/api/v1', baseRouter.routes);

    app.get("/", (_req: Request, res: Response): Response => {
      return res.send("Welcome to express-create application! ");
    });

    return app;
  }
}

export default new Server();
