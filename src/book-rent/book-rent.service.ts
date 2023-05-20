import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRent } from './book-rent.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateBookRentDto } from './book-rent.dto';
import { BookService } from 'src/book/book.service';
import * as moment from 'moment';

@Injectable()
export class BookRentService {
  constructor(
    @InjectRepository(BookRent)
    private bookRentRepository: Repository<BookRent>,
    private userService: UsersService,
    private bookService: BookService,
  ) {}

  async createBookRent(
    bookRent: CreateBookRentDto,
  ): Promise<BookRent | HttpException | { message?: string }> {
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
    return this.bookRentRepository.save(newRent);
  }

  async retornBook(
    bookId: number,
  ): Promise<HttpException | { message?: string }> {
    const rentCheck = await this.bookRentRepository.findOne({
      where: {
        status: false,
        book: {
          id: bookId,
        },
      },
    });

    if (!rentCheck) {
      return new HttpException('Book rent not found', HttpStatus.NOT_FOUND);
    }

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

  async getOneBookRent(bookId: number): Promise<BookRent | HttpException> {
    const rentCheck = await this.bookRentRepository.findOne({
      relations: {
        book: true,
      },
      where: {
        book: {
          id: bookId,
        },
      },
    });

    if (!rentCheck) {
      return new HttpException('Book rent not found', HttpStatus.NOT_FOUND);
    }

    return rentCheck;
  }

  async updateBookRentStatus(bookId: number, status: boolean) {
    const rentCheck: any = await this.getOneBookRent(bookId);

    if (rentCheck.status == HttpStatus.NOT_FOUND) {
      return rentCheck;
    }

    return this.bookRentRepository.update(rentCheck.id, { status });
  }
}
