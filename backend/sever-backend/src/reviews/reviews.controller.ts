import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly _reviewsService: ReviewsService) {}

  @Post()
  @CheckId('users', 'userId')
  @CheckId('productId', 'productId')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this._reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    if (page && limit) {
      if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        throw new BadRequestException(
          'Page and limit must be positive numbers.',
        );
      }
    }
    return this._reviewsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @CheckId('reviews', 'id')
  findOne(@Param('id') id: string) {
    return this._reviewsService.findOne(id);
  }

  @Patch(':id')
  @CheckId('reviews', 'id')
  @CheckId('users', 'userId')
  @CheckId('products', 'productId')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this._reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @CheckId('reviews', 'id')
  remove(@Param('id') id: string) {
    return this._reviewsService.remove(id);
  }
}
