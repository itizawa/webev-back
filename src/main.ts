import { app } from './app';
import * as http from 'http';

import  {ExpressApp} from './services/expressApp';

const PORT = 8080;
// const server = http.createServer(app);
// server.listen(PORT);
// server.on('listening', async () => {
// 	console.info(`Listening on port ${PORT}`);
// 	mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology:true});
// 	mongoose.connection.on('open', () => {
// 		console.info('Connected to Mongo.');
// 	});
// 	mongoose.connection.on('error', (err: any) => {
// 		console.error(err);
// 	});
// });


/** **********************************
 *          Main Process
 ********************************** */

 const expressApp = new ExpressApp()