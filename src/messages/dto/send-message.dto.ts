import { Prop } from '@nestjs/mongoose';

export class SendMessageDto {
  @Prop()
  email: string;
  @Prop()
  name: string;
  @Prop()
  message: string;
}
