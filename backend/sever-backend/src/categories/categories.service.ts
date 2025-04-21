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

  async findAll(page?: number, limit?: number, search?: string) {
    const where: any = {
      isDeleted: false,
    };

    if (search) {
      where.OR = [{ nameCategory: { contains: search } }];
    }

    const queryOptions: any = {
      where,
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const categories = await this._prisma.categories.findMany(queryOptions);
    const totalCategories = await this._prisma.categories.count({
      where,
    });
    return formatResponse(`This action returns all categories`, categories, {
      page,
      limit,
      total: totalCategories,
    });
  }

  async findOne(id: string) {
    const category = await this._prisma.categories.findUnique({
      where: { id },
      include: {
        attributes: true,
      },
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
    const [hasRelatedProducts, hasRelatedAttributes] = await Promise.all([
      this._prisma.products.count({
        where: { categoryId: id },
      }),
      this._prisma.attributes.count({
        where: { categoryId: id },
      }),
    ]);

    if (hasRelatedProducts > 0 && hasRelatedAttributes > 0) {
      const [category, ,] = await Promise.all([
        this._prisma.categories.update({
          where: { isDeleted: false, id },
          data: { isDeleted: true },
        }),
        this._prisma.attributes.deleteMany({
          where: { categoryId: id },
        }),
        this._prisma.products.updateMany({
          where: { categoryId: id },
          data: { isDeleted: true },
        }),
      ]);
      return formatResponse(`This action removes a category`, category);
    } else {
      const category = await this._prisma.categories.delete({
        where: { isDeleted: false, id },
      });
      return formatResponse(`This action removes a category`, category);
    }
  }
}
