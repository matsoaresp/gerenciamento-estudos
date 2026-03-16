import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgressoDto } from './dto/create-progresso.dto';
import { UpdateProgressoDto } from './dto/update-progresso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Progresso } from './entities/progresso.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProgressoService {

  constructor(
    @InjectRepository(Progresso)
    private readonly progressoRepository: Repository<Progresso>,
    
  ){}
  async create(createProgressoDto: CreateProgressoDto) {

    
    const progress = this.progressoRepository.create({
      porcentagem: createProgressoDto.porcentagem,
      horasEstudadas: createProgressoDto.horasEstudadas,
      topico: {id: createProgressoDto.topicoId }
    })

    if (!progress){
      throw new NotFoundException('Não foi possivel criar o progresso')
    }

    return await this.progressoRepository.save(progress)
  }

  findAll() {
    return `This action returns all progresso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} progresso`;
  }

  async update(id: number, updateProgressoDto: UpdateProgressoDto) {
    const progress = await this.progressoRepository.preload({
      id,
      ...updateProgressoDto
    })
    if (!progress){
      throw new NotFoundException('Dado do progresso não encontrado')
    }
    return await this.progressoRepository.save(progress)
  }

  remove(id: number) {
    return `This action removes a #${id} progresso`;
  }
}
