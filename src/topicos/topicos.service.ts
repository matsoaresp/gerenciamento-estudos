import { Injectable } from '@nestjs/common';
import { CreateTopicoDto } from './dto/create-topico.dto';
import { UpdateTopicoDto } from './dto/update-topico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topico } from './entities/topico.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { MateriaService } from 'src/materia/materia.service';

@Injectable()
export class TopicosService {

  constructor(

    @InjectRepository(Topico)
    private readonly topicoRepository: Repository<Topico>,
    private readonly userService: UserService,
    private readonly materiaService: MateriaService
  ){}
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
