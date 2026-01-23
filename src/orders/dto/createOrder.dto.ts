import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @Prop()
  food: Types.ObjectId;
  // @Prop()
  // totalAmount: number;
  @IsNotEmpty()
  @IsString()
  @Prop()
  user: Types.ObjectId;
  @IsOptional()
  @IsString()
  @Prop()
  status?: string;
}
