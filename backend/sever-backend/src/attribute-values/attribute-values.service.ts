import { Injectable } from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class AttributeValuesService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createAttributeValueDto: CreateAttributeValueDto) {
    const attributeValue = await this._prisma.attributeValues.create({
      data: createAttributeValueDto,
    });
    return formatResponse(
      'AttributeValue created successfully',
      attributeValue,
    );
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {};
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const attributeValues =
      await this._prisma.attributeValues.findMany(queryOptions);
    const totalAttributeValues = await this._prisma.attributeValues.count();
    return formatResponse(
      `This action returns all attributeValues`,
      attributeValues,
      {
        page,
        limit,
        total: totalAttributeValues,
      },
    );
  }

  async findOne(id: string) {
    const attributeValue = await this._prisma.attributeValues.findUnique({
      where: { id },
    });
    return formatResponse(
      `This action returns attributeValue #${id}`,
      attributeValue,
    );
  }

  async update(id: string, updateAttributeValueDto: UpdateAttributeValueDto) {
    const attributeValue = await this._prisma.attributeValues.update({
      where: { id },
      data: updateAttributeValueDto,
    });
    return formatResponse(
      `This action updates attributeValue #${id}`,
      attributeValue,
    );
  }

  async remove(id: string) {
    const attributeValue = await this._prisma.attributeValues.delete({
      where: { id },
    });
    return formatResponse(
      `This action removes a attributeValue`,
      attributeValue,
    );
  }
}
