import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello Worl ${process.env.PORT}`;
  }
}

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  connect() {
    const host = this.configService.get<string>('HOST');
    const port = this.configService.get<number>('PORT');
    const username = this.configService.get<string>('USERNAME');
    const password = this.configService.get<string>('PASSWORD');
    const database = this.configService.get<string>('DATABASE');

    // Use these variables to configure your database connection
    console.log(host, port, username, password, database);
  }
}
