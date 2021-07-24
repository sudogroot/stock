import {Request, Response, NextFunction} from 'express';
import { client } from '../elastic-client';
import {groupBy} from 'lodash'
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

  const marketResult = await client.search<Source>({
    index: 'stock-data',
    size: 10000,
    body: {
      _source: ['market'],
      collapse :{
        field : 'market'
      }
    }
  })

  res.send({
    // todo pagination for names async data in frontend
    names : result.body.hits.hits.map(h =>  h._source.name).sort(),
    market : marketResult.body.hits.hits.map(h =>  h._source.market).sort(),
    maxDate : result.body.aggregations.max_timestamp,
    minDate : result.body.aggregations.min_timestamp
  });
};




export const stockData = async (req:Request,res:Response,next:NextFunction) => {
  const filter =  req.body.stockNames?.map(name => (
    {
      "match_phrase": {
        name,
      }
    }
  ))
  let data = []
  if(filter?.length){
    // todo improve group by  in elastic query
    const result = await client.search<any>({
      index: 'stock-data',
      size: 1000,
      body: {
      sort: [{
            "@timestamp": {
                "order": "asc"
            }
        }],
        query : {
          bool: {
            should: filter,
            "minimum_should_match": 1,
            filter : [
              {
                range: {
                  "@timestamp": {
                    gte: req.body.range[0],
                    lt: req.body.range[1]
                  }
                }
              },
              {match: { market: req.body.market }},
            ]
          },
        }

    }
  })
  data = result.body?.hits.hits
  }
  console.log('++',data)
  res.send({
    // todo improve groupby in elastic query
    data : groupBy(data, '_source.name')
  });
};

