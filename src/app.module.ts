import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { dataSourceOptions } from 'src/database/data-source';
import { CategoryModule } from './category/category.module';
import { BookPageModule } from './book-page/book-page.module';
import { BookModule } from './book/book.module';
import { BookRentModule } from './book-rent/book-rent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    RolesModule,
    AuthModule,
    PassportModule.register({
      session: true,
    }),
    CategoryModule,
    BookPageModule,
    BookModule,
    BookRentModule,
  ],
})
export class AppModule {}
