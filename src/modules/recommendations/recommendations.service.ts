import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  async generateRecommendations(userId: number) {
    // 1. Get user's liked resources
    const likedInteractions = await this.prisma.interaction.findMany({
      where: { userId, type: 'LIKE' },
      select: { resourceId: true },
    });

    const likedResourceIds = likedInteractions.map((i) => i.resourceId);

    if (likedResourceIds.length === 0) {
      return []; // No history to base recommendations on
    }

    // 2. Get tags of liked resources
    const likedTags = await this.prisma.resourcePreference.findMany({
      where: { resourceId: { in: likedResourceIds } },
      select: { preferenceId: true },
    });

    const preferenceIds = [...new Set(likedTags.map((t) => t.preferenceId))];

    // 3. Find other resources with these tags, excluding already liked ones
    const recommendations = await this.prisma.resource.findMany({
      where: {
        AND: [
          { tags: { some: { preferenceId: { in: preferenceIds } } } },
          { id: { notIn: likedResourceIds } },
          { isPublic: true },
        ],
      },
      take: 10,
      include: { tags: true },
    });

    return recommendations.map((res) => ({
      ...res,
      reason: 'Based on your recent likes',
    }));
  }
}
