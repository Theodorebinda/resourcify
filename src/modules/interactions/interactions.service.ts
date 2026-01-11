import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InteractionType, Prisma } from '@prisma/client';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.InteractionCreateInput) {
    // 1. Log the interaction
    const interaction = await this.prisma.interaction.create({ data });

    // 2. Intelligent Weight Adjustment
    // If the user likes/views a resource, boost the weights of the preferences associated with that resource
    await this.adjustUserPreferences(data.user.connect.id, data.resource.connect.id, data.type);

    return interaction;
  }

  private async adjustUserPreferences(userId: number, resourceId: number, type: InteractionType) {
    // Define weight impact by interaction type
    const weightMap: Record<InteractionType, number> = {
      VIEW: 0.1,
      LIKE: 1.0,
      SHARE: 2.0,
      SAVE: 1.5,
      COMMENT: 1.5,
      SKIP: -0.5,
    };

    const impact = weightMap[type] || 0;
    if (impact === 0) return;

    // Get tags of the resource
    const resource = await this.prisma.resource.findUnique({
      where: { id: resourceId },
      include: { tags: true },
    });

    if (!resource || !resource.tags.length) return;

    // Update each UserPreference
    for (const tag of resource.tags) {
      const existingPref = await this.prisma.userPreference.findUnique({
        where: {
          userId_preferenceId: {
            userId,
            preferenceId: tag.preferenceId,
          },
        },
      });

      if (existingPref) {
        await this.prisma.userPreference.update({
          where: { id: existingPref.id },
          data: { weight: { increment: impact * tag.weight } }, // Resource tag weight matters too
        });
      } else if (impact > 0) {
        // If inference is strong enough, maybe create it?
        // For now, let's only update existing or create inferred if positive
        await this.prisma.userPreference.create({
          data: {
            userId,
            preferenceId: tag.preferenceId,
            weight: impact * tag.weight,
            isExplicit: false,
          },
        });
      }
    }
  }

  async findAll() {
    return this.prisma.interaction.findMany();
  }
}
