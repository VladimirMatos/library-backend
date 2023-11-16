import { BannersDoc } from '@/bannerDoc/banners.doc';
import { BannersService } from '@/bannerService/banners.service';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bannners')
@Controller('banners')
export class BannersController {
  constructor(private bannersService: BannersService) {}

  @ApiOkResponse({
    description: 'Banners found',
    type: [BannersDoc],
  })
  @ApiBadRequestResponse({
    description: 'Banners not found',
  })
  @Get()
  getAllBaners(): Promise<BannersDoc[]> {
    return this.bannersService.getAllBanners();
  }

  @ApiOkResponse({
    description: 'Banner found',
    type: BannersDoc,
  })
  @ApiBadRequestResponse({
    description: 'Banner not found',
  })
  @Get(':id')
  getOneBanners(@Param('id') id: number): Promise<BannersDoc> {
    return this.bannersService.getOneBanner(id);
  }

  @ApiOkResponse({
    description: 'Banners create',
    type: [BannersDoc],
  })
  @ApiBadRequestResponse({
    description: 'Banners not created',
  })
  @Post()
  create(): Promise<BannersDoc[]> {
    return this.bannersService.createBanners();
  }
}
