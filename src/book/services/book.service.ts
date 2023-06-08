import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '@/bookEntity/book.entity';
import { CreateBookDto, UpdateBookDto } from '@/bookDto/book.dto';
import { BookPageService } from '@/bookPageService/book-page.service';
import { UsersService } from '@/userService/users.service';
import { CategoryService } from '@/categoryService/category.service';
import { BookDoc } from '../doc/book.doc';
import { plainToInstance } from 'class-transformer';
import { BookRepository } from '@/bookRepository/book.repository';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private userServices: UsersService,
    private categoryServices: CategoryService,
    private bookPageServices: BookPageService,
    private customReposity: BookRepository,
  ) {}

  async create(book: CreateBookDto): Promise<BookDoc | HttpException> {
    const userFound: any = await this.userServices.getOneUserById(
      book.authorId,
    );

    if (userFound.status == HttpStatus.NOT_FOUND) {
      return userFound;
    }

    const category: any = await this.categoryServices.getOneById(
      book.categoryId,
    );

    if (category.status == HttpStatus.NOT_FOUND) {
      return category;
    }

    const newBook = this.bookRepository.create(book);
    const text = {
      text: book.text,
    };
    const booksPage = await this.bookPageServices.create(text);

    newBook.totalPage = booksPage.count;
    newBook.bookPage = booksPage.BookPage;
    newBook.category = category;
    newBook.author = userFound;

    const bookSave = this.bookRepository.save(newBook);
    const bookPlain = plainToInstance(BookDoc, bookSave);
    return bookPlain;
  }

  async getAllBook(): Promise<BookDoc[] | HttpException> {
    const book = await this.bookRepository.find({
      relations: {
        bookPage: true,
        author: true,
        category: true,
      },
    });

    if (!book) {
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }

  async getBookById(id: number): Promise<BookDoc | HttpException> {
    const book = await this.bookRepository.findOne({
      relations: {
        bookPage: true,
        author: true,
        category: true,
      },
      where: {
        id,
      },
    });

    if (!book) {
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }

  async updateBook(id: number, book: UpdateBookDto) {
    const bookCheck: any = await this.getBookById(id);

    if (bookCheck.status == HttpStatus.NOT_FOUND) {
      return bookCheck;
    }

    return this.bookRepository.update({ id }, book);
  }

  async getBookAndPage(
    bookId: number,
    page: number,
  ): Promise<BookDoc | HttpException> {
    const book = await this.customReposity.getBookAndPage(bookId, page);

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }
}
