import { HttpStatus } from '@nestjs/common';

export class HttpErrorExceptionBodyDto {
  status: HttpStatus;
  error: string;
  code: number;
  message: string;
  description: Record<string, string[]> | string | undefined;
}
