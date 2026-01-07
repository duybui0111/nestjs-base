import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ErrorCode } from '../exceptions/enums/error-code';
import { ErrorException } from '../exceptions/entities/error-exception';

export const buildValidationPipe = () => {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const errorsDescription: Record<string, string[]> = {};

      const getDescription = (
        prefix: string | undefined,
        validationErrors: ValidationError[],
      ) => {
        for (const validationError of validationErrors) {
          const key = prefix
            ? `${prefix}.${validationError.property}`
            : validationError.property;

          if (validationError.constraints) {
            errorsDescription[key] = Object.values(validationError.constraints);
          }

          if (validationError.children && validationError.children.length > 0) {
            getDescription(key, validationError.children);
          }
        }
      };

      getDescription(undefined, errors);

      return new ErrorException(
        ErrorCode.VALIDATION_ERROR,
        'Validation Error',
        errorsDescription,
      );
    },
  });
};
