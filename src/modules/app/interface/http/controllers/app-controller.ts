import { Controller, Get } from '@nestjs/common';
import { GetApplicationUsecase } from '../../../application/usecases/get-application-use-case';

@Controller('')
export class AppController {
  constructor(private readonly getApplicationUsecase: GetApplicationUsecase) {}

  @Get()
  getApplicationInfo(): string {
    return this.getApplicationUsecase.exec();
  }
}
