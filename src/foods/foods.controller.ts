import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { AddFoodDto } from './dto/addFood.dto';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('foods')
export class FoodsController {
  constructor(private foodService: FoodsService) {}
  @Get()
  getFoods() {
    return this.foodService.getFoods();
  }
  @Get(':id')
  getFood(@Param('id') id: string) {
    return this.foodService.getFood(id);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  addFood(@Body() body: AddFoodDto) {
    return this.foodService.addFood(body);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Put()
  updateFood(@Body() body: UpdateFoodDto) {
    return this.foodService.updateFood(body);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Delete()
  deleteFood(id: string) {
    return this.foodService.deleteFood(id);
  }
}
