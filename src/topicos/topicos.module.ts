import { Module } from '@nestjs/common';
import { TopicosService } from './topicos.service';
import { TopicosController } from './topicos.controller';
import { MateriaModule } from 'src/materia/materia.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topico } from './entities/topico.entity';

@Module({
  controllers: [TopicosController],
  providers: [TopicosService],
  imports: [
      TypeOrmModule.forFeature([Topico]),
      UserModule,
      MateriaModule
    ],
})
export class TopicosModule {}
