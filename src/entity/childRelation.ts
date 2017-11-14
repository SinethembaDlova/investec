import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class childRelation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    childEntityId: number;

    @Column()
    relationshipTypeId: number;
}
