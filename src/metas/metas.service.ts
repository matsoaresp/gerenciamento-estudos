import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Metas } from './entities/meta.entity';
import { Repository } from 'typeorm';
import { Topico } from 'src/topicos/entities/topico.entity';

@Injectable()
export class MetasService {

  constructor(
    @InjectRepository(Metas)
    private readonly metasRepository: Repository<Metas>,
    @InjectRepository(Topico)
    private readonly topicosRepository: Repository<Topico>,
    
  ){}
  async create(createMetaDto: CreateMetaDto) {

    const topico = await this.topicosRepository.findOne({ where: { id: createMetaDto.topicoId } });

    if (!topico) {
      throw new NotFoundException('Topico não encontrado')
    }
    const meta = this.metasRepository.create({
      titulo: createMetaDto.titulo,
      descricao: createMetaDto.descricao,
      horasMeta: createMetaDto.horasMeta,
      horasAtual: createMetaDto.horasAtual,
      topico
    })

    if (!meta){
      throw new NotFoundException('Erro ao criar meta')
    }

   return await this.metasRepository.save(meta)
  }

  async findAll() {
    return await this.metasRepository.find({
      relations: ['topicos']
    })    
  }

  async findOne(id: number) {
    const meta = this.metasRepository.findOne({
      where: {id},
      relations: ['topicos']
    })

    if (!meta) {
      throw new NotFoundException ('Registro de meta não econtrado')
    }
  }

  async update(id: number, updateMetaDto: UpdateMetaDto) {
    const meta =  await this.metasRepository.preload({
      id,
      ...updateMetaDto
    })

    if (!meta){
      throw new NotFoundException('Registro de meta não encontrado')
    }

    return await this.metasRepository.save(meta)
  }

  remove(id: number) {
    return `This action removes a #${id} meta`;
  }
}
