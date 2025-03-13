import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/teste.entity';
import { PasswordEncoderService } from './password-encoder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'meubancopessoal',
      password: 'meubancopessoal',
      database: 'teste_nestjs',
      synchronize: true,
      entities: [UserEntity],
      migrations: ["../migrations/*.ts"]
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, PasswordEncoderService],
})
export class AppModule {}
