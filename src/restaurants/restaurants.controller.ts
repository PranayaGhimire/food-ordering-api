import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { UpdateRestaurantDto } from './dto/updateRestaurant.dto';
import { UserRole } from '../users/user.schema';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}
  @Get()
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }
  @Get(':id')
  getRestaurant(@Param('id') id: string) {
    return this.restaurantService.getRestaurant(id);
  }
  @Roles(UserRole.ADMIN)
  @Post()
  createRestaurant(@Body() body: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(body);
  }
  @Roles(UserRole.ADMIN)
  @Put()
  updateRestaurant(@Body() body: UpdateRestaurantDto) {
    return this.restaurantService.updateRestaurant(body);
  }
  @Roles(UserRole.ADMIN)
  @Delete()
  deleteRestaurant(id: string) {
    return this.restaurantService.deleteRestaurant(id);
  }
}
