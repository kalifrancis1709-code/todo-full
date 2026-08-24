import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
<<<<<<< HEAD
    return JSON.stringify('Le serveur est up!');
  }
=======
    return JSON.stringify('Le serveur est Up !');
  }

>>>>>>> main
  getHello(): string {
    return 'Hello World!';
  }
}
