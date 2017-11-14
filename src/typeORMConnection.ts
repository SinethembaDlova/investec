import "reflect-metadata";
import {createConnection} from "typeorm";
import {entity} from "./entity/entity";
import {relationshipType} from "./entity/relationship-type";
import {relationship} from "./entity/relationship";
import {childRelation} from "./entity/childRelation";

//connecting into my database
export class DbConnect {
    constructor() { }

    public connect() {
        createConnection({
            type: "mysql",
            host: "localhost",
            username: "root",
            password: "Supr3m3sn3",
            database: "investecDB",
            entities: [
                entity, relationshipType, relationship, childRelation
            ],
            synchronize: true,
            logging: false
        }).then(()=>{
          console.log('Connected to the database');
        })
    }
}
