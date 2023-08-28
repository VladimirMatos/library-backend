import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { BookRentService } from '@/bookRentService/book-rent.service';
import { CreateBookRentDto } from '@/bookRentDto/book-rent.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookRentDoc } from '@/bookRentDoc/book-rent.doc';
import { AuthenticateGuard } from '@/authModule/utils/LocalGuard';

@ApiTags('book-rent')
@Controller('book-rent')
export class BookRentController {
  constructor(private bookRentService: BookRentService) {}

  @ApiOkResponse({
    description: 'Book rented',
    type: [BookRentDoc],
  })
  @ApiBadRequestResponse({
    description: 'Book cannot be rent',
    status: 404,
  })
  @UseGuards(AuthenticateGuard)
  @Post()
  rentBook(
    @Body() book: CreateBookRentDto,
  ): Promise<BookRentDoc | { message?: string }> {
    return this.bookRentService.createBookRent(book);
  }

  @ApiOkResponse({
    description: 'Book return',
  })
  @ApiAcceptedResponse({
    description: ' Need to pay x$, you passed the limit time',
  })
  @UseGuards(AuthenticateGuard)
  @Post('/return/:id')
  returnBook(@Param('id') id: number): Promise<{ message?: string }> {
    return this.bookRentService.retornBook(id);
  }
}
