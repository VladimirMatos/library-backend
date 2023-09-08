import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    await this.getBookById(id);

    return this.bookRepository.update({ id }, book);
  }

  async getBookAndPage(bookId: number, page: number): Promise<BookDoc> {
    const book = await this.customReposity.getBookAndPage(bookId, page);

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }

  async getBookByAuthor(authId: number): Promise<BookDoc[]> {
    const author = await this.userServices.getOneUserById(authId);

    const book = await this.customReposity.getBookByAuthor(author.id);

    const bookPlain = plainToInstance(BookDoc, book);
    return bookPlain;
  }
}
