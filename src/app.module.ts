import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Post, Profile],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
