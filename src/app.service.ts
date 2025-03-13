import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teste, TesteEntity } from './teste.entity';
import { Repository } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTesteRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TesteEntity) private testeRepository: Repository<Teste>,
  ) {}

  async create(createTesteRequest: CreateTesteRequest): Promise<Teste> {
    const existingTeste = await this.testeRepository.findOneBy({
      email: createTesteRequest.email,
    });
    if (existingTeste) {
      throw new BadRequestException('Email already exists.');
    }

    return await this.testeRepository.save(createTesteRequest);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
