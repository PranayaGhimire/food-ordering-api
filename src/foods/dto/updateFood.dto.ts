import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFoodDto {
  // @Prop()
  // id: string;
  @IsOptional()
  @IsString()
  @Prop()
  name?: string;
  @IsOptional()
  @IsNumber()
  @Prop()
  price?: number;
  @Prop()
  image?: string;
  @Prop()
  category: string;
  @Prop()
  restaurantId: Types.ObjectId;
}
