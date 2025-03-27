import { Injectable } from '@nestjs/common';
import { CreateImportInvoiceDto } from './dto/create-import-invoice.dto';
import { UpdateImportInvoiceDto } from './dto/update-import-invoice.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class ImportInvoicesService {
  constructor(private readonly _prismaService: PrismaService) {}
  async create(createImportInvoiceDto: CreateImportInvoiceDto) {
    const importInvoice = await this._prismaService.importInvoices.create({
      data: createImportInvoiceDto,
    });
    return formatResponse('ImportInvoice created successfully', importInvoice);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const importInvoices =
      await this._prismaService.importInvoices.findMany(queryOptions);
    const totalImportInvoices = await this._prismaService.importInvoices.count({
      where: { isDeleted: false },
    });
    return formatResponse('All importInvoices', importInvoices, {
      page,
      limit,
      total: totalImportInvoices,
    });
  }

  async findOne(id: string) {
    const importInvoice = await this._prismaService.importInvoices.findUnique({
      where: { isDeleted: false, id },
    });
    return formatResponse('ImportInvoice found', importInvoice);
  }

  async update(id: string, updateImportInvoiceDto: UpdateImportInvoiceDto) {
    const importInvoice = await this._prismaService.importInvoices.update({
      where: { isDeleted: false, id },
      data: updateImportInvoiceDto,
    });
    return formatResponse('ImportInvoice updated successfully', importInvoice);
  }

  async remove(id: string) {
    const importInvoice = await this._prismaService.importInvoices.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse(`This action removes importInvoice`, importInvoice);
  }
}
