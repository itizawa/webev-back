import { todoRoutes } from './todo';


export const setupExpressRoutes = (webevApp, express) => {
    express.use('/api/v1/', todoRoutes(webevApp))
}