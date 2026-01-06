/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './food.schema';
import { Model } from 'mongoose';
import { AddFoodDto } from './dto/addFood.dto';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async getFoods() {
    const foods = await this.foodModel.find();
    return {
      message: 'Foods fetched successfully',
      data: foods,
    };
  }
  async getFood(id: string) {
    const food = await this.foodModel.findById(id);
    if (!food) throw new NotFoundException('Food not found');
    return {
      message: 'Food fetched successfully',
      data: food,
    };
  }
  async addFood(data: AddFoodDto, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Image is required');
    const imageData = await this.cloudinaryService.uploadFile(file);
    const newFood = await this.foodModel.create({
      ...data,
      image: imageData?.secure_url,
      imagePublicId: imageData?.public_id,
    });
    return {
      message: 'New food added successfully',
      data: newFood,
    };
  }
  async updateFood(
    id: string,
    data: UpdateFoodDto,
    file?: Express.Multer.File,
  ) {
    const food = await this.foodModel.findById(id);
    if (!food) throw new NotFoundException('Food not found');
    let imageData;
    if (file) {
      if (food.imagePublicId) {
        await this.cloudinaryService.deleteFile(food.imagePublicId);
      }
      imageData = await this.cloudinaryService.uploadFile(file);
    }
    const updatedFood = await this.foodModel.findByIdAndUpdate(
      id,
      {
        ...data,
        image: imageData?.secure_url,
      },
      {
        new: true,
      },
    );
    if (!updatedFood) throw new NotFoundException('Food not found');
    return {
      message: 'Food updated successfully',
      data: updatedFood,
    };
  }
  async deleteFood(id: string) {
    const deletedFood = await this.foodModel.findByIdAndDelete(id);
    if (!deletedFood) throw new NotFoundException('Food not found');
    return {
      message: 'Food deleted successfully',
    };
  }
}
