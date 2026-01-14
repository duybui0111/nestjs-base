import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE || 'NestJS Base',
  api: process.env.SWAGGER_API || 'api/documentation',
  apiJson: process.env.SWAGGER_API_JSON || 'api/documentation/json',
}));
