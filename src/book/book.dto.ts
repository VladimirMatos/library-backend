import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  authorId: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  text: string;
}

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  categoryId?: number;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  status: boolean;
}
