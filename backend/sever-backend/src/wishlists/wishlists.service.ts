import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';
@Injectable()
export class WishlistsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createWishlistDto: CreateWishlistDto) {
    const wishlist = await this._prisma.wishlists.create({
      data: createWishlistDto,
    });
    return formatResponse('wishlist craete successfully', wishlist);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const wishlists = await this._prisma.wishlists.findMany(queryOptions);
    const totalWishlists = await this._prisma.wishlists.count();
    return formatResponse(`This action returns all wishlists`, wishlists, {
      page,
      limit,
      total: totalWishlists,
    });
  }

  async findOne(id: string) {
    const wishlist = await this._prisma.wishlists.findUnique({
      where: { id },
    });
    return formatResponse(`This action returns wishlist #${id}`, wishlist);
  }

  async update(id: string, updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this._prisma.wishlists.update({
      where: { id },
      data: updateWishlistDto,
    });
    return formatResponse(`This action updates wishlist #${id}`, wishlist);
  }

  async remove(id: string) {
    const wishlist = await this._prisma.wishlists.delete({
      where: { id },
    });
    return formatResponse(`This action removes wishlist #${id}`, wishlist);
  }
}
