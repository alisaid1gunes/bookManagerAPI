import { Inject, Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    const hashedPassword = bcrypt.hash(createUserDto.password, 10);
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await hashedPassword;
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['books'] });
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }
  async findOneByEmail(email: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
    console.log(user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = new User();
    Object.assign(user, updateUserDto);

    return this.usersRepository.update(id, user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
