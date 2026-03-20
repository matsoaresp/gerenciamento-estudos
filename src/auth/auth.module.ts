import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => {
        const jwt = ConfigService.get('jwt');

        return {
          secret: jwt.secret,
          signOptions: {
            audience: jwt.audience,
            issuer: jwt.issuer,
            expiresIn: jwt.jwtTtl,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ],

  exports: [JwtModule, ConfigModule]
})
export class AuthModule {}
