import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class ProductsService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this._prisma.products.create({
      data: createProductDto,
    });
    return formatResponse('product created successfully', product);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: {
        isDeleted: false,
      },
      include: {
        productImages: true, // Join với bảng ProductImages
      },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const products = await this._prisma.products.findMany(queryOptions);
    const totalProducts = await this._prisma.products.count({
      where: {
        isDeleted: false,
      },
    });
    return formatResponse(`This action returns all products`, products, {
      page,
      limit,
      total: totalProducts,
    });
  }

  async findOne(id: string) {
    const product = await this._prisma.products.findUnique({
      where: {
        isDeleted: false,
        id,
      },
    });
    return formatResponse(`This action returns a product`, product);
  }

  async findByCategory(categoryId: string, page?: number, limit?: number) {
    const queryOptions: any = {
      where: {
        isDeleted: false,
        categoryId,
      },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const products = await this._prisma.products.findMany(queryOptions);
    const totalProducts = await this._prisma.products.count({
      where: {
        isDeleted: false,
        categoryId,
      },
    });
    return formatResponse(
      `This action returns products by category`,
      products,
      {
        page,
        limit,
        total: totalProducts,
      },
    );
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this._prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
    return formatResponse('product updated successfully', product);
  }

  async remove(id: string) {
    const product = await this._prisma.products.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse(`This action removes a product`, product);
  }
}
