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
  
  const teachers = io.of('/teachers') // Namespace de teeachers  
  const students = io.of('/students')
  
  teachers.on('connect', (socket) => {
    console.log(socket.id + "Connected to the teachers namespace");
    
  })
  
  students.on('connect', (socket) => {
    console.log(socket.id + "Connected to the students namespace");
  })

  await app.init();
  await httpServer.listen(3000);

  console.log(`Socket.io server is on Port 3000`);
}
bootstrap();
