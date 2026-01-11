import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { InteractionsModule } from '../interactions/interactions.module';

@Module({
  imports: [InteractionsModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
