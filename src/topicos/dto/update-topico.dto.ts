import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicoDto } from './create-topico.dto';

export class UpdateTopicoDto extends PartialType(CreateTopicoDto) {}
