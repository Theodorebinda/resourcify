import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ReviewService } from "src/services/review.service";

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() data: Prisma.ReviewCreateInput) {
    return this.reviewService.createReview(data);
  }

  @Get(":resourceId")
  async getReviewsByResource(@Param("resourceId") resourceId: number) {
    return this.reviewService.getReviewsByResource(Number(resourceId));
  }

  @Delete(":id")
  async deleteReview(@Param("id") id: number) {
    return this.reviewService.deleteReview(Number(id));
  }
}
