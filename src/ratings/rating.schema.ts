import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Rating {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order: Types.ObjectId;
  @Prop({ default: 0 })
  rating: number;
  @Prop()
  comment: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

RatingSchema.index({ user: 1, order: 1 }, { unique: true });
