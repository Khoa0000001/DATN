import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }

    const obj = plainToInstance(metadata.metatype, value, {
      enableImplicitConversion: true, // <--- DÒNG NÀY QUAN TRỌNG
    });
    const errors = await validate(obj);

    if (errors.length > 0) {
      const messages = errors.map((err) => ({
        field: err.property,
        message: err.constraints
          ? Object.values(err.constraints).join(',')
          : 'Invalid input',
      }));

      throw new BadRequestException({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
