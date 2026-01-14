import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErrorCode } from '../enums/error-code';

export class HttpErrorExceptionBodyDto {
  @ApiProperty()
  status: HttpStatus;

  @ApiProperty({ enum: Object.keys(ErrorCode) })
  error: string;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  description: Record<string, string[]> | string | undefined;
}
