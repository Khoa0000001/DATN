import { PrismaClient } from '@prisma/client';

import { InternalServerErrorException, Logger } from '@nestjs/common';

export async function checkIfIdExists(
  prisma: PrismaClient,
  table: string,
  id: string,
): Promise<boolean> {
  const logger = new Logger(checkIfIdExists.name);
  try {
    const model = prisma[table as keyof PrismaClient] as any;

    if (!model?.findUnique) {
      logger.error(`Model "${table}" không hợp lệ!`);
      throw new InternalServerErrorException(`Model "${table}" không hợp lệ`);
    }

    const record = await model.findUnique({ where: { id: String(id) } });
    return !!record;
  } catch (error) {
    logger.error(
      `Lỗi hệ thống khi kiểm tra ID trong bảng ${table}, error: ${error}`,
    );
    throw new InternalServerErrorException(
      `Lỗi hệ thống khi kiểm tra ID trong bảng ${table}`,
    );
  }
}
