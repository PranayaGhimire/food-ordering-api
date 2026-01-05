import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @Prop()
  food: Types.ObjectId;
  // @Prop()
  // totalAmount: number;
  @Prop()
  status: string;
}
