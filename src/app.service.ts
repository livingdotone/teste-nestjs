import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teste, TesteEntity } from './teste.entity';
import { Repository } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordEncoderService } from './password-encoder.service';

export class CreateTesteRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class ValidateTesteRequest {
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
    private passwordEncoder: PasswordEncoderService,
  ) {}

  async create(createTesteRequest: CreateTesteRequest): Promise<Teste> {
    const existingTeste = await this.testeRepository.findOneBy({
      email: createTesteRequest.email,
    });
    if (existingTeste) {
      throw new BadRequestException('Email already exists.');
    }

    createTesteRequest.password = await this.passwordEncoder.encode(
      createTesteRequest.password,
    );

    return await this.testeRepository.save(createTesteRequest);
  }

  async validate(validate: ValidateTesteRequest) {
    const testeFind = await this.testeRepository.findOneBy({
      email: validate.email,
    });
    if (testeFind == null) {
      throw new BadRequestException('Teste not found.');
    }

    const valid = await this.passwordEncoder.matches(
      validate.password,
      testeFind.password,
    );
    if (valid) {
      return true;
    }
    return false;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
