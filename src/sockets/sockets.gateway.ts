import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { instrument } from '@socket.io/admin-ui';
import * as bcrypt from 'bcrypt';

@WebSocketGateway({
  cors: {
    origin: ["https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})

export class SocketsGateway implements OnGatewayInit,  OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketsGateway');

  async afterInit(server: Server){
    // Obtener y hashear la contraseña de forma asíncrona
    const passwordHash = await bcrypt.hash(process.env.PASSWORD_SOCKET || '', 12);

    // Instrumentar el servidor con admin-ui
    instrument(server, {
      auth: {
        type: 'basic',
        username: process.env.USERNAME_SOCKET || '',
        password: passwordHash
      }
    });

    this.logger.log('Socket server initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log('Client connected by transport: ' + client.conn.transport.name);

    client.on('disconnect', (reason) => {
      this.logger.log(`Client disconnected: ${client.id}, Reason: ${reason}`);
    });

    client.on('error', (error) => {
      this.logger.error(`Socket error: ${error}`);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
