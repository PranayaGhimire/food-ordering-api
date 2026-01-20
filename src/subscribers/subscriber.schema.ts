import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Subscriber {
  @Prop()
  email: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
