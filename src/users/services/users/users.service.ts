import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/User';
import { createUserParams, updateUserParams } from 'src/types/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.usersRepository.find();
  }

  createUser(userDetails: createUserParams) {
    const newUser = this.usersRepository.create(userDetails);
    return this.usersRepository.save(newUser);
  }

  updateUser(id: number, userDetails: updateUserParams) {
    return this.usersRepository.update({ id }, { ...userDetails });
  }

  deleteUser(id: number) {
    return this.usersRepository.delete({ id });
  }
}
