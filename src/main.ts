// process.env.DEBUG = '*'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { instrument } from '@socket.io/admin-ui';
import { config as dotenvConfig } from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenvConfig({path: '.env.development'})

async function bootstrap() {
  // const expressApp = express(); 
  // const adapter = new ExpressAdapter(expressApp); 
  const app = await NestFactory.create(AppModule);

  // const httpServer = createServer(expressApp);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
  });

  await app.init(); 

}
bootstrap();
