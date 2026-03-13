import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MateriaService {

  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
    private readonly userService: UserService

  ) {}
  async create(createMateriaDto: CreateMateriaDto){
    const materia = this.materiaRepository.create(createMateriaDto)
    return await this.materiaRepository.save(materia)
  }

  async findAll() {
    return this.materiaRepository.find({
      relations: ['user']
    });
  }

  async findOne(id: number) {
    const materia = await this.materiaRepository.findOne({
      where: {id},
      relations: ['user']
    });
    if (!materia){
      throw new NotFoundException('Materia não encontrada!')
    }
    return materia
  }

  async update(id: number, updateMateriaDto: UpdateMateriaDto) {

    const user = await this.userService.findOne(id)

    if (!user){
      throw new NotFoundException('Usuario não encontrado')
    }
    const materia = await this.materiaRepository.preload({
      id,
      ...updateMateriaDto
    });

    if (!materia){
      throw new NotFoundException('Materia não encontrada')
    }

    return this.materiaRepository.save(materia)
  }

  async remove(id: number) {
    const materia  = await this.findOne(id)

    if (!materia) {
      throw new NotFoundException('Materia não encontrada');
    }

    await this.materiaRepository.delete(materia);
    return {message: 'Matéria removida com sucesso'};
  }
}
