import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Preference, Prisma } from '@prisma/client';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PreferenceCreateInput): Promise<Preference> {
    return this.prisma.preference.create({ data });
  }

  async findAll(): Promise<Preference[]> {
    return this.prisma.preference.findMany();
  }

  async findOne(id: number): Promise<Preference | null> {
    return this.prisma.preference.findUnique({ where: { id } });
  }

  async getUserPreferences(userId: number) {
    return this.prisma.userPreference.findMany({
      where: { userId },
      include: { preference: true },
    });
  }
}
