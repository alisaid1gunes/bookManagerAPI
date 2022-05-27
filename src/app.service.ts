import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getNo(): string {
    return 'No!';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
