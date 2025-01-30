import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const result = { ...user };
    delete result.password;
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      result,
    };
  }
}
