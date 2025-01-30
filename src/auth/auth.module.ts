import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './contollers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret:
        'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
