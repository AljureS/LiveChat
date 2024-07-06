import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ChatModule } from './chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ChatModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'views', 'index.html'),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
