import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserRequest } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

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
