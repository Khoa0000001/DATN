import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateAttributeDto } from '@/attributes/dto/update-attribute.dto';
import { CreateAttributeDto } from '@/attributes/dto/create-attribute.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';
import { AttributesService } from '@/attributes/attributes.service';
import { ImageUploadService } from '@/upload/image-upload.service';
import { Express } from 'express';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _attribute: AttributesService,
    private readonly _cloudinary: ImageUploadService,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ) {
    const imageUrl = await this._cloudinary.uploadImage(
      file.buffer,
      file.originalname,
    );
    const { attributes, ...dataCategory } = createCategoryDto;
    const category = await this._prisma.categories.create({
      data: {
        ...dataCategory,
        imageUrl,
      },
    });

    const convetAttributes = JSON.parse(attributes || '[]');
    if (convetAttributes && convetAttributes.length > 0) {
      const newAttributes = convetAttributes.map((attributeValue) => ({
        ...attributeValue,
        categoryId: category.id,
      }));
      await this._attribute.createMany(newAttributes);
    }

    return formatResponse('category created successfully', {
      category,
    });
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

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file?: Express.Multer.File,
  ) {
    const { attributes, deletedAttributeIds, ...dataCategory } =
      updateCategoryDto as UpdateCategoryDto & { imageUrl?: string };
    const editAttributes: UpdateAttributeDto[] = [];
    const addAttributes: CreateAttributeDto[] = [];

    if (file) {
      const imageUrl = await this._cloudinary.uploadImage(
        file.buffer,
        file.originalname,
      );
      dataCategory.imageUrl = imageUrl;
    }

    const convetAttributes = JSON.parse(attributes || '[]');
    const convetDeletedAttributeIds = JSON.parse(deletedAttributeIds || '[]');

    convetAttributes.forEach((_) => {
      if (_.id) {
        const _new: UpdateAttributeDto = {
          id: _.id,
          nameAttribute: _.nameAttribute,
          description: _.description ?? undefined,
        };
        editAttributes.push(_new);
      } else {
        const _new: CreateAttributeDto = {
          nameAttribute: _.nameAttribute,
          description: _.description ?? undefined,
          categoryId: id,
        };
        addAttributes.push(_new);
      }
    });
    try {
      const [category] = await Promise.all([
        this._prisma.categories.update({
          where: { isDeleted: false, id },
          data: dataCategory,
        }),
        deletedAttributeIds?.length
          ? this._attribute.removeMany(convetDeletedAttributeIds)
          : Promise.resolve(),
        editAttributes.length
          ? this._attribute.updateMany(editAttributes)
          : Promise.resolve(),
        addAttributes.length
          ? this._attribute.createMany(addAttributes)
          : Promise.resolve(),
      ]);

      return formatResponse(`This action updates a category`, category);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Lỗi khi cập nhật danh mục',
      );
    }
  }

  async removeManyCategories(ids: string[]) {
    const result = await Promise.all(
      ids.map(async (id) => {
        const [hasRelatedProducts, hasRelatedAttributes] = await Promise.all([
          this._prisma.products.count({ where: { categoryId: id } }),
          this._prisma.attributes.count({ where: { categoryId: id } }),
        ]);

        // Nếu có liên kết → soft delete category, xóa attributes, soft delete products
        if (hasRelatedProducts > 0 || hasRelatedAttributes > 0) {
          const [category] = await Promise.all([
            this._prisma.categories.update({
              where: { id },
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

          return { id, action: 'soft-deleted', category };
        }

        // Nếu không có liên kết → hard delete category
        const category = await this._prisma.categories.delete({
          where: { id },
        });

        return { id, action: 'deleted', category };
      }),
    );

    return formatResponse('Danh sách danh mục đã được xử lý', result);
  }
}
