import {Request, Response, NextFunction} from 'express';
import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {entity} from "../.././entity/entity";
import * as CSV from 'csvtojson';



export class HomeRoute {
    constructor() { }

    public getAllEntities(req: Request, res: Response, next: NextFunction): void {

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
                entityRepo.manager.query("delete from entity");

                console.log("Inserting a new relationshipSchema into the database...");
                for (var i = 0; i < jsonObj.length; i++) {

                    const entityTable = new entity();
                    const entities = await entityRepo.find({ entityId: jsonObj[i]["Parent Entity Id"] });

                    if (entities.length === 0) {
                        entityTable.entityId = jsonObj[i]["Parent Entity Id"];
                        entityTable.entityName = jsonObj[i]["Parent Entity Name"];
                        await entityRepo.manager.save(entityTable);
                    }
                }

                for (var i = 0; i < jsonObj.length; i++) {
                    const entityTable = new entity();
                    const entities = await entityRepo.find({ entityId: jsonObj[i]["Entity Id"] });

                    if(entities.length === 0){
                      entityTable.entityId = jsonObj[i]["Entity Id"];
                      entityTable.entityName = jsonObj[i]["Entity Name"];
                      await entityRepo.manager.save(entityTable);
                    }
                }
            }
            //console.log("Loading relationshipSchemas from the database...");
            const entities = await entityRepo.manager.find(entity);
            //console.log("Loaded relationship: ", entities);

            res.json({
                status: 200,
                data: entities
            })
        });
    }
}
