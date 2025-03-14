import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { AuthRequest } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordEncoderService } from 'src/core/passwordencoder/passwordencoder.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordEncoder: PasswordEncoderService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authRequest: AuthRequest): Promise<{ access_token: string }> {
    const user = await this.usersService.find(authRequest.email);
    if (!user) {
      throw new BadRequestException('User not exists.');
    }
    const passwordMatches = await this.passwordEncoder.matches(
      authRequest.password,
      user.password,
    );
    if (passwordMatches) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new BadRequestException('Email or password incorrect.');
  }
}
