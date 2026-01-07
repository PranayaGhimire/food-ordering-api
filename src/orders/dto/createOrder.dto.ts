import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsObject()
  @Prop()
  food: Types.ObjectId;
  // @Prop()
  // totalAmount: number;
  @IsNotEmpty()
  @IsObject()
  @Prop()
  user: Types.ObjectId;
  @IsNotEmpty()
  @IsString()
  @Prop()
  status: string;
}
