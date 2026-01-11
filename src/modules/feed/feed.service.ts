import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  async getFeed(userId: number) {
    // 1. Get User Preferences with Weights
    const userPrefs = await this.prisma.userPreference.findMany({
      where: { userId },
      orderBy: { weight: 'desc' }, // Top interests first
    });

    if (userPrefs.length === 0) {
      // Cold start: Return recent popular resources
      return this.prisma.resource.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
      });
    }

    // 2. Fetch High-Scoring Resources
    // Strategy: Get resources that match the user's top preferences
    const scoredResources = new Map<number, { resource: any; score: number }>();

    for (const pref of userPrefs) {
      const resources = await this.prisma.resource.findMany({
        where: {
          tags: { some: { preferenceId: pref.preferenceId } },
          isPublic: true,
        },
        include: { tags: { include: { preference: true } } },
        take: 50, // Limit per preference to avoid perf issues
      });

      for (const res of resources) {
        // Find how relevant this resource is to this preference
        const tag = res.tags.find((t) => t.preferenceId === pref.preferenceId);
        const relevance = tag ? tag.weight : 0;

        // Custom Score = UserWeight * ResourceRelevance
        const score = pref.weight * relevance;

        if (scoredResources.has(res.id)) {
            // Accumulate score if it matches multiple preferences
            const existing = scoredResources.get(res.id);
            if (existing) {
                existing.score += score;
            }
        } else {
            scoredResources.set(res.id, { resource: res, score });
        }
      }
    }

    // 3. Sort by computed score
    const feed = Array.from(scoredResources.values())
      .sort((a, b) => b.score - a.score)
      .map((item) => ({
        ...item.resource,
        matchScore: item.score, // Debugging info
      }));

    return feed;
  }
}
