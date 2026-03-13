import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}
  async create(createUserDto: CreateUserDto) {

    
    const create = this.userRepository.create(createUserDto);
    return await this.userRepository.save(create);
  }

  async findAll() {
    const users = await this.userRepository.find({
      order:{
        id: 'asc'
      }
    })
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {id}
    });
    if (!user){
      throw new NotFoundException("Usuario não encontrado")
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      id,
      nome: updateUserDto?.nome,
      email: updateUserDto?.email,
    });

    if (!user){
      throw new NotFoundException("Usuario não encontrado")
    }
    return await this.userRepository.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)

    if (!user){
      throw new NotFoundException('Usuaio não encontrado')
    }

    await this.userRepository.delete(user)
    return {message: 'Usuario removido'}
  }
}
