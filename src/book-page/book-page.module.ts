import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookPage } from './entity/book-page.entity';
import { BookPageService } from '@/bookPageService/book-page.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookPage])],
  providers: [BookPageService],
  exports: [BookPageService],
})
export class BookPageModule {}
