// import { INestApplication, Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { Server } from 'socket.io';
// import { createServer } from 'http';
// import * as express from 'express';
// import { instrument } from '@socket.io/admin-ui';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class SocketsService implements OnModuleInit {
//     private server: Server;

//     async onModuleInit() {
//         // Obtener la instancia de la aplicación desde la variable global
//         const app = global['app'] as INestApplication;
//         const httpServer = app.getHttpServer();

//         this.server = new Server(httpServer, {
//             cors: {
//                 origin: ["https://admin.socket.io"],
//                 methods: ["GET", "POST"],
//                 credentials: true, 
//             },
//             transports: ['websocket', 'polling'],
//         });

//         // Obtener y hashear la contraseña de forma asíncrona
//         const passwordHash = await bcrypt.hash(process.env.PASSWORD_SOCKET || '', 12);

//         instrument(this.server, {
//             auth: {
//                 type: 'basic',
//                 username: process.env.USERNAME_SOCKET || '',
//                 password: passwordHash,
//             }, 
//         });

//         this.server.on('connection', (socket) => {
//             console.log(`Client connected: ${socket.id}`);
//             console.log('Client connectetd by transport: ' + socket.conn.transport.name);
            
//             socket.on('disconnect', (reason) => {
//                 console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
//             });

//             socket.on('error', (error) => {
//                 console.error(`Socket error: ${error}`);
//             });

//         });

//     }
// }
