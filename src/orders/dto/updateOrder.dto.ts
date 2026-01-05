import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class UpdateOrderDto {
  @Prop()
  id: string;
  @Prop()
  food: Types.ObjectId;
  // @Prop()
  // totalAmount: number;
  @Prop()
  status: string;
}
