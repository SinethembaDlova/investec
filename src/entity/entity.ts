import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class entity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entityId: number;

    @Column()
    entityName: string;
}
