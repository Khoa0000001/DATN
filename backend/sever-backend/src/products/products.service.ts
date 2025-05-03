import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';
import { ProductDto } from './dto/product.dto';
import { ImageUploadService } from '@/upload/image-upload.service';
import { ProductImagesService } from '@/product-images/product-images.service';
import { Express } from 'express';
import { AttributeValuesService } from '@/attribute-values/attribute-values.service';
import { EmbeddingService } from '@/embedding/embedding.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _cloudinary: ImageUploadService,
    private readonly _productImagesService: ProductImagesService,
    private readonly _attributeValuesService: AttributeValuesService,
    private readonly _embeddingService: EmbeddingService,
  ) {}

  formattedProduct(product: ProductDto | null) {
    return {
      ...product,
      attributeValues: product?.attributeValues?.map((attr) => ({
        id: attr.id,
        attributeId: attr.attributeId,
        attributeValue: attr.attributeValue,
        nameAttribute: attr.attribute?.nameAttribute || 'Unknown',
        description: attr.attribute?.description || null,
        tagValue: attr.tagValue || null,
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

    const { attributeValues, ...dataProduct } = createProductDto;
    const convetAttributeValues = JSON.parse(attributeValues || '[]');

    const embedText = `Tên sản phẩm: ${dataProduct.nameProduct}Mô tả: ${dataProduct.description}Giá: ${dataProduct.price} VND Danh mục: ${category?.nameCategory}Thuộc tính:${convetAttributeValues.map((a) => `${a.nameAttribute || ''}: ${a.attributeValue}`).join('')}
`;
    const embedding = await this._embeddingService.getEmbedding(embedText);
    // 1. Tạo sản phẩm
    const product = await this._prisma.products.create({
      data: { ...dataProduct, embedding },
    });

    // 2. Tạo các giá trị thuộc tính cho sản phẩm
    if (convetAttributeValues && convetAttributeValues.length > 0) {
      const newAttributeValues = convetAttributeValues.map(
        (attributeValue) => ({
          tagValue: attributeValue.tagValue,
          attributeId: attributeValue.attributeId,
          attributeValue: attributeValue.attributeValue,
          productId: product.id,
        }),
      );
      await this._attributeValuesService.createMany(newAttributeValues);
    }

    // 2. Upload ảnh và tạo bản ghi ProductImages
    for (const file of files) {
      const imageUrl = await this._cloudinary.uploadImage(
        file.buffer,
        file.originalname,
      );
      console.log('imageUrl', imageUrl);
      await this._productImagesService.create({
        productId: product.id,
        imageUrl,
      });
    }
    return formatResponse('product created successfully', product);
  }

  async findAll(page?: number, limit?: number, search?: string) {
    const where: any = {
      isDeleted: false,
    };

    if (search) {
      where.OR = [
        { nameProduct: { contains: search } },
        {
          category: { nameCategory: { contains: search } },
        },
        { description: { contains: search } },
      ];
    }

    const queryOptions: any = {
      where,
      include: {
        productImages: {
          select: {
            id: true,
            imageUrl: true,
          },
          orderBy: {
            createDate: 'asc',
          },
        },
        attributeValues: {
          include: {
            attribute: true,
          },
          orderBy: {
            createDate: 'asc',
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
      this._prisma.products.count({ where }),
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
    const product: any = await this._prisma.products.findUnique({
      where: { isDeleted: false, id },
      include: {
        productImages: {
          select: {
            id: true,
            imageUrl: true,
          },
          orderBy: {
            createDate: 'asc',
          },
        },
        attributeValues: {
          include: {
            attribute: true,
          },
          orderBy: {
            createDate: 'asc',
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

    // 1. Cập nhật sản phẩm
    const { attributeValues, keepProductImages, ...dataProduct } =
      updateProductDto;
    const convetAttributeValues = JSON.parse(attributeValues || '[]');
    const convetKeepProductImages = JSON.parse(keepProductImages || '[]');
    if (convetKeepProductImages) {
      const productImages = await this._prisma.productImages.findMany({
        where: { productId: id },
      });
      const deleteProductImages = productImages
        .filter((_: any) => !convetKeepProductImages.includes(_.id))
        .map((_: any) => _.id);
      await this._productImagesService.removeMany(deleteProductImages);
    }

    const product = await this._prisma.products.update({
      where: { id },
      data: dataProduct,
    });

    // 2. Cập nhật các giá trị thuộc tính cho sản phẩm
    if (convetAttributeValues && convetAttributeValues.length > 0) {
      const newAttributeValues = convetAttributeValues.map(
        (attributeValue) => ({
          tagValue: attributeValue.tagValue,
          attributeValue: attributeValue.attributeValue,
          productId: product.id,
          attributeId: attributeValue.attributeId,
          id: attributeValue.id,
        }),
      );
      if (newAttributeValues[0].id === '') {
        await this._prisma.attributeValues.deleteMany({
          where: {
            productId: id,
          },
        });
        const newAttributeValues = convetAttributeValues.map(
          (attributeValue) => ({
            tagValue: attributeValue.tagValue,
            attributeId: attributeValue.attributeId,
            attributeValue: attributeValue.attributeValue,
            productId: product.id,
          }),
        );
        await this._attributeValuesService.createMany(newAttributeValues);
      } else {
        await this._attributeValuesService.updateMany(newAttributeValues);
      }
    }

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
  async removeMany(ids: string[]) {
    const results = await Promise.allSettled(ids.map((id) => this.remove(id)));

    const success = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    const failed = results
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);

    return formatResponse(`Đã xử lý ${success.length} sản phẩm`, {
      success,
      failed,
    });
  }
}
