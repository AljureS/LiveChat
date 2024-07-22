import { INestApplication, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SocketsModule } from './sockets/sockets.module';
import { SocketsService } from './sockets/sockets.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'views'),
    }),
    SocketsModule
  ],
  controllers: [AppController],
  providers: [
    SocketsService,
    AppService
  ],
})
export class AppModule {}
