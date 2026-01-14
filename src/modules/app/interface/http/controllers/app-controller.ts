import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GetApplicationUsecase } from '../../../application/usecases/get-application-use-case';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Public / App')
@Controller('')
export class AppController {
  constructor(private readonly getApplicationUsecase: GetApplicationUsecase) {}

  /**
   * Get application info
   */
  @Get()
  @ApiResponse({ status: HttpStatus.OK, schema: { type: 'string' } })
  getApplicationInfo(@Res() res: Response) {
    const applicationInfo = this.getApplicationUsecase.exec();

    return res.status(HttpStatus.OK).json(applicationInfo);
  }
}
