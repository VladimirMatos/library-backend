import { Module } from '@nestjs/common';
import { BookPageService } from './book-page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookPage } from './book-page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookPage])],
  providers: [BookPageService],
  exports: [BookPageService],
})
export class BookPageModule {}
