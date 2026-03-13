import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMateriaDto {

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsNumber()
    userId: number;
}
