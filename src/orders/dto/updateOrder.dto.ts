import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsMongoId()
  id: string;
  // food: Types.ObjectId;
  // @Prop()
  // totalAmount: number;
  @IsString()
  @IsNotEmpty()
  status: string;
}
