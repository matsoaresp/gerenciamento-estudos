import { Injectable, NotFoundException } from '@nestjs/common';
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
  async create(createTopicoDto: CreateTopicoDto) {
      const user = await this.userService.findOne(createTopicoDto.userId)
      if (!user){
        throw new NotFoundException('Usuario não encontrado')
      }
      const materia = await this.materiaService.findOne(createTopicoDto.materiaId)
      if (!materia) {
        throw new NotFoundException('Materia não encontrada')
      }

      const topico = this.topicoRepository.create({
        titulo: createTopicoDto.titulo,
        descricao: createTopicoDto.descricao,
        materia 
      })

      return await this.topicoRepository.save(topico)
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
