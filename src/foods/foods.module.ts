import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './food.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  providers: [FoodsService],
  controllers: [FoodsController],
})
export class FoodsModule {}
