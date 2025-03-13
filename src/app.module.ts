import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TesteEntity } from './teste.entity';
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
      entities: [TesteEntity],
    }),
    TypeOrmModule.forFeature([TesteEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, PasswordEncoderService],
})
export class AppModule {}
