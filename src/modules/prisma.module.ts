import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  providers: [
    {
      provide: PrismaClient,
      useClass: PrismaClient,
    },
  ],
  exports: [PrismaClient],
})
export class PrismaModule {}
