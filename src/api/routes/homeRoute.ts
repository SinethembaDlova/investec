import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {relationshipSchema} from "../.././entity/relationshipSchema";

export class HomeRoute{
  constructor(){}

  public landHome(req:Request, res:Response, next:NextFunction): void{

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

        console.log("Inserting a new relationshipSchema into the database...");
        const relationship = new relationshipSchema();
        relationship.parentEntityId = 0;
        relationship.parentEntityName = "";
        relationship.relationshipType = "";
        relationship.entityId = 0;
        relationship.entityName = "";
        await connection.manager.save(relationship);
        console.log("Saved a new relationshipSchema with id: " + relationship.id);

        console.log("Loading relationshipSchemas from the database...");
        const relationshipSchemas = await connection.manager.find(relationshipSchema);
        console.log("Loaded relationship: ", relationship);

        console.log("Here you can setup and run express/koa/any other framework.");

    }).catch(error => console.log(error));

    res.json({
      status: 200,
      Message: "Hello world"
    })
  }
}
