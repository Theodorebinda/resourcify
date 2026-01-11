import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { Prisma } from '@prisma/client';

@Controller('discussions')
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Post()
  create(@Body() data: Prisma.DiscussionCreateInput) {
    return this.discussionsService.create(data);
  }

  @Get('preference/:id')
  findByPreference(@Param('id') id: string) {
    return this.discussionsService.findByPreference(+id);
  }

  @Post(':id/join')
  join(@Param('id') id: string, @Body('userId') userId: number) {
    return this.discussionsService.joinDiscussion(userId, +id);
  }
}
