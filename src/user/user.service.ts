import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/auth/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashingService,
  ){}
  async create(createUserDto: CreateUserDto) {

    const passwordHash = await this.hashService.hash(
      createUserDto.password
    )

    const userData = {
      nome: createUserDto.nome,
      email: createUserDto.email,
      password: passwordHash,
    }
  
    const existUser = await this.userRepository.findOne({
      where: {
        nome: createUserDto.nome,
        email: createUserDto.email,
      }
    })

    if (existUser){
      throw new UnauthorizedException('Usuario já cadastrado')
    }
    const create = this.userRepository.create(userData);
    return await this.userRepository.save(create);
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['materias', 'materias.topico'],
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
