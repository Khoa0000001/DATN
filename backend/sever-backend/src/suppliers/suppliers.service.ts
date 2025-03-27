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

  async findAll(page?: number, limit?: number) {
    const queryOptions: any = {
      where: {
        isDeleted: false,
      },
    };
    if (page && limit) {
      queryOptions.skip = (page - 1) * limit;
      queryOptions.take = limit;
    }
    const suppliers = await this._prisma.suppliers.findMany(queryOptions);
    const totalSuppliers = await this._prisma.suppliers.count({
      where: {
        isDeleted: false,
      },
    });
    return formatResponse(`This action returns all suppliers`, suppliers, {
      page,
      limit,
      total: totalSuppliers,
    });
  }

  async findOne(id: string) {
    const supplier = await this._prisma.suppliers.findUnique({
      where: { isDeleted: false, id },
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

  async remove(id: string) {
    const supplier = await this._prisma.suppliers.update({
      where: { isDeleted: false, id },
      data: { isDeleted: true },
    });
    return formatResponse(`This action removes supplier`, supplier);
  }
}
