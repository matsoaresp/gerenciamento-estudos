import { IsNumber } from "class-validator";
import { OneToMany } from "typeorm";

export class CreateProgressoDto {    
    @IsNumber()
    porcentagem: number;

    @IsNumber()
    horasEstudadas: number;

   
    @IsNumber()
    topicoId: number
}
