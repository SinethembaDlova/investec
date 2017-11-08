import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class relationshipSchema {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    parentEntityId: number;

    @Column()
    parentEntityName: string;

    @Column()
    relationshipType: string;

    @Column()
    entityId: number;

    @Column()
    entityName: string;
}
