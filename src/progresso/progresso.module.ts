import { Module } from '@nestjs/common';
import { ProgressoService } from './progresso.service';
import { ProgressoController } from './progresso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progresso } from './entities/progresso.entity';
import { TopicosEnum } from 'src/topicos/enum/topicos.enum';
import { TopicosModule } from 'src/topicos/topicos.module';

@Module({
  controllers: [ProgressoController],
  providers: [ProgressoService],
  imports: [
    TypeOrmModule.forFeature([Progresso]),
    TopicosModule,
  ]
})
export class ProgressoModule {}
