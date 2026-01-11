import { Controller, Post, Body, Get } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { Prisma } from '@prisma/client';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  create(@Body() data: { userId: number; resourceId: number; type: any }) {
    // Simplified body for demo, normally would use DTOs
    return this.interactionsService.create({
      type: data.type,
      user: { connect: { id: data.userId } },
      resource: { connect: { id: data.resourceId } },
      weight: 1.0, // Default base weight, service logic handles dynamic weighting
    });
  }

  @Get()
  findAll() {
    return this.interactionsService.findAll();
  }
}
