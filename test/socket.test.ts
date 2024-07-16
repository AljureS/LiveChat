import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket as SocketIOSocket } from 'socket.io';
import { io as Client, Socket as ClientSocket } from 'socket.io-client';

describe('Testing Socket', () => {
    let io: SocketIOServer;
    let httpServer: HttpServer;
    let serverSocket: SocketIOSocket;
    let clientSocket: ClientSocket;

    // Antes de empezar a hacer los test, creamos el servidor
    beforeAll((done) => {
    httpServer = createServer();
    io = new SocketIOServer(httpServer);

    httpServer.listen(() => {
        const port = (httpServer.address() as { port: number }).port;
        clientSocket = Client(`http://localhost:${port}`);

        io.on('connection', (socket) => {
                serverSocket = socket;
        });

        clientSocket.on('connect', done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
        httpServer.close();
    });

    test('should communicate', (done) => {
        serverSocket.on('hello', (msg) => {
        expect(msg).toBe('world');
        done();
        });
        clientSocket.emit('hello', 'world');
    });
});
