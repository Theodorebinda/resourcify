import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';


@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporte PrismaService pour d'autres modules
})
export class PrismaModule {}
