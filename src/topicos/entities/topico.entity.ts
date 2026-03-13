import { IsEnum } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TopicosEnum } from "../enum/topicos.enum";
import { Materia } from "src/materia/entities/materia.entity";

@Entity()
export class Topico {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    descricao: string;

    @Column({type: 'enum',
        enum: TopicosEnum,
        default: TopicosEnum.PENDENTE
    })
    status: TopicosEnum
    
    @ManyToMany(() => Materia, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'materia_id'})
    materiaId: Materia

}
