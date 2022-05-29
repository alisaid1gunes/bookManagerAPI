import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createBookDto: CreateBookDto) {
    const createdBook = await this.booksService.create(createBookDto);
    if (createdBook.success === false) {
      throw new HttpException(createdBook.message, HttpStatus.BAD_REQUEST);
    }
    return createdBook;
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Get()
  async findAll() {
    const books = await this.booksService.findAll();
    if (books.success === false) {
      throw new HttpException(books.message, HttpStatus.NOT_FOUND);
    }
    return books;
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.booksService.findOne(+id);
    if (book.success === false) {
      throw new HttpException(book.message, HttpStatus.NOT_FOUND);
    }
    return book;
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const updateResult = await this.booksService.update(+id, updateBookDto);
    if (updateResult.success === false) {
      throw new HttpException(updateResult.message, HttpStatus.BAD_REQUEST);
    }
    return updateResult;
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removeResult = await this.booksService.remove(+id);
    if (removeResult.success === false) {
      throw new HttpException(removeResult.message, HttpStatus.BAD_REQUEST);
    }
    return removeResult;
  }
}
