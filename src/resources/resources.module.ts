import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { PrismaModule } from 'src/modules/prisma.module';
import { ResourcesController } from './ressources.controller';

@Module({
  imports: [PrismaModule], // Ajout du module Prisma
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
