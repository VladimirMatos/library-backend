import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookPage } from '../entity/book-page.entity';
import { BookPageDto } from '@/bookPageDto/book-page.dto';

@Injectable()
export class BookPageService {
  constructor(
    @InjectRepository(BookPage)
    private bookPageRepository: Repository<BookPage>,
  ) {}

  async create(book: BookPageDto) {
    let count = 1;
    let init = 0;
    let end = 501;
    const booksPages: any = [];
    const plainText = book.text.split(' ');

    for (let i = 0; i < plainText.length; i += 500) {
      const text = plainText.slice(init, end).join(' ');

      const booksPage = this.bookPageRepository.create({
        text,
        page: count,
      });
      init = end;
      end = end + 500;
      const test = await this.bookPageRepository.save(booksPage);

      booksPages.push(test);
      count++;
    }
    return {
      BookPage: booksPages,
      count: count - 1,
    };
  }

  async updateBookPage(bookId: number, page: number, text) {
    const bookPageCheck = await this.bookPageRepository.findOne({
      where: { page, book: { id: bookId } },
    });

    if (!bookPageCheck) throw new NotFoundException('Book Page not found');

    await this.bookPageRepository.update({ page, book: { id: bookId } }, text);
  }
}
