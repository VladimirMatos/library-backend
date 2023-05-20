import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class BookPageDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  text: string;
}
