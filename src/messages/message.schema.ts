import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop()
  email: string;
  @Prop()
  name: string;
  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
