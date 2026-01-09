import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class InitiateKhaltiDto {
  @IsNotEmpty()
  @Prop()
  amount: number;
  @IsNotEmpty()
  @Prop()
  orderId: string;
}
