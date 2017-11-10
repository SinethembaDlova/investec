import {Request, Response, NextFunction} from 'express';
import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {entity} from "../.././entity/entity";
import * as CSV from 'csvtojson';


export class HomeRoute {
    constructor() { }

    public landHome(req: Request, res: Response, next: NextFunction): void {

        let entityRepo = getRepository(entity);
        //accessing my csv file
        const csvFilePath = '/home/bootcamp/Projects/investec/src/api/csv/relationships.csv';
        //converting my my csv file into json
        const converter = new CSV();
        converter.fromFile(csvFilePath, async (err, jsonObj) => {
            // do something with "result", it's json
            if (err) {
                console.log(err);
            }
            else {
                console.log(jsonObj);

                //clear the table first
                entityRepo.manager.query("detele from relationshipSchema");

                for (var i = 0; i < jsonObj.length; i++) {

                    console.log("Inserting a new relationshipSchema into the database...");
                    const entityTable = new entity();
                    entityTable.parentEntityId = jsonObj[i]["Parent Entity Id"];
                    entityTable.parentEntityName = jsonObj[i]["Parent Entity Name"];
                    entityTable.entityId = jsonObj[i]["Entity Id"];
                    entityTable.entityName = jsonObj[i]["Entity Name"];
                    await entityRepo.manager.save(entityTable);
                    console.log("Saved a new relationshipSchema with id: " + entityTable.id);
                }
            }
            console.log("Loading relationshipSchemas from the database...");
            const entities = await entityRepo.manager.find(entity);
            console.log("Loaded relationship: ", entities);

            res.json({
                status: 200,
                data: entities
            })
        });
    }
}
