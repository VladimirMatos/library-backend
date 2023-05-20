import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { CategoryModule } from 'src/category/category.module';
import { BookPageModule } from 'src/book-page/book-page.module';

@Module({
  providers: [BookService],
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
