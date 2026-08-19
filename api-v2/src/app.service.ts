import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return JSON.stringify('Le serveur est up!');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
