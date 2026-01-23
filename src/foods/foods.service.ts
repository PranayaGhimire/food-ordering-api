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
import { QueryDto } from '../common/dto/query.dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async getFoods(query: QueryDto) {
    const { page = 1, limit = 10, search, category, price } = query;
    const skip = (page - 1) * limit;
    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    let sort: any = { createdAt: -1 };

    if (price === 'Lowest') {
      sort = { price: 1 };
    }

    if (price === 'Highest') {
      sort = { price: -1 };
    }

    const [foods, total] = await Promise.all([
      this.foodModel.find(filter).skip(skip).limit(limit).sort(sort),
      this.foodModel.countDocuments(),
    ]);
    return {
      message: 'Foods fetched successfully',
      data: foods,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
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
  async searchFood(search: string) {
    const food = await this.foodModel.find({
      name: { $regex: search, $options: 'i' }, // 'i' for case-insensitive
    });
    if (!food) throw new NotFoundException('Food not found');
    return {
      message: 'Food searched successfully',
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
  async updateFoodAvailability(id: string, isAvailable: boolean) {
    const food = await this.foodModel.findById(id);
    if (!food) throw new NotFoundException('Food not found');
    const availableFood = await this.foodModel.findByIdAndUpdate(
      id,
      { $set: { isAvailable } },
      { new: true },
    );
    return {
      message: 'Food availability updated successfully',
      data: availableFood,
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
