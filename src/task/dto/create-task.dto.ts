import { Status } from '@Common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: Status, example: Status })
  @IsNotEmpty()
  @IsEnum(Status, { message: 'Please enter correct Status' })
  status: Status;
}
