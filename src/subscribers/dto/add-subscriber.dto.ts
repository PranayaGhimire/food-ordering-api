import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddSubscriberDto {
  @IsNotEmpty()
  @IsString()
  @Prop()
  email: string;
}
