import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user.success && (await bcrypt.compare(password, user.data.password))) {
      const { password, ...result } = user.data;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (user === null || user === undefined) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      success: true,
      message: 'User logged in',
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const isExist = await this.usersService.findOneByEmail(createUserDto.email);
    if (isExist.success === true) {
      return {
        success: false,
        message: 'Email already exist',
      };
    }
    const createdUser = await this.usersService.create(createUserDto);
    if (createdUser.success === false) {
      return {
        success: false,
        message: 'User not created',
      };
    }
    delete createdUser.data.password;
    return { success: true, message: 'User created', data: createdUser.data };
  }
}
