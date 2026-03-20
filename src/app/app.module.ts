import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UserModule } from '../user/user.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaModule } from 'src/materia/materia.module';
import { UserService } from 'src/user/user.service';
import { TopicosModule } from 'src/topicos/topicos.module';
import { ProgressoModule } from 'src/progresso/progresso.module';
import { MetasModule } from 'src/metas/metas.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';

@Module({
  imports: [
    UserModule,
    MateriaModule,
    TopicosModule,
    ProgressoModule,
    MetasModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
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
