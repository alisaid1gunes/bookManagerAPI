import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    if (users.success === false) {
      throw new HttpException(users.message, HttpStatus.NOT_FOUND);
    }
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (user.success === false) {
      throw new HttpException(user.message, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateResult = await this.usersService.update(+id, updateUserDto);
    if (updateResult.success === false) {
      throw new HttpException(updateResult.message, HttpStatus.BAD_REQUEST);
    }
    return updateResult;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteResult = await this.usersService.remove(+id);
    if (deleteResult.success === false) {
      throw new HttpException(deleteResult.message, HttpStatus.BAD_REQUEST);
    }
    return deleteResult;
  }
}
