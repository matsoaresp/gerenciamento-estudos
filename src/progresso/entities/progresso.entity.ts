import { Topico } from "src/topicos/entities/topico.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Progresso {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Topico)
    @JoinColumn()
    topico: Topico

    @Column({default: 0})
    porcentagem: number;

    @Column({name: 'horas_estudadas'})
    horasEstudadas: number

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date
}
