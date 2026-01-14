import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getAppVersion } from '../shared/utils/utils';
import { HttpErrorExceptionBodyDto } from '../exceptions/dtos/error-exception-dto';

export const buildSwagger = async (app: INestApplication) => {
  const swaggerConfig = app.get(ConfigService).get('swagger');
  const appConfig = app.get(ConfigService).get('app');

  if (!appConfig.debug) return;

  const documentBuilder = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(
      `[Document JSON](${appConfig.url}/${swaggerConfig.apiJson})`,
    )
    .setVersion(await getAppVersion())
    .addBearerAuth()
    .addGlobalResponse({ status: 'default', type: HttpErrorExceptionBodyDto })
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup(swaggerConfig.api, app, documentFactory, {
    jsonDocumentUrl: swaggerConfig.apiJson,
  });
};
