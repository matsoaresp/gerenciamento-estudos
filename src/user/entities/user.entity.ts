import { Materia } from "src/materia/entities/materia.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column() 
    email: string;

    @Column() 
    password: string;

    @OneToMany(() => Materia, (materia) => materia.user)
    materias: Materia[];

}
