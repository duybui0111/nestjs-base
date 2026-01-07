import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetApplicationUsecase {
  constructor(private readonly configService: ConfigService) {}
  exec(): string {
    return (
      this.configService.get('app.name') + ' - ' + new Date().toISOString()
    );
  }
}
