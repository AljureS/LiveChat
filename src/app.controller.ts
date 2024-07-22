import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  getIndex(@Res() res: Response) {
    const filePath = this.appService.getIndex();
    return res.sendFile(filePath);
  } 

  @Get('register')
  getRegister(@Res() res: Response) {
    const filePath = this.appService.getRegister();
    return res.sendFile(filePath);
  }

}
