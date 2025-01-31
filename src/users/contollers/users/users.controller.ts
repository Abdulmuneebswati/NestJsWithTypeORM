import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { updateUserDto } from '../../dtos/updateUser.dto';
import { CreateUserDto } from '../../dtos/user.dtos';
import { UsersService } from '../../services/users/users.service';
import { CreateUserPostDto } from 'src/users/dtos/createUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/createUserProfile.dto';

@Controller('users')
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

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDetails: updateUserDto,
  ) {
    await this.usersService.updateUser(id, userDetails);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.usersService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.usersService.createUserPost(id, createUserPostDto);
  }
}
