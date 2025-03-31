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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { CheckId } from '@/common/Decorators/check-id.decorator';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly _wishlistsService: WishlistsService) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this._wishlistsService.create(createWishlistDto);
  }

  @Get()
  @CheckId('wishlists', 'id')
  @CheckId('users', 'userId')
  @CheckId('products', 'productId')
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
    return this._wishlistsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._wishlistsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this._wishlistsService.update(id, updateWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._wishlistsService.remove(id);
  }
}
