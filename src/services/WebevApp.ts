import { Server as httpServer, createServer } from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import { Server as SocketServer, Socket } from 'socket.io';
import mongoSanitize from 'express-mongo-sanitize';
import { requestLoggerMiddleware } from '../middlewares/request-logger';
import { setupExpressRoutes } from '../routes';

export class WebevApp {
  app: express.Express;
  port: number;
  httpServer: httpServer;
  io: SocketServer;

  constructor() {
    this.app = null;
    this.port = parseInt(process.env.PORT) || 8000;
    this.httpServer = null;
  }

  async init(): Promise<void> {
    await this.setupExpress();
    await this.setupDB();

    this.setupSocketio();

    // setup Express Routes
    await this.setupRoutes();

    this.httpServer.listen(this.port, () => {
      console.log(`Express app listening at http://localhost:${this.port}`);
    });
  }

  setupExpress(): void {
    this.app = express();

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(mongoSanitize());

    this.app.use(requestLoggerMiddleware);
    this.httpServer = createServer(this.app);
  }

  setupDB(): Promise<typeof import('mongoose')> {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/test';
    return mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
  }

  setupRoutes(): void {
    setupExpressRoutes(this, this.app);
  }

  setupSocketio(): void {
    this.io = new SocketServer(this.httpServer, {
      cors: {
        // TODO prevent
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connection', (socket: Socket) => {
      console.log('id: ' + socket.id + ' is connected');

      // Issue a token to the connected user
      this.io.to(socket.id).emit('issue-token', { socketId: socket.id });
    });
  }
}
