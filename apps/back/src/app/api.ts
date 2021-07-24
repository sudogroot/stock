import {Request, Response, NextFunction} from 'express';
import { client } from '../elastic-client';
export const hello = (req:Request,res:Response,next:NextFunction) => {
    res.send("Hello API");
};


interface Source {
"date": string;
"@timestamp": string;
"close_price":number;
"high_price":number;
"low_price":number;
"market":string;
"open_price":number;
"volume":number;

}

export const Test = async (req:Request,res:Response,next:NextFunction) => {
  const result = await client.search<Source>({
    index: 'stock-data',
    body: {
      query: {
        match: { name: 'A' }
      }
    }
  })


  console.log('r',result.body.hits.hits)
  res.send("Hello API");
};
