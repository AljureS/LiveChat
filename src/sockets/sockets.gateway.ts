import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { instrument } from '@socket.io/admin-ui';
import * as bcrypt from 'bcrypt';
import { userInfo } from 'os';

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

  //afte Init configures the server
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

    this.logger.log('Socket gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    console.log('Client connectetd by transport: ' + client.conn.transport.name);
    setTimeout(() => {
      console.log('Client connectetd by transport: ' + client.conn.transport.name);
    }, 1000)

    client.on('disconnect', (reason) => {
      console.log(`Client disconnected: ${client.id}, Reason: ${reason}`);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() message){

    const cookie = client.handshake.headers.cookie;
    const username = cookie.split("=").pop();
    this.logger.log(`Message from ${username}: ${message}`);

    this.server.emit('message', {
      user: username,
      message
    });


  }
}
