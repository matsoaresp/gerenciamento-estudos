import { IsEnum } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TopicosEnum } from "../enum/topicos.enum";
import { Materia } from "src/materia/entities/materia.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Topico {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column({type: 'enum',
        enum: TopicosEnum,
        default: TopicosEnum.PENDENTE
    })
    status: TopicosEnum
    
    @ManyToOne(() => Materia, (materia) => materia.topico, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'materiaId' })
    materia: Materia;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

}
