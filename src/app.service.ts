import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AppService {
  getIndex(): string {
    return join(__dirname, '..', 'src', 'views', 'index.html');	
  }

  getRegister(): string {
    return join(__dirname, '..', 'src', 'views', 'register.html');
  }
} 
