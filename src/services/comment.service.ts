import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  // ➤ Ajouter un commentaire
  async createComment(data: Prisma.CommentCreateInput) {
    return this.prisma.comment.create({ data });
  }

  // ➤ Récupérer les commentaires d'une ressource spécifique
  async getCommentsByResource(resourceId: number) {
    return this.prisma.comment.findMany({
      where: { resourceId },
      // include: { user: { select: { id, name, email } } }, // Inclure les infos de l'auteur
    });
  }

  // ➤ Supprimer un commentaire
  async deleteComment(id: number) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
