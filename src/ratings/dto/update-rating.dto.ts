import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class UpdateRatingDto {
  @Prop()
  id: string;
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order: Types.ObjectId;
  @Prop({ default: 0 })
  rating: number;
}
