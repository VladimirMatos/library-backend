import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { Book } from './book.entity';
import { AuthenticateGuard } from 'src/auth/utils/LocalGuard';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @UseGuards(AuthenticateGuard)
  @Post()
  create(@Body() book: CreateBookDto): Promise<Book | HttpException> {
    return this.bookService.create(book);
  }

  @Get()
  getAllBook(): Promise<Book[] | HttpException> {
    return this.bookService.getAllBook();
  }

  @Get(':id/page/:pageId')
  getBookAndPage(
    @Param('id') id: number,
    @Param('pageId') pageId: number,
  ): Promise<Book | HttpException> {
    return this.bookService.getBookAndPage(id, pageId);
  }

  @Get(':id')
  getBookById(@Param('id') id: number): Promise<Book | HttpException> {
    return this.bookService.getBookById(id);
  }

  @UseGuards(AuthenticateGuard)
  @Patch(':id')
  updateBook(
    @Param('id') id: number,
    @Body() book: UpdateBookDto,
  ): Promise<Book | HttpException> {
    return this.bookService.updateBook(id, book);
  }
}
