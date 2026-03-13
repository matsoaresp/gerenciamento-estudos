import { IsNotEmpty, IsSemVer, IsString } from "class-validator";

export class CreateTopicoDto {

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    descricao: string

    
}
