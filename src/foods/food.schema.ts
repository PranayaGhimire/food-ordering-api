import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Food {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant' })
  restaurantId: Types.ObjectId;
}
export const FoodSchema = SchemaFactory.createForClass(Food);
