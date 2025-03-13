import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserEntity } from './entities/teste.entity';
import { Repository } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordEncoderService } from './password-encoder.service';

export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class ValidateUserRequest {
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
    @InjectRepository(UserEntity) private testeRepository: Repository<User>,
    private passwordEncoder: PasswordEncoderService,
  ) {}

  async create(createTesteRequest: CreateUserRequest): Promise<User> {
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

  async validate(validate: ValidateUserRequest) {
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
