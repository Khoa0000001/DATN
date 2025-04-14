import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';
import { ProductDto } from './dto/product.dto';
import { ImageUploadService } from '@/upload/image-upload.service';
import { ProductImagesService } from '@/product-images/product-images.service';
import { Express } from 'express';

@Injectable()
export class ProductsService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _cloudinary: ImageUploadService,
    private readonly _productImagesService: ProductImagesService,
  ) {}

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

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const category = await this._prisma.categories.findUnique({
      where: { isDeleted: false, id: createProductDto.categoryId },
    });
    if (!category) {
      throw new BadRequestException(
        `ID ${createProductDto.categoryId} không tồn tại hoặc đã bị xóa trong bảng categories`,
      );
    }

    // 1. Tạo sản phẩm
    const product = await this._prisma.products.create({
      data: createProductDto,
    });

    // 2. Upload ảnh và tạo bản ghi ProductImages
    for (const file of files) {
      const imageUrl = await this._cloudinary.uploadImage(
        file.buffer,
        file.originalname,
      );

      await this._productImagesService.create({
        productId: product.id,
        imageUrl,
      });
    }
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

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    const productExists = await this._prisma.products.findUnique({
      where: { isDeleted: false, id },
    });
    if (!productExists) {
      throw new BadRequestException(
        `ID ${id} không tồn tại hoặc đã bị xóa trong bảng products`,
      );
    }

    if (updateProductDto.categoryId) {
      const category = await this._prisma.categories.findUnique({
        where: { isDeleted: false, id: updateProductDto.categoryId },
      });
      if (!category) {
        throw new BadRequestException(
          `ID ${updateProductDto.categoryId} không tồn tại hoặc đã bị xóa trong bảng categories`,
        );
      }
    }

    const product = await this._prisma.products.update({
      where: { id },
      data: updateProductDto,
    });

    // Nếu có ảnh mới => upload và thêm vào ProductImages
    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = await this._cloudinary.uploadImage(
          file.buffer,
          file.originalname,
        );

        await this._productImagesService.create({
          productId: product.id,
          imageUrl,
        });
      }
    }

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
