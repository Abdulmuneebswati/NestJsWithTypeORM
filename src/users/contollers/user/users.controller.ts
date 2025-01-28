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
import { updateUserDto } from 'src/users/dtos/updateUser.dto';
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
}
