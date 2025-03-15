import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordEncoderService {
  async encode(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 10,
      timeCost: 2,
      parallelism: 1,
    });
  }

  async matches(password: string, hashedPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }
}
