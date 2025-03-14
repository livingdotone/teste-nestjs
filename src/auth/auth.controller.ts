import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRequest } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() authRequest: AuthRequest) {
    return this.authService.signIn(authRequest);
  }
}
