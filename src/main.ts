// process.env.DEBUG = '*'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as express from 'express';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { instrument } from '@socket.io/admin-ui';
import { config as dotenvConfig } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { join } from 'path';

dotenvConfig({path: '.env.development'})

async function bootstrap() {
  // const expressApp = express(); 
  // const adapter = new ExpressAdapter(expressApp); 
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const httpServer = createServer(expressApp);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'src', 'views'))

  await app.listen(3001); 

}
bootstrap();
