import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { createServer } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtain de HTTP server from NestJS instance, NEst and Socket use the same HTTP server
  const httpServer = createServer(app.getHttpServer()); 
  
  // Create an instace of Socket.io using the HTTP server //!NestJS
  const io = new Server(httpServer)

  io.on('connection', (socket)=>{
    console.log('user connected', socket.id);
  })
  
  await httpServer.listen(3000);

  console.log(`Socket.io server is on Port 3000`);
}
bootstrap();
