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

interface Source {
  "date": string;
  "@timestamp": string;
  "close_price":number;
  "high_price":number;
  "low_price":number;
  "market":string;
  "open_price":number;
  "volume":number;
  "name" :string;

  }

  interface Name {
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


export const getLinChartFilterOption = async (req:Request,res:Response,next:NextFunction) => {
  const result = await client.search<Source>({
    index: 'stock-data',
    size: 10000,
    body: {
      _source: ['name'],
      collapse :{
        field : 'name'
      },
      aggs:{
        "max_timestamp": {
          "max": {
          "field": "@timestamp"
          }
          },
          "min_timestamp": {
        "min": {
        "field": "@timestamp"
        }
        }
      }
    }
  })




  res.send({
    // todo pagination for names async data in frontend
    names : result.body.hits.hits.map(h =>  h._source.name).sort(),
    maxDate : result.body.aggregations.max_timestamp,
    minDate : result.body.aggregations.min_timestamp
  });
};

