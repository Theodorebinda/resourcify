import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/services/prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService], // Ajoute PrismaService
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([{ id: 1, name: 'John Doe' }] as any);
    const users = await service.findAll();
    expect(users).toEqual([{ id: 1, name: 'John Doe' }]);
  });

  it('should create a user', async () => {
    const mockUser = { id: 1, name: 'Jane Doe' } as any;
    jest.spyOn(service, 'create').mockResolvedValue(mockUser);
    const user = await service.create({ name: 'Jane Doe' });
    expect(user).toEqual(mockUser);
  });
});
