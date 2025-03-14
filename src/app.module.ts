import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { CoreModule } from './core/core.module';

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
      migrations: ['../migrations/*.ts'],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    UsersModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
