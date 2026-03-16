import { Module } from '@nestjs/common';
import { ProgressoService } from './progresso.service';
import { ProgressoController } from './progresso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progresso } from './entities/progresso.entity';
import { TopicosModule } from 'src/topicos/topicos.module';
import { Topico } from 'src/topicos/entities/topico.entity';
import { Metas } from 'src/metas/entities/meta.entity';

@Module({
  controllers: [ProgressoController],
  providers: [ProgressoService],
  imports: [
    TypeOrmModule.forFeature([
      Progresso,
      Topico,
      Metas
    ]),
    TopicosModule,
  ],
  exports: [ProgressoService]
})
export class ProgressoModule {}