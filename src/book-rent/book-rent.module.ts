import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from '@/bookModule/book.module';
import { UsersModule } from '@/userModule/users.module';
import { BookRent } from '@/bookRentEntity/book-rent.entity';
import { BookRentService } from '@/bookRentService/book-rent.service';
import { BookRentController } from '@/bookRentController/book-rent.controller';
import { BookRentRepository } from '@/bookRentRepository/book-rent.repository';

@Module({
  imports: [BookModule, UsersModule, TypeOrmModule.forFeature([BookRent])],
  providers: [BookRentService, BookRentRepository],
  controllers: [BookRentController],
})
export class BookRentModule {}
