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
import { AuthenticateGuard } from 'src/auth/utils/LocalGuard';
import { BookService } from '@/bookService/book.service';
import { Book } from '@/bookEntity/book.entity';
import { CreateBookDto, UpdateBookDto } from '@/bookDto/book.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookDoc } from '@/bookDoc/book.doc';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @ApiResponse({
    description: 'Book created',
    type: BookDoc,
    status: 201,
  })
  @ApiBadRequestResponse({
    description: 'Book cannot be created',
  })
  @UseGuards(AuthenticateGuard)
  @Post()
  create(@Body() book: CreateBookDto): Promise<BookDoc | HttpException> {
    return this.bookService.create(book);
  }

  @ApiOkResponse({
    description: 'Book found',
    type: BookDoc,
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get()
  getAllBook(): Promise<BookDoc[] | HttpException> {
    return this.bookService.getAllBook();
  }

  @ApiOkResponse({
    description: 'Book found',
    type: BookDoc,
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get(':id/page/:pageId')
  getBookAndPage(
    @Param('id') id: number,
    @Param('pageId') pageId: number,
  ): Promise<BookDoc | HttpException> {
    return this.bookService.getBookAndPage(id, pageId);
  }

  @ApiOkResponse({
    description: 'Book found',
    type: BookDoc,
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get(':id')
  getBookById(@Param('id') id: number): Promise<BookDoc | HttpException> {
    return this.bookService.getBookById(id);
  }

  @ApiOkResponse({
    description: 'Book updated',
  })
  @ApiBadRequestResponse({
    description: 'Book cannot be updated',
  })
  @UseGuards(AuthenticateGuard)
  @Patch(':id')
  updateBook(
    @Param('id') id: number,
    @Body() book: UpdateBookDto,
  ): Promise<Book | HttpException> {
    return this.bookService.updateBook(id, book);
  }
}
