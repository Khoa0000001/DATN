import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class CategoriesService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this._prisma.categories.create({
      data: createCategoryDto,
    });
    return formatResponse('category created successfully', category);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: {
        isDeleted: false,
      },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const categories = await this._prisma.categories.findMany(queryOptions);
    const totalCategories = await this._prisma.categories.count({
      where: {
        isDeleted: false,
      },
    });
    return formatResponse(`This action returns all categories`, categories, {
      page,
      limit,
      total: totalCategories,
    });
  }

  async findOne(id: string) {
    const category = await this._prisma.categories.findUnique({
      where: { isDeleted: false, id },
    });
    return formatResponse(`This action returns a category`, category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this._prisma.categories.update({
      where: { isDeleted: false, id },
      data: updateCategoryDto,
    });
    return formatResponse(`This action updates a category`, category);
  }

  async remove(id: string) {
    const category = await this._prisma.categories.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse(`This action removes a category`, category);
  }
}
