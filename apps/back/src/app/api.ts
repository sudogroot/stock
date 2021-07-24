import {Request, Response, NextFunction} from 'express';

export const hello = (req:Request,res:Response,next:NextFunction) => {
    res.send("Hello API");
};
