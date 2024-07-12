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
  
  const support = io.of('/support') // Namespace of the support team //?could add supervisors 
  const users = io.of('/users')  // Regular users namspace
  
  support.on('connect', (socket) => {
    console.log(socket.id + "Connected to the support namespace");
    
    socket.on('sendMessage', (data)=>{
      support.emit('message', data)
    })
  })
  
  users.on('connect', (socket) => {
    console.log(socket.id + "Connected to the users namespace");

    socket.on('sendMessage', (data)=>{
      users.emit('message', data)
    })
  })

  await app.init();
  await httpServer.listen(3000);

  console.log(`Socket.io server is on Port 3000`);
}
bootstrap();
