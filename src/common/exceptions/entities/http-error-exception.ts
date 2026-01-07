import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpErrorExceptionBodyDto } from '../dtos/error-exception-dto';
import { ErrorException } from './error-exception';
import { Response } from 'express';
import { ErrorExceptionStrategy } from './error-exception-strategy';

export class HttpErrorException extends ErrorExceptionStrategy {
  public readonly exception: ErrorException;
  public readonly host: HttpArgumentsHost;

  constructor(exception: ErrorException, host: HttpArgumentsHost) {
    super();
    this.host = host;
    this.exception = exception;
  }

  public toJson(): HttpErrorExceptionBodyDto {
    const { exception } = this;
    return {
      status: exception.status,
      error: exception.error,
      code: exception.code,
      message: exception.message,
      description: exception.description,
    };
  }

  public response() {
    const { exception, host } = this;

    const res = host.getResponse<Response>();
    res.setHeaders(
      new Headers({
        'X-Error-Code': String(exception.code),
        'X-Error-Key': exception.error,
      }),
    );

    return res.status(exception.status).json(this.toJson());
  }
}
