import { Injectable } from '@nestjs/common';
import { CreateProgressoDto } from './dto/create-progresso.dto';
import { UpdateProgressoDto } from './dto/update-progresso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Progresso } from './entities/progresso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgressoService {

  constructor(
    @InjectRepository(Progresso)
    private readonly progressoRepository: Repository<Progresso>,
    
  ){}
  create(createProgressoDto: CreateProgressoDto) {
     
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
