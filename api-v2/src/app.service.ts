import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return JSON.stringify('Le serveur est Up !');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
