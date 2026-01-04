import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class AddFoodDto {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  restaurantId: Types.ObjectId;
  @Prop()
  image: string;
}
