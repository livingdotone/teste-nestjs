import { Test, TestingModule } from '@nestjs/testing';
import { PasswordEncoderService } from './passwordencoder.service';

describe('PasswordencoderService', () => {
  let service: PasswordEncoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordEncoderService],
    }).compile();

    service = module.get<PasswordEncoderService>(PasswordEncoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
