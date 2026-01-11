import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) {}

  async findMatches(userId: number) {
    // 1. Get Current User Preferences
    const currentUserPrefs = await this.prisma.userPreference.findMany({
      where: { userId },
    });
    
    if (!currentUserPrefs.length) return []; // No preferences, no matches

    const myVector = new Map<number, number>();
    let myMagnitude = 0;
    for (const p of currentUserPrefs) {
      myVector.set(p.preferenceId, p.weight);
      myMagnitude += p.weight * p.weight;
    }
    myMagnitude = Math.sqrt(myMagnitude);

    // 2. Get Potential Matches (users not already matched)
    // For scalability, we would limit this query or use a vector DB.
    // Here we fetch users with at least one common preference.
    const potentialUsers = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
        preferences: {
          some: {
            preferenceId: { in: currentUserPrefs.map((p) => p.preferenceId) },
          },
        },
      },
      include: { preferences: true },
      take: 100, // Limit candidate pool
    });

    // 3. Calculate Similarity Scores
    const matches = potentialUsers
      .map((otherUser) => {
        let dotProduct = 0;
        let otherMagnitude = 0;

        for (const p of otherUser.preferences) {
          otherMagnitude += p.weight * p.weight;
          const myWeight = myVector.get(p.preferenceId) || 0;
          dotProduct += myWeight * p.weight;
        }

        otherMagnitude = Math.sqrt(otherMagnitude);

        const similarity =
          myMagnitude && otherMagnitude
            ? dotProduct / (myMagnitude * otherMagnitude)
            : 0;

        return {
          user: otherUser,
          score: similarity,
          commonInterests: currentUserPrefs.filter(p => myVector.has(p.preferenceId) && otherUser.preferences.some(op => op.preferenceId === p.preferenceId)).length
        };
      })
      .filter((m) => m.score > 0.1) // Minimum threshold
      .sort((a, b) => b.score - a.score);

    return matches.slice(0, 10); // Return top 10
  }
}
