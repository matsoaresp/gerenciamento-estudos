import { Topico } from "src/topicos/entities/topico.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Topico)
    @JoinColumn()
    topico: Topico


}
