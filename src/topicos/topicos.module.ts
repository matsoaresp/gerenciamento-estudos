import { Module } from '@nestjs/common';
import { TopicosService } from './topicos.service';
import { TopicosController } from './topicos.controller';

@Module({
  controllers: [TopicosController],
  providers: [TopicosService],
})
export class TopicosModule {}
