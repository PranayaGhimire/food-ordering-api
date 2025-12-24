import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Restaurant {
  @Prop()
  name: string;
  @Prop()
  address: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
