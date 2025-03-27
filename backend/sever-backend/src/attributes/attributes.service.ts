import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class AttributesService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createAttributeDto: CreateAttributeDto) {
    const attribute = await this._prisma.attributes.create({
      data: createAttributeDto,
    });
    return formatResponse('Attribute created successfully', attribute);
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

  async findOne(id: string) {
    const attribute = await this._prisma.attributes.findUnique({
      where: { id },
    });
    return formatResponse(`This action returns a attribute`, attribute);
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    const attribute = await this._prisma.attributes.update({
      where: { id },
      data: updateAttributeDto,
    });
    return formatResponse(`This action updates attribute`, attribute);
  }

  async remove(id: string) {
    const attribute = await this._prisma.attributes.delete({
      where: { id },
    });
    return formatResponse(`This action removes a attribute`, attribute);
  }
}
