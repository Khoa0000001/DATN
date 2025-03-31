import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class ReviewsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
    const review = await this._prisma.reviews.create({
      data: createReviewDto,
    });
    return formatResponse('review created successfully', review);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
    }
    const reviews = await this._prisma.reviews.findMany(queryOptions);
    const totalReviews = await this._prisma.reviews.count({
      where: { isDeleted: false },
    });
    return formatResponse('This action returns all reviews', reviews, {
      page,
      limit,
      total: totalReviews,
    });
  }

  async findOne(id: string) {
    const review = await this._prisma.reviews.findUnique({
      where: { isDeleted: false, id },
    });
    return formatResponse('This action returns a product', review);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this._prisma.reviews.update({
      where: { isDeleted: false, id },
      data: updateReviewDto,
    });
    return formatResponse('review updated successfully', review);
  }

  async remove(id: string) {
    const review = await this._prisma.reviews.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse('This action removes a review', review);
  }
}
