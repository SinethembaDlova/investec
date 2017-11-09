import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {relationshipSchema} from "../.././entity/relationshipSchema";
import * as CSV from 'csvtojson';


export class HomeRoute {
    constructor() { }

    public landHome(req: Request, res: Response, next: NextFunction): void {

        //connecting into my database
        createConnection({
            type: "mysql",
            host: "localhost",
            username: "root",
            password: "Supr3m3sn3",
            database: "investecDB",
            entities: [
                relationshipSchema
            ],
            synchronize: true,
            logging: false
        }).then(async connection => {

            //accessing my csv file
            const csvFilePath = '/home/bootcamp/Projects/investec/src/api/csv/relationships.csv';

            //converting my my csv file into json
            const converter = new CSV();
            converter.fromFile(csvFilePath, async(err, jsonObj) => {
                // do something with "result", it's json
                if(err){
                  console.log(err);
                }
                else{
                  console.log(jsonObj);
                  for(var i = 0; i < jsonObj.length; i++){

                    console.log("Inserting a new relationshipSchema into the database...");
                    const relationship = new relationshipSchema();
                    relationship.parentEntityId = jsonObj[i]["Parent Entity Id"];
                    relationship.parentEntityName = jsonObj[i]["Parent Entity Name"];
                    relationship.relationshipType = jsonObj[i]["Relationship Type"];
                    relationship.entityId = jsonObj[i]["Entity Id"];
                    relationship.entityName = jsonObj[i]["Entity Name"];
                    await connection.manager.save(relationship);
                    console.log("Saved a new relationshipSchema with id: " + relationship.id);

                    console.log("Loading relationshipSchemas from the database...");
                    const relationshipSchemas = await connection.manager.find(relationshipSchema);
                    console.log("Loaded relationship: ", relationship);

                    console.log("Here you can setup and run express/koa/any other framework.");
                //
                // }).catch(error => console.log(error));

                  }
                }
            });



        res.json({
            status: 200,
            Message: "Hello world"
        })
    })
}
}
