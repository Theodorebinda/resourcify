import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';

@Module({
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
