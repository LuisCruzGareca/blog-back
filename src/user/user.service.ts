import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async listUserId(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async updateUser(updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id: updateUserDto.id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
      },
    });
  }

  deleteUser(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
