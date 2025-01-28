import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { createUserParams } from 'src/types/types';
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

  updateUser() {
    return 'This is a put request to update a user';
  }

  deleteUser() {
    return 'This is a delete request to delete a user';
  }
}
