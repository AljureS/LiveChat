import 'socket.io';

declare module 'socket.io' {
    interface Socket {
        connectedRoom?: string;
    }
}