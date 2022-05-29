import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseFilters(HttpExceptionFilter)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const loginResult = await this.authService.login(loginDto);
    if (loginResult.success === false) {
      throw new HttpException(loginResult.message, HttpStatus.UNAUTHORIZED);
    }
    return loginResult;
  }
  @UseFilters(HttpExceptionFilter)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const signupResult = await this.authService.signup(createUserDto);
    if (signupResult.success === false) {
      throw new HttpException(signupResult.message, HttpStatus.BAD_REQUEST);
    }
    return signupResult;
  }
}
