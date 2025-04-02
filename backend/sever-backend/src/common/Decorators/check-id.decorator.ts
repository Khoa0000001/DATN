import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  applyDecorators,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

// Metadata để lưu tên bảng
export const CHECK_ID_KEY = 'checkIdTable';
export const CheckId = (table: string, idField: string) =>
  applyDecorators(
    SetMetadata(CHECK_ID_KEY, { table, idField }),
    UseGuards(CheckIdGuard),
  );

@Injectable()
export class CheckIdGuard implements CanActivate {
  private readonly logger = new Logger(CheckIdGuard.name);

  constructor(
    private readonly _reflector: Reflector,
    private readonly _prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this._reflector.get<{ table: string; idField: string }>(
      CHECK_ID_KEY,
      context.getHandler(),
    );

    if (!metadata) return true;

    const { table, idField } = metadata;
    const request = context.switchToHttp().getRequest();
    const id = request.params[idField] || request.body?.[idField];

    if (!id) {
      this.logger.warn(`Không tìm thấy trường ID "${idField}" trong request.`);
      throw new NotFoundException(
        `Trường ${idField} không tồn tại trong request.`,
      );
    }

    const model = (this._prisma as any)[table];
    if (!model?.findUnique) {
      this.logger.error(`Model "${table}" không hợp lệ!`);
      throw new InternalServerErrorException(`Model ${table} không hợp lệ`);
    }

    // Kiểm tra xem bảng có cột `isDeleted` không
    const hasIsDeleted = await this._prisma.$queryRawUnsafe<boolean>(
      `SELECT COUNT(*) > 0 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND COLUMN_NAME = 'isDeleted' AND TABLE_SCHEMA = DATABASE()`,
      table,
    );
    const isDeletedColumnExists = hasIsDeleted[0]['COUNT(*) > 0'] === 1n;

    // Điều kiện tìm kiếm
    const whereCondition: any = { id };
    if (isDeletedColumnExists) {
      whereCondition.isDeleted = false;
    }

    const record = await model.findUnique({ where: whereCondition });

    if (!record) {
      this.logger.warn(
        `ID "${id}" không tồn tại hoặc đã bị xóa trong bảng "${table}". Request từ IP: ${request.ip}`,
      );
      throw new NotFoundException(
        `ID ${id} không tồn tại hoặc đã bị xóa trong bảng ${table}`,
      );
    }

    return true;
  }
}
