import { IsNumber } from "class-validator";

export class CreateProgressoDto {    
    @IsNumber()
    porcentagem: number;

    @IsNumber()
    horasEstudadas: number;

    @IsNumber()
    topicoId: number
}
