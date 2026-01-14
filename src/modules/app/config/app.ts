import { registerAs } from '@nestjs/config';
import { throwError } from '../../../common/shared/utils/utils';

export default registerAs('app', () => ({
  name: process.env.APP_NAME ?? throwError('APP_NAME is required'),
  port: Number(process.env.APP_PORT ?? throwError('APP_PORT is required')),
  url: process.env.APP_URL ?? throwError('APP_URL is required'),
  debug: process.env.APP_DEBUG === 'true',
}));
