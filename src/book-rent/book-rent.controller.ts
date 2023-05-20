import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookRent } from './book-rent.entity';
import { BookRentService } from './book-rent.service';
import { CreateBookRentDto } from './book-rent.dto';
import { AuthenticateGuard } from 'src/auth/utils/LocalGuard';

@Controller('book-rent')
export class BookRentController {
  constructor(private bookRentService: BookRentService) {}

  @UseGuards(AuthenticateGuard)
  @Post()
  createBookRent(
    @Body() book: CreateBookRentDto,
  ): Promise<BookRent | HttpException | { message?: string }> {
    return this.bookRentService.createBookRent(book);
  }

  @UseGuards(AuthenticateGuard)
  @Post('/return/:id')
  returnBook(
    @Param('id') id: number,
  ): Promise<HttpException | { message?: string }> {
    return this.bookRentService.retornBook(id);
  }
}
