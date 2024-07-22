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
import { log } from 'console';

dotenvConfig({path: '.env.development'})

async function bootstrap() {
  // const expressApp = express(); 
  // const adapter = new ExpressAdapter(expressApp); 
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const httpServer = createServer(expressApp);

  app.enableCors({
    origin: ["https://admin.socket.io"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'src', 'views'))

   // Guardar la instancia de la aplicación en una variable global
  global['app'] = app;
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  

}
bootstrap();
