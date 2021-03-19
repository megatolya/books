import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

const logger = new Logger('Main');
const microserviceOptions = {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:3001',
      package: 'app',
      protoPath: join(__dirname, '../../proto/app.proto'),
    }
};

(async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  await app.listen(() => {
    logger.log('Server books service started');
  });
})();
