import * as express from 'express';
import {Request, Response, NextFunction} from 'express';

export class HomeRoute{
  constructor(){}

  public landHome(req:Request, res:Response, next:NextFunction): void{
    res.json({
      status: 200,
      Message: "Hello world"
    })
  }
}
