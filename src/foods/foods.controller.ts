import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { AddFoodDto } from './dto/addFood.dto';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ToggleFoodAvailabilityDto } from './dto/toggle-food-availability.dto';

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
  @UseInterceptors(FileInterceptor('file'))
  addFood(@Body() body: AddFoodDto, @UploadedFile() file: Express.Multer.File) {
    return this.foodService.addFood(body, file);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  updateFood(
    @Param('id') id: string,
    @Body() body: UpdateFoodDto,
    file: Express.Multer.File,
  ) {
    return this.foodService.updateFood(id, body, file);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  updateFoodAvailablity(
    @Param('id') id: string,
    @Body() body: ToggleFoodAvailabilityDto,
  ) {
    return this.foodService.updateFoodAvailability(id, body.isAvailable);
  }
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteFood(@Param('id') id: string) {
    return this.foodService.deleteFood(id);
  }
}
