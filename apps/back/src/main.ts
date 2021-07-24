/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

 import * as express from 'express';
 import {hello, Test} from './app/api'
 const app = express();


 app.get("/api/hello", hello);
 app.get("/api/Test", Test);


 const port = process.env.port || 3333;
 const server = app.listen(port, () => {
   console.log(`Listening at http://localhost:${port}/api`);
 });
 server.on('error', console.error);
