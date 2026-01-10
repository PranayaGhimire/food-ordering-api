import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'Food' })
  food: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
  // @Prop()
  // totalAmount: number;
  @Prop({ default: 'PENDING' })
  status: string;
  @Prop({ default: 'UNPAID' })
  paymentStatus: string;
  @Prop()
  khaltiPidx: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
