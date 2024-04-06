import { IsInt, IsPositive, Length, IsOptional, IsNotEmpty } from "class-validator";

export class CreateBookDto {
  @Length(5, 50, { message: "title is too short. Minimal length is $constraint1 characters, but actual is $value" })
  title: string;

  @Length(5, 500, { message: "description is too short. Minimal length is $constraint1 characters, but actual is $value" })
  description: string;

  @IsOptional()
  @Length(5, 255, { message: "imageUrl is too short. Minimal length is $constraint1 characters, but actual is $value" })
  imageUrl?: string;

  @Length(5, 50, { message: "category length is too short. Minimal length is $constraint1 characters, but actual is $value" })
  category: string;

  @IsInt({ message: "Price must be an integer" })
  @IsPositive({ message: "Price must be a positive number" })
  price: number;

  @IsNotEmpty({ message: "authorId should be sent, but didnt." })
  authorId: string;

  constructor(book: CreateBookDto) {
    this.title = book.title;
    this.description = book.description;
    this.imageUrl = book.imageUrl;
    this.category = book.category;
    this.price = book.price;
    this.authorId = book.authorId;
  }
}
