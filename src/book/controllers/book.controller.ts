import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from '@/bookService/book.service';
import {
  CreateBookDto,
  UpdateBookDto,
  UpdateBookPageDto,
} from '@/bookDto/book.dto';
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
  // @UseGuards(AuthenticateGuard)
  @Post()
  create(@Body() book: CreateBookDto): Promise<BookDoc> {
    return this.bookService.create(book);
  }

  @ApiOkResponse({
    description: 'Book found',
    type: [BookDoc],
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get()
  getAllBook(): Promise<BookDoc[]> {
    return this.bookService.getAllBook();
  }

  @ApiOkResponse({
    description: 'Book found',
    type: BookDoc,
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get(':id/page/:pageId/type/:type')
  getBookAndPage(
    @Param('id') id: number,
    @Param('pageId') pageId: number,
    @Param('type') type: string,
  ) {
    return this.bookService.getBookPageByType(id, pageId, type);
  }

  @ApiOkResponse({
    description: 'Book found',
    type: BookDoc,
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get(':id')
  getBookById(@Param('id') id: number): Promise<BookDoc> {
    return this.bookService.getBookById(id);
  }
  @ApiOkResponse({
    description: 'Book found',
    type: [BookDoc],
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get('/author/:id')
  getBookByAuthor(@Param('id') id: number): Promise<BookDoc[]> {
    return this.bookService.getBookByAuthor(id);
  }

  @ApiOkResponse({
    description: 'Book found',
    type: [BookDoc],
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Post('/category')
  getBookByCategory(@Body() ids: { ids: number[] }) {
    return this.bookService.getBooksByCategory(ids.ids);
  }

  @ApiOkResponse({
    description: 'Book found',
    type: [BookDoc],
  })
  @ApiBadRequestResponse({
    description: 'Book not found',
  })
  @Get('/category/:id')
  getAllBookByCategory(@Param('id') id: number) {
    return this.bookService.getAllBooksByCategory(id);
  }

  @ApiOkResponse({
    description: 'Book updated',
  })
  @ApiBadRequestResponse({
    description: 'Book cannot be updated',
  })
  @Patch(':id')
  updateBook(@Param('id') id: number, @Body() book: UpdateBookDto) {
    return this.bookService.updateBook(id, book);
  }

  @ApiOkResponse({
    description: 'Book delete',
  })
  @ApiBadRequestResponse({
    description: 'Book cannot be delete',
  })
  @Delete(':id')
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBookById(id);
  }

  @ApiOkResponse({
    description: 'Book page updated',
  })
  @ApiBadRequestResponse({
    description: 'Book page cannot be update',
  })
  @Patch(':id/page/:pageId')
  updateBookPage(
    @Param('id') id: number,
    @Param('pageId') pageId: number,
    @Body() text: UpdateBookPageDto,
  ) {
    return this.bookService.updateBookPageById(id, pageId, text);
  }

  @ApiOkResponse({
    description: 'Book page found',
  })
  @ApiBadRequestResponse({
    description: 'Book page cannot be found',
  })
  @Get(':id/page/:pageId')
  getBookPage(
    @Param('id') id: number,
    @Param('pageId') pageId: number,
  ): Promise<BookDoc> {
    return this.bookService.getBookPage(id, pageId);
  }

  @ApiOkResponse({
    description: 'Book page found',
  })
  @ApiBadRequestResponse({
    description: 'Book page cannot be found',
  })
  @Get('/name/:name')
  getBookByName(@Param('name') name: string): Promise<BookDoc[]> {
    return this.bookService.getBookByName(name);
  }
}
