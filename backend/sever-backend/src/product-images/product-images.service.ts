import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class ProductImagesService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createProductImageDto: CreateProductImageDto) {
    const productImage = await this._prisma.productImages.create({
      data: createProductImageDto,
    });

    return formatResponse('Product image uploaded successfully', productImage);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const productImages =
      await this._prisma.productImages.findMany(queryOptions);
    const total = await this._prisma.productImages.count();
    return formatResponse(
      `This action returns all productImages`,
      productImages,
      {
        page,
        limit,
        total: total,
      },
    );
  }

  async findOne(id: string) {
    const productImage = await this._prisma.productImages.findUnique({
      where: { id },
    });
    return formatResponse(`This action returns a productImage`, productImage);
  }

  async update(id: string, updateProductImageDto: UpdateProductImageDto) {
    const productImage = await this._prisma.productImages.update({
      where: { id },
      data: updateProductImageDto,
    });
    return formatResponse(`This action updates productImage`, productImage);
  }

  async removeMany(ids: string[]) {
    const deleted = await this._prisma.productImages.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return formatResponse(`Đã xóa ${deleted.count} ảnh sản phẩm`, deleted);
  }
}
