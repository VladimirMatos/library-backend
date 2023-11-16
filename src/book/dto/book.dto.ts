import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

class imageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  base64: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}

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

  @ApiProperty({ type: () => imageDto })
  @IsObject()
  @IsNotEmpty()
  @IsDefined()
  image: imageDto;
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

  @ApiProperty({ type: () => imageDto })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  image: imageDto;
}

export class UpdateBookPageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  text?: string;
}
