import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';

export class VerifyKhaltiDto {
  @IsNotEmpty()
  @Prop()
  pidx: string;

  @IsNotEmpty()
  @Prop()
  orderId: string;
}
