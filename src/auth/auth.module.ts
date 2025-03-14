import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { UsersModule } from 'src/user/users.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
    UsersModule,
    CoreModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
