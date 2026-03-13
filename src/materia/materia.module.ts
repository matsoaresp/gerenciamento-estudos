import { Module } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [MateriaController],
  providers: [MateriaService],
  imports: [
    TypeOrmModule.forFeature([Materia]),
    UserModule,
  ],
  exports: [MateriaService]
})
export class MateriaModule {}
