import { Controller, Get, Param } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get(':userId')
  getFeed(@Param('userId') userId: string) {
    return this.feedService.getFeed(+userId);
  }
}
