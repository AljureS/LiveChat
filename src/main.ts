// process.env.DEBUG = '*'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { instrument } from '@socket.io/admin-ui';

async function bootstrap() {
  const expressApp = express(); // Create an Express application
  const adapter = new ExpressAdapter(expressApp); // So Nest and Socket can use the same http server
  const app = await NestFactory.create(AppModule, adapter); // Adpater Express to NestJS

  const httpServer = createServer(expressApp); // Create HTTP server from Express app

  // Enable cors for de Nest app
  app.enableCors({
    origin: ['https://admin.socket.io'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permitir todos los métodos HTTP
    credentials: true
  })

  // Create an instace of Socket.io using the HTTP server 
  const io = new Server(httpServer, {
    cors: {
      origin: ["https://admin.socket.io"],
      methods: ["GET", "POST"],
      credentials: true, // Habilitar credenciales si es necesario
    },
    transports: ['websocket', 'polling'], // Forzar el uso de WebSockets y habilitar polling como respaldo
  })

  instrument(io, {
    auth: false
  })
  
  io.on('connection', (socket)=>{

    socket.on("circle position", position => {
      socket.broadcast.emit("move circle", position);
    });

  })
  
  await app.init();
  await httpServer.listen(3000);

  console.log(`Socket.io server is on Port 3000`);
}
bootstrap();
