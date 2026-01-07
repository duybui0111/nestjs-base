import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorException } from '../exceptions/entities/error-exception';
import { ErrorExceptionFactory } from '../exceptions/factory/error-exception-factory';

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

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.message : 'Unknown Error';

    return new ErrorException(`9999|${status}`, message);
  }

  private responseError(exception: ErrorException, host: ArgumentsHost): any {
    const strategy = new ErrorExceptionFactory().getExceptionStrategy(
      exception,
      host,
    );

    strategy.response();
  }
}
