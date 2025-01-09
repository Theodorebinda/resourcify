import { Injectable } from '@nestjs/common';
import { PrismaClient, Resource } from '@prisma/client';

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Resource[]> {
    return this.prisma.resource.findMany();
  }

  async findOne(id: number): Promise<Resource | null> {
    return this.prisma.resource.findUnique({ where: { id } });
  }

  async create(data: any): Promise<Resource> {
    return this.prisma.resource.create({ data });
  }

  async update(id: number, data: any): Promise<Resource> {
    return this.prisma.resource.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Resource> {
    return this.prisma.resource.delete({ where: { id } });
  }
}
