import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CommentService } from "src/services/comment.service";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() data: Prisma.CommentCreateInput) {
    return this.commentService.createComment(data);
  }

  @Get(":resourceId")
  async getCommentsByResource(@Param("resourceId") resourceId: number) {
    return this.commentService.getCommentsByResource(Number(resourceId));
  }

  @Delete(":id")
  async deleteComment(@Param("id") id: number) {
    return this.commentService.deleteComment(Number(id));
  }
}
