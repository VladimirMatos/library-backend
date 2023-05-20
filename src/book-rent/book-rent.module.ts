import { Module } from '@nestjs/common';
import { BookRentService } from './book-rent.service';
import { BookRentController } from './book-rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRent } from './book-rent.entity';
import { BookModule } from 'src/book/book.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [BookModule, UsersModule, TypeOrmModule.forFeature([BookRent])],
  providers: [BookRentService],
  controllers: [BookRentController],
})
export class BookRentModule {}
