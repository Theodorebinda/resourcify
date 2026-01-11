import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DiscussionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DiscussionCreateInput) {
    return this.prisma.discussion.create({ data });
  }

  async findByPreference(preferenceId: number) {
    return this.prisma.discussion.findMany({
      where: { preferenceId },
      include: {
        _count: { select: { participants: true, messages: true } },
      },
    });
  }

  async joinDiscussion(userId: number, discussionId: number) {
    // Check if user has the preference? Optional guard.
    return this.prisma.discussionParticipant.create({
      data: { userId, discussionId },
    });
  }
}
