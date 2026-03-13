import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from '../user/user.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaModule } from 'src/materia/materia.module';
import { UserService } from 'src/user/user.service';
import { TopicosModule } from 'src/topicos/topicos.module';

@Module({
  imports: [
    UserModule,
    MateriaModule,
    TopicosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      database: 'gerencia-materias',
      password: '123456',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
