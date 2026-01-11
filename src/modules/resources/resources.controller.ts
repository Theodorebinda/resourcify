import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { Prisma } from '@prisma/client';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  create(@Body() data: Prisma.ResourceCreateInput) {
    return this.resourcesService.create(data);
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(+id);
  }
}
