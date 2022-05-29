import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    const createdUser = await this.usersRepository.save(user);
    if (createdUser === undefined || createdUser === null) {
      return {
        success: false,
        message: 'User not created',
        data: createdUser,
      };
    }
    return { success: true, message: 'User created', data: createdUser };
  }

  async findAll() {
    const users = await this.usersRepository.find({ relations: ['books'] });
    if (users === undefined || users === null) {
      return {
        success: false,
        message: 'Users not found',
      };
    }
    return { success: true, message: 'Users  found', data: users };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (user === undefined || user === null) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    return { success: true, message: 'User found', data: user };
  }
  async findOneByEmail(email: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
    if (user === undefined || user === null) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    return { success: true, message: 'User found', data: user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = new User();
    Object.assign(user, updateUserDto);

    const updateResult = await this.usersRepository.update(id, user);

    if (updateResult.affected === 0) {
      return {
        success: false,
        message: 'User not updated',
      };
    }
    return { success: true, message: 'User updated' };
  }

  async remove(id: number) {
    const deleteResult = await this.usersRepository.delete(id);
    if (deleteResult.affected === 0) {
      return {
        success: false,
        message: 'User not deleted',
      };
    }
    return { success: true, message: 'User deleted' };
  }
}
