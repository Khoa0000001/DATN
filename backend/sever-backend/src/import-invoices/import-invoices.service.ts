import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImportInvoiceDto } from './dto/create-import-invoice.dto';
import { UpdateImportInvoiceDto } from './dto/update-import-invoice.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class ImportInvoicesService {
  constructor(private readonly _prismaService: PrismaService) {}
  async create(createImportInvoiceDto: CreateImportInvoiceDto) {
    const dataImportInvoice = {
      supplierId: createImportInvoiceDto.supplierId,
      importDate: createImportInvoiceDto.importDate,
      totalAmount: createImportInvoiceDto.totalAmount,
      status: createImportInvoiceDto.status,
    };
    const importInvoice = await this._prismaService.importInvoices.create({
      data: dataImportInvoice,
    });
    await this._prismaService.importDetails.createMany({
      data: createImportInvoiceDto.products?.map((item) => ({
        importInvoiceId: importInvoice.id,
        productId: item.productId,
        quantity: item.quantity,
        importPrice: item.importPrice,
        totalImportPrice: item.totalImportPrice,
      })),
    });
    await Promise.all(
      createImportInvoiceDto.products.map((item) =>
        this._prismaService.products.update({
          where: { id: item.productId },
          data: {
            quantity: {
              increment: item.quantity, // hoặc set: newValue nếu muốn gán
            },
          },
        }),
      ),
    );
    return formatResponse('ImportInvoice created successfully', importInvoice);
  }

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: { isDeleted: false },
      include: {
        supplier: {
          select: {
            nameSupplier: true, // chỉ lấy nameSupplier, bạn có thể thêm các trường khác nếu muốn
          },
        },
      },
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

    return formatResponse(
      'All importInvoices',
      importInvoices.map((invoice: any) => ({
        ...invoice,
        nameSupplier: invoice?.supplier?.nameSupplier,
        supplier: undefined, // hoặc xóa nếu không cần trường supplier gốc
      })),
      {
        page,
        limit,
        total: totalImportInvoices,
      },
    );
  }

  async findOne(id: string) {
    const importInvoice = await this._prismaService.importInvoices.findUnique({
      where: { id },
      include: {
        supplier: {
          select: {
            nameSupplier: true,
          },
        },
        importDetails: {
          where: {
            isDeleted: false,
          },
          select: {
            quantity: true,
            importPrice: true,
            totalImportPrice: true,
            description: true,
            productId: true,
            product: {
              select: {
                nameProduct: true,
              },
            },
          },
        },
      },
    });

    if (!importInvoice || importInvoice.isDeleted) {
      throw new NotFoundException('ImportInvoice not found');
    }

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
