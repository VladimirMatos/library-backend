import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

import { ExposeId } from '@Common/decorators';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserDoc {
  @ApiProperty()
  @Expose()
  @ExposeId()
  _id: ObjectId;

  @ApiProperty()
  @Expose()
  userName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}

@Exclude()
export class UserWithPassDoc {
  @ApiProperty()
  @Expose()
  @ExposeId()
  _id: ObjectId;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
