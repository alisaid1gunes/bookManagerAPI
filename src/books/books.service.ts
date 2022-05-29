import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    console.log(createBookDto);
    const book: Book = new Book();
    book.name = createBookDto.name;
    book.pageCount = createBookDto.pageCount;
    book.user = createBookDto.userId;
    const createdBook = await this.booksRepository.save(book);
    if (createdBook === undefined || createdBook === null) {
      return {
        success: false,
        message: 'Book not created',
      };
    }
    return { success: true, message: 'Book created', data: createdBook };
  }

  async findAll() {
    const books = await this.booksRepository.find({ relations: ['user'] });
    if (books === undefined || books === null) {
      return {
        success: false,
        message: 'Book not found',
      };
    }
    return { success: true, message: 'Book found', data: books };
  }

  async findOne(id: number) {
    const book = await this.booksRepository.find({
      relations: ['user'],
      where: { id },
    });
    if (book === undefined || book === null) {
      return {
        success: false,
        message: 'Book not found',
      };
    }
    return { success: true, message: 'Book found', data: book };
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const updateResult = await this.booksRepository.update(id, updateBookDto);
    if (updateResult.affected === 0) {
      return {
        success: false,
        message: 'Book not updated',
      };
    }
    return { success: true, message: 'Book updated' };
  }

  async remove(id: number) {
    const deleteResult = await this.booksRepository.delete(id);
    if (deleteResult.affected === 0) {
      return {
        success: false,
        message: 'Book not deleted',
      };
    }
    return { success: true, message: 'Book deleted' };
  }
}
