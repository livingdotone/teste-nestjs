import { Module } from '@nestjs/common';
import { PasswordEncoderService } from './passwordencoder/passwordencoder.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  providers: [PasswordEncoderService],
  exports: [PasswordEncoderService],
})
export class CoreModule {}
