import { Module } from '@nestjs/common';
import { AppController } from './interface/http/controllers/app-controller';
import { ConfigModule } from '@nestjs/config';
import app from './config/app';
import { GetApplicationUsecase } from './application/usecases/get-application-use-case';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from '../../common/filters/all-exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app],
    }),
  ],
  controllers: [AppController],
  providers: [
    GetApplicationUsecase,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
