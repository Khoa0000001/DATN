import { Injectable } from '@nestjs/common';
import { CreateImportDetailDto } from './dto/create-import-detail.dto';
import { UpdateImportDetailDto } from './dto/update-import-detail.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class ImportDetailsService {
  constructor(private readonly _prismaService: PrismaService) {}
  async create(createImportDetailDto: CreateImportDetailDto) {
    const importDetail = await this._prismaService.importDetails.create({
      data: createImportDetailDto,
    });
    return formatResponse('ImportDetail created successfully', importDetail);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const importDetails =
      await this._prismaService.importDetails.findMany(queryOptions);
    const totalImportDetails = await this._prismaService.importDetails.count({
      where: { isDeleted: false },
    });
    return formatResponse('All importDetails', importDetails, {
      page,
      limit,
      total: totalImportDetails,
    });
  }

  async findOne(id: string) {
    const importDetail = await this._prismaService.importDetails.findUnique({
      where: { isDeleted: false, id },
    });
    return formatResponse('This action returns a importDetail', importDetail);
  }

  async update(id: string, updateImportDetailDto: UpdateImportDetailDto) {
    const importDetail = await this._prismaService.importDetails.update({
      where: { isDeleted: false, id },
      data: updateImportDetailDto,
    });
    return formatResponse(`This action updates importDetail`, importDetail);
  }

  async remove(id: string) {
    const importDetail = await this._prismaService.importDetails.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse(`This action removes importDetail`, importDetail);
  }
}
