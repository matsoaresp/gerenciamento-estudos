import { Module } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [MateriaController],
  providers: [MateriaService],
  imports: [
    TypeOrmModule.forFeature([Materia]),
    UserService,
  ]
})
export class MateriaModule {}
