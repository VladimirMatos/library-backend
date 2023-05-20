import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookRentDto {
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  userId: number;
}
