import { BannersDoc } from '@/bannerDoc/banners.doc';
import { Banners } from '@/bannerEntity/banner.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class BannersRepository {
  constructor(
    @InjectRepository(Banners) private bannerRepository: Repository<Banners>,
  ) {}

  async getOneBannerById(id: number): Promise<BannersDoc> {
    try {
      const banner = await this.bannerRepository.findOneOrFail({
        where: { id },
      });
      return banner;
    } catch (error) {
      throw new NotFoundException('Banner not found');
    }
  }
}
