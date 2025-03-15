import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequest } from './users.dto';
import { PasswordEncoderService } from 'src/core/passwordencoder/passwordencoder.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<User>,
    private readonly passwordEncoder: PasswordEncoderService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(createUserRequest: CreateUserRequest): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserRequest.email,
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists.');
    }

    createUserRequest.password = await this.passwordEncoder.encode(
      createUserRequest.password,
    );

    return await this.userRepository.save(createUserRequest);
  }

  async find(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }
}
