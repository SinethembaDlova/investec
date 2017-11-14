import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class relationship {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    parentEntityId: number;

    @Column()
    relationshipTypeId: number;
}
