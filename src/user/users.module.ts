import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CoreModule } from 'src/core/core.module';
import { UserController } from './user.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CoreModule, CacheModule.register()],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
