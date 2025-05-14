import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class AttributesService {
  constructor(private readonly _prisma: PrismaService) {}
  async createMany(attributes: CreateAttributeDto[]) {
    await this._prisma.attributes.createMany({
      data: attributes,
    });
    return formatResponse('Attributes created successfully');
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const attributes = await this._prisma.attributes.findMany(queryOptions);
    const totalAttributes = await this._prisma.attributes.count();
    return formatResponse(`This action returns all attributes`, attributes, {
      page,
      limit,
      total: totalAttributes,
    });
  }
  async getListAttributeByCategoryId(
    categoryId: string,
    page?: number,
    limit?: number,
  ) {
    const queryOptions: any = {
      where: {
        categoryId: categoryId, // lọc theo categoryId
      },
      orderBy: {
        createDate: 'asc', // Thêm dòng này để order theo createDate
      },
    };

    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }

    const attributes = await this._prisma.attributes.findMany(queryOptions);
    const totalAttributes = await this._prisma.attributes.count({
      where: {
        categoryId: categoryId, // cũng cần đếm theo điều kiện này
      },
    });

    return formatResponse(`Danh sách thuộc tính theo categoryId`, attributes, {
      page,
      limit,
      total: totalAttributes,
    });
  }

  async findOne(id: string) {
    const attribute = await this._prisma.attributes.findUnique({
      where: { id },
    });
    return formatResponse(`This action returns a attribute`, attribute);
  }

  async updateMany(attributes: UpdateAttributeDto[]) {
    const updatedAttributes: {
      id: string;
      nameAttribute: string;
      description: string | null;
      createDate: Date;
      updateDate: Date;
      categoryId: string;
    }[] = [];

    for (const attr of attributes) {
      const updated = await this._prisma.attributes.update({
        where: { id: attr.id },
        data: {
          nameAttribute: attr.nameAttribute,
          description: attr.description,
        },
      });
      updatedAttributes.push(updated);
    }

    return formatResponse(
      `${updatedAttributes.length} attributes đã được cập nhật.`,
      updatedAttributes,
    );
  }

  async removeMany(ids: string[]) {
    const attributes = await this._prisma.attributes.findMany({
      where: { id: { in: ids } },
    });

    if (attributes.length !== ids.length) {
      throw new BadRequestException(
        'Một số ID attributes xóa không tồn tại trong hệ thống',
      );
    }

    const result = await this._prisma.attributes.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return formatResponse(`${result.count} attributes đã được xoá.`, result);
  }
}
