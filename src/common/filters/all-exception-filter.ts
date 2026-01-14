import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ErrorException } from '../exceptions/entities/error-exception';
import { ErrorExceptionFactory } from '../exceptions/factory/error-exception-factory';
import { ErrorCode } from '../exceptions/enums/error-code';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor() {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    const errorException = this.getErrorException(exception);

    this.responseError(errorException, host);
  }

  private getErrorException(exception: unknown): ErrorException {
    if (exception instanceof ErrorException) {
      return exception;
    }

    const errorCode =
      exception instanceof HttpException
        ? `${ErrorCode.HTTP_ERROR}|${exception.getStatus()}`
        : ErrorCode.APP_UNKNOWN_ERROR;

    const message =
      exception instanceof HttpException ? exception.message : 'Unknown Error';

    return new ErrorException(errorCode, message);
  }

  private responseError(exception: ErrorException, host: ArgumentsHost): any {
    const strategy = new ErrorExceptionFactory().getExceptionStrategy(
      exception,
      host,
    );

    strategy.response();
  }
}
