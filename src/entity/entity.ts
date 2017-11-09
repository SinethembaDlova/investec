import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class entity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    parentEntityId: number;

    @Column()
    parentEntityName: string;

    @Column()
    entityId: number;

    @Column()
    entityName: string;
}
