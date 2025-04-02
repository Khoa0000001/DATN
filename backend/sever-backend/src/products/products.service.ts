import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly _prisma: PrismaService) {}

  formattedProduct(product: ProductDto | null) {
    return {
      ...product,
      attributeValues: product?.attributeValues?.map((attr) => ({
        attributeValue: attr.attributeValue,
        nameAttribute: attr.attribute?.nameAttribute || 'Unknown',
        description: attr.attribute?.description || null,
      })),
    };
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this._prisma.products.create({
      data: createProductDto,
    });
    return formatResponse('product created successfully', product);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
      include: {
        productImages: true,
        attributeValues: {
          include: {
            attribute: true,
          },
        },
        category: {
          select: {
            nameCategory: true,
            description: true,
          },
        },
      },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const [products, totalProducts] = await Promise.all([
      this._prisma.products.findMany(queryOptions),
      this._prisma.products.count({ where: { isDeleted: false } }),
    ]);
    const resultProducts = products.map((product: ProductDto) =>
      this.formattedProduct(product),
    );
    return formatResponse(`This action returns all products`, resultProducts, {
      page,
      limit,
      total: totalProducts,
    });
  }

  async findOne(id: string) {
    const product: ProductDto | null = await this._prisma.products.findUnique({
      where: { isDeleted: false, id },
      include: {
        productImages: true,
        attributeValues: {
          include: {
            attribute: true,
          },
        },
        category: {
          select: {
            nameCategory: true,
            description: true,
          },
        },
      },
    });
    const resultProduct = this.formattedProduct(product);
    return formatResponse(`This action returns a product`, resultProduct);
  }

  async findByCategory(categoryId: string, page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false, categoryId },
      include: {
        productImages: true,
        attributeValues: {
          include: {
            attribute: true,
          },
        },
        category: {
          select: {
            nameCategory: true,
            description: true,
          },
        },
      },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const [products, totalProducts] = await Promise.all([
      this._prisma.products.findMany(queryOptions),
      this._prisma.products.count({
        where: {
          isDeleted: false,
          categoryId,
        },
      }),
    ]);
    const resultProducts = products.map((product: ProductDto) =>
      this.formattedProduct(product),
    );
    return formatResponse(
      `This action returns products by category`,
      resultProducts,
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
    const [hasRelatedimportDetails, hasRelatedOrderDetails] = await Promise.all(
      [
        this._prisma.importDetails.count({ where: { productId: id } }),
        this._prisma.orderDetails.count({ where: { productId: id } }),
      ],
    );
    if (hasRelatedimportDetails > 0 && hasRelatedOrderDetails > 0) {
      const product = await this._prisma.products.update({
        where: { isDeleted: false, id },
        data: { isDeleted: true },
      });
      return formatResponse(`This action removes a product`, product);
    } else {
      const product = await this._prisma.products.delete({
        where: { id },
      });
      return formatResponse(`This action removes a product`, product);
    }
  }
}
