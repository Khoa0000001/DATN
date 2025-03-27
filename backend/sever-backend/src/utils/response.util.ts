import { Logger } from '@nestjs/common';
export function formatResponse(message: string, data: any = null, meta?: any) {
  const logger = new Logger('Response');
  logger.log(message);
  return { message, data, meta };
}
