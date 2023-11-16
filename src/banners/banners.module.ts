import { Module } from '@nestjs/common';
import { BannersService } from '@/bannerService/banners.service';
import { BannersController } from '@/bannerController/banners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banners } from '@/bannerEntity/banner.entity';
import { BannersRepository } from '@/bannersRepository/banner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Banners])],
  providers: [BannersService, BannersRepository],
  controllers: [BannersController],
})
export class BannersModule {}
