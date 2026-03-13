import { Injectable } from '@nestjs/common';
import { CreateTopicoDto } from './dto/create-topico.dto';
import { UpdateTopicoDto } from './dto/update-topico.dto';

@Injectable()
export class TopicosService {
  create(createTopicoDto: CreateTopicoDto) {
    return 'This action adds a new topico';
  }

  findAll() {
    return `This action returns all topicos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topico`;
  }

  update(id: number, updateTopicoDto: UpdateTopicoDto) {
    return `This action updates a #${id} topico`;
  }

  remove(id: number) {
    return `This action removes a #${id} topico`;
  }
}
