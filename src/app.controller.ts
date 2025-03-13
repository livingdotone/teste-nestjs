import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, CreateTesteRequest } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createNewTeste(@Body() ctr: CreateTesteRequest) {
    return this.appService.create(ctr);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
