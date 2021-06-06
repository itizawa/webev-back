import * as express from 'express';
import { WebevApp } from '../services/WebevApp';
import { directories } from './directories';
import { pages } from './pages';
import { users } from './users'

export const setupExpressRoutes = (webevApp: WebevApp, express: express.Express): void => {
  express.use('/api/v1/directories', directories());
  express.use('/api/v1/pages', pages(webevApp));
  express.use('/api/v1/users', users(webevApp));
};
