import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '@/bookEntity/book.entity';
import {
  CreateBookDto,
  UpdateBookDto,
  UpdateBookPageDto,
} from '@/bookDto/book.dto';
import { BookPageService } from '@/bookPageService/book-page.service';
import { UsersService } from '@/userService/users.service';
import { CategoryService } from '@/categoryService/category.service';
import { BookDoc } from '../doc/book.doc';
import { plainToInstance, Type } from 'class-transformer';
import { BookRepository } from '@/bookRepository/book.repository';
import { uploadImage } from 'helper/upload';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private userServices: UsersService,
    private categoryServices: CategoryService,
    private bookPageServices: BookPageService,
    private customReposity: BookRepository,
  ) {}

  async create(book: CreateBookDto): Promise<BookDoc> {
    const userFound: any = await this.userServices.getOneUserById(
      book.authorId,
    );

    const category: any = await this.categoryServices.getOneById(
      book.categoryId,
    );

    const newBook = this.bookRepository.create(book);
    const text = book.text;

    const booksPage = await this.bookPageServices.create({ text });

    const url = await uploadImage({ ...book.image, file: 'book' });

    newBook.imageUrl = url;
    newBook.totalPage = booksPage.count;
    newBook.bookPage = booksPage.BookPage;
    newBook.category = category;
    newBook.author = userFound;

    const bookSave = this.bookRepository.save(newBook);
    const bookPlain = plainToInstance(BookDoc, bookSave);
    return bookPlain;
  }

  async getAllBook(): Promise<BookDoc[]> {
    const book = await this.bookRepository.find({
      relations: {
        bookPage: true,
        author: true,
        category: true,
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }

  async getBookById(id: number): Promise<BookDoc> {
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
      throw new NotFoundException('Book not found');
    }

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }

  async updateBook(id: number, book: UpdateBookDto) {
    let url: string;
    await this.getBookById(id);
    if (book.image) {
      url = await uploadImage({ ...book.image, file: 'book' });
    }
    delete book.image;
    return this.bookRepository.update({ id }, { ...book, imageUrl: url });
  }

  async getBookPageByType(bookId: number, page: number, type: string) {
    const book = await this.customReposity.getBookPage(bookId, page);
    if (!book) throw new NotFoundException('Books not found');
    let convertBook = {};
    if (type === 'HTML') {
      convertBook = {
        title: `<h1>${book.title}</h1>`,
        id: book.id,
        text: `<h1>${book.title}</h1>
              <p>${book.bookPage[0].text}</p>`,
      };
    }

    if (type === 'PLAIN') {
      convertBook = {
        title: book.title,
        id: book.id,
        text: book.bookPage[0].text,
      };
    }

    if (type === 'JSON') {
      convertBook = {
        id: book.id,
        text: `
        {title: ${book.title},
        text: ${book.bookPage[0].text} }`,
      };
    }

    return convertBook;
  }

  async getBookPage(bookId: number, page: number): Promise<BookDoc> {
    const book = await this.customReposity.getBookPage(bookId, page);

    if (!book) throw new NotFoundException('Books not found');

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }

  async getBookByAuthor(authId: number): Promise<BookDoc[]> {
    const author = await this.userServices.getOneUserById(authId);

    const book = await this.customReposity.getBookByAuthor(author.id);

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }

  async getBooksByCategory(categoryId: number[]) {
    const category = await this.categoryServices.getAllByIds(categoryId);

    const categoryIds = category.map(({ id }) => id);

    const book = await this.customReposity.getBooksByCategory(categoryIds);

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }

  async getAllBooksByCategory(categoryId: number) {
    const category = await this.categoryServices.getOneById(categoryId);

    const book = await this.customReposity.getAllBooksByCategory(category.id);
    const books = {
      books: book,
      category: category.name,
    };
    const bookPlain = plainToInstance(BookDoc, books);
    return bookPlain;
  }

  async deleteBookById(bookId: number) {
    await this.bookRepository.delete(bookId);
  }

  async updateBookPageById(
    bookId: number,
    pageId: number,
    text: UpdateBookPageDto,
  ) {
    const checkBook = await this.bookRepository.findOne({
      where: { id: bookId },
    });

    if (!checkBook) throw new NotFoundException('Book not found');

    await this.bookPageServices.updateBookPage(bookId, pageId, text);
  }

  async getBookByName(name: string): Promise<BookDoc[]> {
    const books = await this.customReposity.getAllBooksByName(name);

    const bookPlain = plainToInstance(BookDoc, books);
    return bookPlain;
  }
}
