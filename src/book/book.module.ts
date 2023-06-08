import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '@/categoryModule/category.module';
import { BookPageModule } from '@/bookPageModule/book-page.module';
import { BookService } from '@/bookService/book.service';
import { BookController } from '@/bookController/book.controller';
import { Book } from '@/bookEntity/book.entity';
import { BookRepository } from '@/bookRepository/book.repository';

@Module({
  providers: [BookService, BookRepository],
  controllers: [BookController],
  imports: [
    UsersModule,
    CategoryModule,
    BookPageModule,
    TypeOrmModule.forFeature([Book]),
  ],
  exports: [BookService],
})
export class BookModule {}
