import {Request, Response, NextFunction} from 'express';
import {createConnection, getRepository} from "typeorm";
import {entity} from "../.././entity/entity";

export class HomeRoute {
    constructor() { }

    public getAllEntities(req: Request, res: Response, next: NextFunction): void {

      let entityRepo = getRepository(entity);
      //console.log("Loading relationshipSchemas from the database...");
      const entities = entityRepo.manager.find(entity).then(()=>{
        res.json({
          status: 200,
          data: entities
        })
      })
    }
}
