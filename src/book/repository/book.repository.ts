import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '@/bookEntity/book.entity';
import { In, Like, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class BookRepository {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getBookPage(bookId: number, pageId: number) {
    try {
      const book = await this.bookRepository.findOne({
        relations: {
          bookPage: true,
          author: true,
          category: true,
        },
        where: {
          id: bookId,
          bookPage: {
            page: pageId,
            book: {
              id: bookId,
            },
          },
        },
      });

      if (!book) throw new NotFoundException('Books not found');
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

  async getBooksByCategory(categoryId: number[]) {
    try {
      const result = {};
      const books = [];
      for (const category of categoryId) {
        const book = await this.bookRepository.find({
          relations: {
            bookPage: true,
            author: true,
            category: true,
          },
          where: {
            category: {
              id: category,
            },
          },
          take: 3,
        });

        const bookCategory = (result[book[0].category.name] = book);
        books.push({
          bookCategory,
          category: book[0].category.name,
        });
      }

      // const bookFlat = books.flat();

      if (!books) throw new NotFoundException('Books not found');
      return books;
    } catch (error) {
      if (!error) throw new NotFoundException('Book not found');
    }
  }

  async getAllBooksByCategory(categoryId: number) {
    try {
      const book = await this.bookRepository.find({
        relations: {
          bookPage: true,
          author: true,
          category: true,
        },
        where: {
          category: {
            id: categoryId,
          },
        },
      });

      if (!book) throw new NotFoundException('Books not found');
      return book;
    } catch (error) {
      if (!error) throw new NotFoundException('Book not found');
    }
  }

  async getAllBooksPageById(bookId: number, pageId: number) {
    try {
      const book = await this.bookRepository.find({
        relations: {
          bookPage: true,
          author: true,
          category: true,
        },
        where: {
          id: bookId,
          bookPage: {
            id: pageId,
          },
        },
      });

      if (!book) throw new NotFoundException('Books not found');
      return book;
    } catch (error) {
      if (!error) throw new NotFoundException('Book not found');
    }
  }

  async getAllBooksByName(name: string) {
    try {
      const book = await this.bookRepository.find({
        relations: {
          bookPage: true,
          author: true,
          category: true,
        },
        where: {
          title: Like(`${name}%`),
        },
        skip: 0,
        take: 5,
      });

      if (!book) throw new NotFoundException('Books not found');
      return book;
    } catch (error) {
      if (!error) throw new NotFoundException('Book not found');
    }
  }
}
