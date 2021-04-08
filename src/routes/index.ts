import * as express from 'express';
import { WebevApp } from '../services/WebevApp';
import { directories } from './directories';
import { pages } from './pages';

export const setupExpressRoutes = (webevApp: WebevApp, express: express.Express): void => {
  express.use('/api/v1/directories', directories());
  express.use('/api/v1/pages', pages(webevApp));
};
