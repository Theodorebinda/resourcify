import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Connecte Prisma au démarrage
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Déconnecte Prisma à l'arrêt
  }
}
