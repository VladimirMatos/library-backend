import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { UsersService } from 'src/users/users.service';
import { CategoryService } from 'src/category/category.service';
import { BookPageService } from 'src/book-page/book-page.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private userServices: UsersService,
    private categoryServices: CategoryService,
    private bookPageServices: BookPageService,
  ) {}

  async create(book: CreateBookDto): Promise<Book | HttpException> {
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

    return this.bookRepository.save(newBook);
  }

  async getAllBook(): Promise<Book[] | HttpException> {
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

    return book;
  }

  async getBookById(id: number): Promise<Book | HttpException> {
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

    return book;
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
  ): Promise<Book | HttpException> {
    const book = await this.bookRepository.findOne({
      relations: {
        bookPage: true,
        author: true,
        category: true,
      },
      where: {
        id: bookId,
        bookPage: {
          page,
        },
      },
    });

    if (!book) {
      return new HttpException('Book or Page not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }
}
