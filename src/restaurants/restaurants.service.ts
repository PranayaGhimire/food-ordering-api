import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './restaurant.schema';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { UpdateRestaurantDto } from './dto/updateRestaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}
  async getRestaurants() {
    const restaurants = await this.restaurantModel.find();
    return {
      message: 'Restaurants fetched successfully',
      data: restaurants,
    };
  }
  async getRestaurant(id: string) {
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return {
      message: 'Restaurant fetched successfully',
      data: restaurant,
    };
  }
  async createRestaurant(body: CreateRestaurantDto) {
    const newRestaurant = await this.restaurantModel.create(body);
    return {
      message: 'New restaurant created successfully',
      data: newRestaurant,
    };
  }
  async updateRestaurant(body: UpdateRestaurantDto) {
    const updatedRestaurant =
      await this.restaurantModel.findByIdAndUpdate(body);
    if (!updatedRestaurant) throw new NotFoundException('Restaurant not found');
    return {
      message: 'Restaurant updated successfully',
      data: updatedRestaurant,
    };
  }
  async deleteRestaurant(id: string) {
    const deletedRestaurant = await this.restaurantModel.findByIdAndDelete(id);
    if (!deletedRestaurant) throw new NotFoundException('Restaurant not found');
    return {
      message: 'Restaurant deleted successfully',
    };
  }
}
