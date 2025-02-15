import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  // ➤ Ajouter un avis
  async createReview(data: Prisma.ReviewCreateInput) {
    return this.prisma.review.create({ data });
  }

  // ➤ Récupérer les avis d'une ressource spécifique
  async getReviewsByResource(resourceId: number) {
    return this.prisma.review.findMany({
      where: { resourceId },
      //   include: { user: { select: { id, name, email } } }, // Inclure l'auteur de l'avis
    });
  }

  // ➤ Supprimer un avis
  async deleteReview(id: number) {
    return this.prisma.review.delete({ where: { id } });
  }
}
