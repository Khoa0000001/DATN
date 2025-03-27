import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from '@/validators/is-unique.validator';

export function IsUnique(model: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model],
      options: validationOptions,
      validator: IsUniqueConstraint,
    });
  };
}
