import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserRequest } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey('all-users')
  @CacheTTL(120)
  @Get('/all')
  getAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserRequest: CreateUserRequest) {
    return this.usersService.create(createUserRequest);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return req.user;
  }
}
