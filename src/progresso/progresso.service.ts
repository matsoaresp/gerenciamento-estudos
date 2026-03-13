import { Injectable } from '@nestjs/common';
import { CreateProgressoDto } from './dto/create-progresso.dto';
import { UpdateProgressoDto } from './dto/update-progresso.dto';

@Injectable()
export class ProgressoService {
  create(createProgressoDto: CreateProgressoDto) {
    return 'This action adds a new progresso';
  }

  findAll() {
    return `This action returns all progresso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} progresso`;
  }

  update(id: number, updateProgressoDto: UpdateProgressoDto) {
    return `This action updates a #${id} progresso`;
  }

  remove(id: number) {
    return `This action removes a #${id} progresso`;
  }
}
