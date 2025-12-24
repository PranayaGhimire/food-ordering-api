import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @Prop()
  foodIds: [Types.ObjectId];
  @Prop()
  totalAmount: number;
  @Prop()
  status: string;
}
