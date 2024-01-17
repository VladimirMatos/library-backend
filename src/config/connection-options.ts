import { Expose } from 'class-transformer';

export class ConnectionOptions {
  @Expose()
  db_url: string;
}
