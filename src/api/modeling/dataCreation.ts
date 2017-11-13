import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {entity} from "../.././entity/entity";
import {relationshipType} from "../.././entity/relationship-type";
import * as CSV from 'csvtojson';

export class CreateData{

  constructor(){}

  public extractingData(){
    let entityRepo = getRepository(entity);
    let rshipTypeRepo = getRepository(relationshipType);
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
            //adding parrent entities
            for (var i = 0; i < jsonObj.length; i++) {
                const entityTable = new entity();
                const entities = await entityRepo.find({ entityId: jsonObj[i]["Parent Entity Id"] });

                if (entities.length === 0) {
                    entityTable.entityId = jsonObj[i]["Parent Entity Id"];
                    entityTable.entityName = jsonObj[i]["Parent Entity Name"];
                    await entityRepo.manager.save(entityTable);
                }
            }

            //adding child entities
            for (var i = 0; i < jsonObj.length; i++) {
                const entityTable = new entity();
                const entities = await entityRepo.find({ entityId: jsonObj[i]["Entity Id"] });

                if(entities.length === 0){
                  entityTable.entityId = jsonObj[i]["Entity Id"];
                  entityTable.entityName = jsonObj[i]["Entity Name"];
                  await entityRepo.manager.save(entityTable);
                }
            }

            //adding all the relationship types
            for(var i = 0; i < jsonObj.length; i++){
              const relationshipTypeTable = new relationshipType();
              const relationshipTypes = await rshipTypeRepo.find({relationshipName: jsonObj[i]["Relationship Type"]});

              if(relationshipTypes.length === 0){
                relationshipTypeTable.relationshipName = jsonObj[i]["Relationship Type"];
                await entityRepo.manager.save(relationshipTypeTable);
              }
            }
        }
    });
  }

}
