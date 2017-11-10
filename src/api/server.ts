//importing my dependencies
import * as express from 'express';
import {Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import {createConnection} from 'typeorm';
import {DbConnect} from '../typeORMConnection';

var dbConnect = new DbConnect();
//Sever
export class Server {

    public app: express.Application;
    constructor() {

        this.app = express();
        this.config();
        //this.routes();
    }

    public config() {

      //db
        dbConnect.connect();
        //config my dependencies
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //morgan logger
        this.app.use(logger("dev"));

        this.app.use((req: Request, res:Response, next:NextFunction) =>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
                return res.status(200).json({});
            }
            next();
        })


        //run Server
        const port = process.env.PORT || 5002;
        this.app.listen(port, () => console.log("Server running on port: " + port));

    }
}
