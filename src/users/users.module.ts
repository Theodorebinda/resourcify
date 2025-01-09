import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/services/prisma.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService], // Exporte le service pour d'autres modules
})
export class UsersModule {}
