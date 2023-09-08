import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '@/bookEntity/book.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class BookRepository {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getBookAndPage(bookId: number, page: number) {
    try {
      const book = await this.bookRepository.findOneOrFail({
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

      return book;
    } catch (error) {
      if (!error) throw new NotFoundException('Book not found');
    }
  }

  async getBookByAuthor(authorId: number) {
    try {
      const book = await this.bookRepository.find({
        relations: {
          bookPage: true,
          author: true,
          category: true,
        },
        where: {
          author: {
            id: authorId,
          },
        },
      });
      if (!book) throw new NotFoundException('Books not found');
      return book;
    } catch (error) {
      if (!error) throw new NotFoundException('Book not found');
    }
  }
}
