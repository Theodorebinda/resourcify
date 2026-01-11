import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { PreferencesModule } from './modules/preferences/preferences.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { InteractionsModule } from './modules/interactions/interactions.module';
import { FeedModule } from './modules/feed/feed.module';
import { MatchingModule } from './modules/matching/matching.module';
import { DiscussionsModule } from './modules/discussions/discussions.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PreferencesModule,
    ResourcesModule,
    InteractionsModule,
    FeedModule,
    MatchingModule,
    DiscussionsModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
