import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Rating {
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order: Types.ObjectId;
  @Prop({ default: 0 })
  rating: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
