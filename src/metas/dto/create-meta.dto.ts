import { IsString } from "class-validator";

export class CreateMetaDto {

    @IsString()
    titulo: string

    @IsString()
    descricao: string;

    @IsString()
    horasMeta: number;

    @IsString()
    horasAtual: number;

}
