import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
<<<<<<< HEAD
=======
  getHealth(): string {
    return JSON.stringify('Le serveur est up!');
  }
>>>>>>> frank-nest
  getHello(): string {
    return 'Hello World!';
  }
}
