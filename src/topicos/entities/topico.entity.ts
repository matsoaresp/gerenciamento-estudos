import { IsEnum } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TopicosEnum } from "../enum/topicos.enum";
import { Materia } from "src/materia/entities/materia.entity";
import { User } from "src/user/entities/user.entity";
import { Progresso } from "src/progresso/entities/progresso.entity";

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

    @OneToOne(() => Progresso, (progresso) => progresso.topico)
    progresso: Progresso

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

}
