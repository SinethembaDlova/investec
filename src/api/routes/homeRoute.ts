import {Request, Response, NextFunction} from 'express';
import {createConnection, getRepository} from "typeorm";
import {entity} from "../.././entity/entity";
import {CreateData} from '../modeling/dataCreation';


export class HomeRoute {
    constructor() { }

    public async getAllEntities(req: Request, res: Response, next: NextFunction) {
        var createData = new CreateData();
        //createData.extractingData();
        let entityRepo = getRepository(entity);
        //console.log("Loading relationshipSchemas from the database...");
        const entities = await entityRepo.find({});

        res.json({
            status: 200,
            data: entities
        })
    }
}
