import { Injectable } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Metas } from './entities/meta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetasService {

  constructor(
    @InjectRepository(Metas)
    private readonly metasRepository: Repository<Metas>
    
  ){}
  async create(createMetaDto: CreateMetaDto) {
    const  meta = this.
  }

  findAll() {
    return `This action returns all metas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meta`;
  }

  update(id: number, updateMetaDto: UpdateMetaDto) {
    return `This action updates a #${id} meta`;
  }

  remove(id: number) {
    return `This action removes a #${id} meta`;
  }
}
