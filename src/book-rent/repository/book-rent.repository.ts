import { InjectRepository } from '@nestjs/typeorm';
import { BookRent } from '@/bookRentEntity/book-rent.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class BookRentRepository {
  constructor(
    @InjectRepository(BookRent)
    private bookRentRepository: Repository<BookRent>,
  ) {}

  async getBookRentStatusFalse(bookId: number) {
    try {
      const bookRent = await this.bookRentRepository.findOneOrFail({
        where: {
          status: false,
          book: {
            id: bookId,
          },
        },
      });

      return bookRent;
    } catch (error) {
      throw new NotFoundException('Book not found');
    }
  }

  async getBookRentStatusTrue(bookId: number) {
    try {
      const bookRent = await this.bookRentRepository.findOneOrFail({
        where: {
          status: true,
          book: {
            id: bookId,
          },
        },
      });
      return bookRent;
    } catch (error) {
      throw new NotFoundException('Book not found');
    }
  }
}
