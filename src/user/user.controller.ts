import {
  Controller,
  Post,
  Body,
  Get,
  ParseIntPipe,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
    return { message: 'ok' };
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Patch('edit')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    this.userService.updateUser(updateUserDto);
    return { message: 'ok' };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.userService.deleteUser(id);
  }
}
