import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class SuppliersService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createSupplierDto: CreateSupplierDto) {
    const supplier = await this._prisma.suppliers.create({
      data: createSupplierDto,
    });
    return formatResponse('Supplier created successfully', supplier);
  }

  async findAll(page?: number, limit?: number, search?: string) {
    const where: any = {};
    if (search) {
      where.OR = [{ nameSupplier: { contains: search } }];
    }
    const queryOptions: any = {
      where,
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const suppliers = await this._prisma.suppliers.findMany(queryOptions);
    const totalSuppliers = await this._prisma.suppliers.count({
      where,
    });
    return formatResponse(`This action returns all suppliers`, suppliers, {
      page,
      limit,
      total: totalSuppliers,
    });
  }

  async findOne(id: string) {
    const supplier = await this._prisma.suppliers.findUnique({
      where: { id },
    });
    return formatResponse(`This action returns a supplier`, supplier);
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this._prisma.suppliers.update({
      where: { isDeleted: false, id },
      data: updateSupplierDto,
    });
    return formatResponse(`This action updates supplier`, supplier);
  }

  async removeMany(ids: string[]) {
    const results = await Promise.all(
      ids.map(async (id) => {
        const relatedCount = await this._prisma.importInvoices.count({
          where: { supplierId: id },
        });

        if (relatedCount > 0) {
          // Cập nhật isDeleted: true nếu có liên kết
          const updatedSupplier = await this._prisma.suppliers.update({
            where: { id },
            data: { isDeleted: true },
          });
          return { id, action: 'soft-deleted', supplier: updatedSupplier };
        } else {
          // Xóa hoàn toàn nếu không có liên kết
          const deletedSupplier = await this._prisma.suppliers.delete({
            where: { id },
          });
          return { id, action: 'deleted', supplier: deletedSupplier };
        }
      }),
    );

    return formatResponse('Batch supplier removal completed', results);
  }
}
