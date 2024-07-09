import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const expressApp = express(); // Create an Express application
  const adapter = new ExpressAdapter(expressApp); // So Nest and Socket can use the same http server
  const app = await NestFactory.create(AppModule, adapter); // Adpater Express to NestJS

  const httpServer = createServer(expressApp); // Create HTTP server from Express app

  // Create an instace of Socket.io using the HTTP server 
  const io = new Server(httpServer)
  
  io.on('connection', (socket)=>{

    socket.on('joinRoom', (room)=>{
      
      switch (room) {
        case 'room1':
          socket.join('room1'); //* Si la sala no existe se crea en automatico 
          break;
      
        case 'room2':
          socket.join('room2');
          break;

        case 'room3':
          socket.join('room3');
          break;

        default:
          break;
      }

    })

  })
  
  await app.init();
  await httpServer.listen(3000);

  console.log(`Socket.io server is on Port 3000`);
}
bootstrap();
