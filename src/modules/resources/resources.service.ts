import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Resource } from '@prisma/client';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ResourceCreateInput): Promise<Resource> {
    return this.prisma.resource.create({
      data,
      include: {
        tags: { include: { preference: true } },
      },
    });
  }

  async findAll(): Promise<Resource[]> {
    return this.prisma.resource.findMany({
      include: {
        tags: { include: { preference: true } },
        author: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }

  async findOne(id: number): Promise<Resource | null> {
    return this.prisma.resource.findUnique({
      where: { id },
      include: {
        tags: { include: { preference: true } },
        author: true,
      },
    });
  }
}
