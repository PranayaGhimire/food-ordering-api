import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRatingDto {
  @IsMongoId()
  user: Types.ObjectId;
  @IsMongoId()
  order: Types.ObjectId;
  @IsNumber()
  @IsNotEmpty()
  rating: number;
  @IsNotEmpty()
  @IsString()
  comment: string;
}
