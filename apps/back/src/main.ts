/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

 import * as express from 'express';
 import {hello, Test, getLinChartFilterOption} from './app/api'
 import * as cors from 'cors';

 const app = express();
 app.use(cors({ origin: '*', maxAge: 7200 }));


 app.get("/api/hello", hello);
 app.get("/api/Test", Test);
 app.get("/api/linefilters", getLinChartFilterOption);


 const port = process.env.port || 3333;
 const server = app.listen(port, () => {
   console.log(`Listening at http://localhost:${port}/api`);
 });
 server.on('error', console.error);
