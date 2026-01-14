import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HttpErrorExceptionBodyDto {
  @ApiProperty()
  status: HttpStatus;

  @ApiProperty()
  error: string;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  description: Record<string, string[]> | string | undefined;
}
