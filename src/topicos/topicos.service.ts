import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicoDto } from './dto/create-topico.dto';
import { UpdateTopicoDto } from './dto/update-topico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topico } from './entities/topico.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { MateriaService } from 'src/materia/materia.service';
import { Not } from 'typeorm/browser';

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

  async findAll() {

    return this.topicoRepository.find({
      relations: ['materia']
    })
  }

  async findOne(id: number) {
    const topico = await this.topicoRepository.findOne({
      where: {id},
      relations: ['materia']
    })
    if (!topico) {
      throw new NotFoundException('Topico não encontrado')
    }

    return {
      ...topico,
      userId: topico.materia?.id
    }
  }

  async update(id: number, updateTopicoDto: UpdateTopicoDto) {
   
    const topico = await this.topicoRepository.preload({
      id,
      ...updateTopicoDto
    });

    if (!topico){
      throw new NotFoundException('Topico não encontrado')
    }
    return this.topicoRepository.save(topico)     
  }

  async remove(id: number) {
    const topico = await this.findOne(id)
    if (!topico){
      throw new NotFoundException
    }

    return await this.topicoRepository.delete(id)
  }
}
