import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { BookRent } from '@/bookRentEntity/book-rent.entity';
import { BookService } from '@/bookService/book.service';
import { CreateBookRentDto } from '@/bookRentDto/book-rent.dto';
import { UsersService } from '@/userService/users.service';
import { BookRentDoc } from '@/bookRentDoc/book-rent.doc';
import { plainToInstance } from 'class-transformer';
import { BookRentRepository } from '@/bookRentRepository/book-rent.repository';

@Injectable()
export class BookRentService {
  constructor(
    @InjectRepository(BookRent)
    private bookRentRepository: Repository<BookRent>,
    private userService: UsersService,
    private bookService: BookService,
    private customRepository: BookRentRepository,
  ) {}

  async createBookRent(
    bookRent: CreateBookRentDto,
  ): Promise<BookRentDoc | HttpException | { message?: string }> {
    const userFound: any = await this.userService.getOneUserById(
      bookRent.userId,
    );

    if (userFound.status == HttpStatus.NOT_FOUND) {
      return userFound;
    }

    const bookCheck: any = await this.bookService.getBookById(bookRent.bookId);

    if (bookCheck.status == HttpStatus.NOT_FOUND) {
      return bookCheck;
    }

    const newRent = this.bookRentRepository.create();
    newRent.book = bookCheck;
    newRent.user = userFound;

    const rent = this.bookRentRepository.save(newRent);

    const rentPlain = plainToInstance(BookRentDoc, rent);
    return rentPlain;
  }

  async retornBook(
    bookId: number,
  ): Promise<HttpException | { message?: string }> {
    const rentCheck = await this.customRepository.getBookRentStatusFalse(
      bookId,
    );

    const rentDate = moment(rentCheck.createdAt);
    const dateNow = moment();
    const diff = dateNow.diff(rentDate, 'days');
    const pay = 5 * (diff - 13);

    if (dateNow.diff(rentDate, 'days') > 13) {
      return {
        message: `Need to pay ${pay}$, you passed the limit time`,
      };
    }

    this.updateBookRentStatus(bookId, true);

    return {
      message: 'Book return',
    };
  }

  async getOneBookRent(bookId: number): Promise<BookRentDoc | HttpException> {
    const rentCheck = await this.customRepository.getBookRentStatusTrue(bookId);

    const bookRentPlain = plainToInstance(BookRentDoc, rentCheck);

    return bookRentPlain;
  }

  async updateBookRentStatus(bookId: number, status: boolean) {
    const rentCheck: any = await this.getOneBookRent(bookId);

    return this.bookRentRepository.update(rentCheck.id, { status });
  }
}
