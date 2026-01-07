import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app-module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/filters/all-exception-filter';
import { buildValidationPipe } from './common/pipes/common-validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(buildValidationPipe());

  await app.listen(config.get<string>('app.port')!);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
