import { ErrorCode } from '../enums/error-code';
import { getEnumKeyByValue } from '../../shared/utils/utils';
import { HttpStatus } from '@nestjs/common';

export class ErrorException extends Error {
  public readonly errorCode: ErrorCode | string;
  public readonly status: HttpStatus;
  public readonly code: number;
  public readonly error: string;
  public readonly message: string;
  public readonly description: Record<string, string[]> | string | undefined;

  constructor(
    errorCode: ErrorCode | string,
    message: string,
    description?: Record<string, string[]> | string,
  ) {
    super(message);

    const [code, status] = errorCode.split('|');
    this.errorCode = errorCode;
    this.status = Number(status);
    this.code = Number(code);
    this.error =
      getEnumKeyByValue(ErrorCode, errorCode) ??
      getEnumKeyByValue(ErrorCode, ErrorCode.APP_UNKNOWN_ERROR)!;
    this.message = message;
    this.description = description;
  }
}
