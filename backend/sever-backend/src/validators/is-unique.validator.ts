import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly _prisma: PrismaService) {}

  async validate(value: any, args: ValidationArguments) {
    const [model] = args.constraints;

    const exists = await (this._prisma[model] as any).findUnique({
      where: { [args.property]: value },
    });

    return !exists;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} đã tồn tại trong hệ thống.`;
  }
}
