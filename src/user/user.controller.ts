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
import * as bcrypt from 'bcrypt';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    this.userService.createUser({ ...createUserDto, password: hashPassword });
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
