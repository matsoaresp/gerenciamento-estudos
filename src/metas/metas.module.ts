import { Module } from '@nestjs/common';
import { MetasService } from './metas.service';
import { MetasController } from './metas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metas } from './entities/meta.entity';

@Module({
  controllers: [MetasController],
  imports: [TypeOrmModule.forFeature([Metas])
],
  exports: [MetasModule],
  providers: [MetasService],
})
export class MetasModule {}
