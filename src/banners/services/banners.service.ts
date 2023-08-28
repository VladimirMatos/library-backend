import { Banners } from '@/bannerEntity/banner.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { BannersDoc } from '@/bannerDoc/banners.doc';
import { BannersRepository } from '@/bannersRepository/banner.repository';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banners) private bannersRepository: Repository<Banners>,
    private customBannerRepository: BannersRepository,
  ) {}

  async getAllBanners(): Promise<Banners[]> {
    const bannersFind = await this.bannersRepository.find();

    const banners = plainToInstance(BannersDoc, bannersFind);

    return banners;
  }

  async createBanners(): Promise<BannersDoc[]> {
    const banners = [
      {
        title: 'Realms Unveiled 🌌',
        subtitle: 'Explore the Wonders and Perils of Magical Realms 🌟',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/e-library-ef80c.appspot.com/o/banners%2Ffantasy2.jpeg?alt=media&token=cec99b02-e879-40c9-b759-f125420415aa',
      },
      {
        title: `Embarking on an Epic Journey of Adventure 🌍`,
        subtitle:
          'Navigating the Thrills and Challenges of Adventurous Frontiers',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/e-library-ef80c.appspot.com/o/banners%2Fadventure2.jpeg?alt=media&token=c14099e9-2444-468c-bc38-bbaadba391b6',
      },
      {
        title: 'Whispers in the Shadows 🌑',
        subtitle: 'Unveiling the Sinister Secrets of a Desolate Town',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/e-library-ef80c.appspot.com/o/banners%2Fthriller2.jpeg?alt=media&token=faf45ee2-2ee0-4cfa-83a7-4e9411ad8063',
      },
      {
        title: 'Unearthing the Unseen 🔪',
        subtitle: 'Unmasking the Darkness That Lurks Within Society',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/e-library-ef80c.appspot.com/o/banners%2Fhorror2.jpeg?alt=media&token=156f12fa-df05-4c79-ad9d-c241493661b1',
      },
      {
        title: 'Unveiling the Paranormal Realm 👻',
        subtitle: `Exploring Eerie Encounters, Hauntings, and Otherworldly Phenomena`,
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/e-library-ef80c.appspot.com/o/banners%2Fparanormal2.jpeg?alt=media&token=8213b51a-77eb-40b8-8ce0-037473f735d6',
      },
      {
        title: 'Revealing the Hidden Hearts 💕',
        subtitle: `Delving into Passion's Secrets and Desires`,
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/e-library-ef80c.appspot.com/o/banners%2Fromance2.jpeg?alt=media&token=d9f9a28d-f68a-4ce5-b442-0c24c9088870',
      },
      {
        title: 'A Journey Through Poetic Depths',
        subtitle: 'Exploring the Sublime Whispers of Emotion and Thought',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/e-library-ef80c.appspot.com/o/banners%2Fpoetry2.jpeg?alt=media&token=834dea0d-61e2-4901-beb6-bbe8269e016e',
      },
      {
        title: `We're not alone 👽`,
        subtitle: 'All the tech dreams and nightmares in these sci-fi reads',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/e-library-ef80c.appspot.com/o/banners%2Fficcion.png?alt=media&token=297ddfed-a685-475d-8f74-c4a881888a3b',
      },
    ];

    const bannerCreate = await this.bannersRepository.create(banners);

    const bannerSave = await this.bannersRepository.save(bannerCreate);

    const bannerPlain = plainToInstance(BannersDoc, bannerSave);

    return bannerPlain;
  }

  async getOneBanner(id: number): Promise<BannersDoc> {
    const banner = await this.customBannerRepository.getOneBannerById(id);

    if (!banner) throw new NotFoundException('Banner not found');

    const bannerPlain = plainToInstance(BannersDoc, banner);

    return bannerPlain;
  }
}
