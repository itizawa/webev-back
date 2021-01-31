import * as express from 'express';
import { todoRoutes } from './todo';

export const setupExpressRoutes = (webevApp: unknown, express: express.Express): void => {
  express.use('/api/v1/', todoRoutes(webevApp));
};
