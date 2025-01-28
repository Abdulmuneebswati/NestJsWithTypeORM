import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/user.dtos';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.findUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  updateUser() {
    return 'This is a put request to update a user';
  }

  @Delete()
  deleteUser() {
    return 'This is a delete request to delete a user';
  }
}
