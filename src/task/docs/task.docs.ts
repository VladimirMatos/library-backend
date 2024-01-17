import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { UserDoc } from '@User/docs';
import { ExposeId } from '@Common/decorators';

@Exclude()
export class TasksDoc {
  @ApiProperty()
  @Expose()
  @ExposeId()
  _id: ObjectId;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  user: UserDoc;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
