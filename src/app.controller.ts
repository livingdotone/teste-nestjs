import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  AppService,
  CreateTesteRequest,
  ValidateTesteRequest,
} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createNewTeste(@Body() ctr: CreateTesteRequest) {
    return this.appService.create(ctr);
  }

  @Post("/validate")
  validate(@Body() dataValidate: ValidateTesteRequest) {
    return this.appService.validate(dataValidate);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
