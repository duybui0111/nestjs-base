import { ArgumentsHost } from '@nestjs/common';
import { HttpErrorException } from '../entities/http-error-exception';
import { ErrorException } from '../entities/error-exception';
import { throwError } from '../../shared/utils/utils';
import { ErrorExceptionStrategy } from '../entities/error-exception-strategy';

export class ErrorExceptionFactory {
  public getExceptionStrategy(
    exception: ErrorException,
    host: ArgumentsHost,
  ): ErrorExceptionStrategy {
    switch (host.getType()) {
      case 'http':
        return new HttpErrorException(exception, host.switchToHttp());
      default:
        return throwError('Invalid host type');
    }
  }
}
