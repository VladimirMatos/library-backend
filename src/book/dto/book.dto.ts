import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  categoryId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  authorId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  text: string;
}

export class UpdateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  categoryId?: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  status: boolean;
}
