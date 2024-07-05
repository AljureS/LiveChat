import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGatewayModule } from './chat-gateway/chat-gateway.module';

@Module({
  imports: [ChatGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
