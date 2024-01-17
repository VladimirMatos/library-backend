import { registerAs } from '@nestjs/config';

export const maxPageSizeConfig = registerAs('maxPageSizeConfig', () => {
  const { MAX_PAGE_SIZE } = process.env;

  return {
    maxPageSize: Number(MAX_PAGE_SIZE),
  };
});
