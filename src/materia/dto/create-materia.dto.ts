import { IsNotEmpty, IsString } from "class-validator";

export class CreateMateriaDto {

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    descricao: string;
}
