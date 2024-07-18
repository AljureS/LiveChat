import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as express from 'express';
import { instrument } from '@socket.io/admin-ui';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SocketsService implements OnModuleInit {
    private server: Server;

    async onModuleInit() {
        const app = express();
        const httpServer = createServer(app);

        this.server = new Server(httpServer, {
            cors: {
                origin: ["https://admin.socket.io"],
                methods: ["GET", "POST"],
                credentials: true,
            },
            transports: ['websocket', 'polling'],
        });

        // Obtener y hashear la contraseña de forma asíncrona
        const passwordHash = await bcrypt.hash(process.env.PASSWORD_SOCKET || '', 12);

        instrument(this.server, {
            auth: {
                type: 'basic',
                username: process.env.USERNAME_SOCKET || '',
                password: passwordHash,
            }
        });

        this.server.on('connection', (socket) => {
            console.log(`Client connected: ${socket.id}`);
        });

        httpServer.listen(3000, () => {
            console.log('Socket.IO server is running on port 3000');
        });
    }
}
