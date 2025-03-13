import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  AppService,
  CreateUserRequest,
  ValidateUserRequest,
} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createNewTeste(@Body() ctr: CreateUserRequest) {
    return this.appService.create(ctr);
  }

  @Post('/validate')
  validate(@Body() dataValidate: ValidateUserRequest) {
    return this.appService.validate(dataValidate);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
