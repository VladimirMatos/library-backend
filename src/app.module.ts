import { Module } from '@nestjs/common';
import { UsersModule } from '@/userModule/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '@/rolesModule/roles.module';
import { AuthModule } from '@/authModule/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CategoryModule } from '@/categoryModule/category.module';
import { BookPageModule } from '@/bookPageModule/book-page.module';
import { BookModule } from '@/bookModule/book.module';
import { BookRentModule } from '@/bookRentModule/book-rent.module';
import { dataSourceOptions } from 'database/data-source';
import { BannersModule } from '@/bannerModule/banners.module';

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
    BannersModule,
  ],
})
export class AppModule {}
