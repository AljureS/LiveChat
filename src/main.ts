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

  const socketsOnline = [];
  
  io.on('connection', (socket)=>{

    socketsOnline.push(socket.id);

    //Basic Emition from server
    socket.emit('welcomeMessage', 'Welcome to LiveChat user with ID: ' + socket.id)

    //Basic Listener from server
    socket.on("serverWelcome", (data)=>{
      console.log(data);
    })

    //Total Emition from server to all users
    io.emit("everyone", socket.id + ' joined the chat')

    //Emision a uno solo 
    socket.on("last", (message)=>{
      const lastSocket = socketsOnline[socketsOnline.length - 1];
      io.to(lastSocket).emit("salute", message); 
    })

    //? on once off
    // socket.emit('on', "Holi")
    // socket.emit('on', "Holi")

    // socket.emit('once', "Holi")
    // socket.emit('once', "Holi")
    // socket.emit('once', "Holi")

    socket.emit('off', "Holi")

    setTimeout(()=>{
      socket.emit('off', "Holi")
    }, 3000)
  })
  
  await app.init();
  await httpServer.listen(3000);

  console.log(`Socket.io server is on Port 3000`);
}
bootstrap();
