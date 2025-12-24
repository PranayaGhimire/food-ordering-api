import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class UpdateFoodDto {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  restaurantId: Types.ObjectId;
}
