import {Server} from './api/server';
import {HomeRoute} from './api/routes/homeRoute';

import "reflect-metadata";
import {createConnection} from "typeorm";
import {relationshipSchema} from "./entity/relationshipSchema";

createConnection().then(async connection => {

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


var server = new Server();
var homeRoute = new HomeRoute

server.app.get('/', homeRoute.landHome);
