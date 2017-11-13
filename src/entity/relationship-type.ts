import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class relationshipType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    relationshipName: string;
}
