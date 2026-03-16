import { IsNumber, IsString } from "class-validator";

export class CreateMetaDto {

    @IsString()
    titulo: string;

    @IsString()
    descricao: string;

    @IsNumber()
    horasMeta: number;

    @IsNumber()
    horasAtual: number;

    @IsNumber()
    topicoId: number;
}   
