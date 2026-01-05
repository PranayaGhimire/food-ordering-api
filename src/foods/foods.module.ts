import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './food.schema';
import { CloudinaryModule } from '../common/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
    CloudinaryModule,
  ],
  providers: [FoodsService],
  controllers: [FoodsController],
})
export class FoodsModule {}
