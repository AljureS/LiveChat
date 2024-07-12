import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { UnauthorizedException } from '@nestjs/common';

async function bootstrap() {
  const expressApp = express(); // Create an Express application
  const adapter = new ExpressAdapter(expressApp); // So Nest and Socket can use the same http server
  const app = await NestFactory.create(AppModule, adapter); // Adpater Express to NestJS

  const httpServer = createServer(expressApp); // Create HTTP server from Express app

  // Create an instace of Socket.io using the HTTP server 
  const io = new Server(httpServer)

  io.use((socket, next)=>{ // entre parentesis puedo poner la funcion como middleware

    const token = socket.handshake.auth.token

    if (token == "Mr Michi is the coolest") {
      next()
    } else {
      const err = new UnauthorizedException('Not authorized');
      next(err);
    }

  }) 
  
  io.on('connection', (socket)=>{

    

  })
  
  await app.init();
  await httpServer.listen(3000);

  console.log(`Socket.io server is on Port 3000`);
}
bootstrap();
