import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Metas {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    horasMeta: number;

    @Column()
    horasAtual: number;

}
