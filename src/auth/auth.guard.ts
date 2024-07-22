import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const cookies = request.headers.cookie;
    if (cookies) {
      const usernameCookie = cookies.split(';').find(c => c.trim().startsWith('username='));
      if (usernameCookie) {
        const username = usernameCookie.split('=')[1];
        if (username) {
          return true;
        }
      }
    }
    return false;
  }
}
