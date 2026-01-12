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
import { RatingsService } from './ratings.service';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingService: RatingsService) {}
  @Get()
  getRatings() {
    return this.ratingService.getRatings();
  }
  @Get(':id')
  getRating(@Param('id') id: string) {
    return this.ratingService.getRating(id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  createRating(@Body() body: CreateRatingDto) {
    return this.ratingService.createRating(body);
  }
  @Put(':id')
  updateRating(@Body() body: UpdateRatingDto) {
    return this.ratingService.updateRating(body);
  }
  @Delete(':id')
  deleteRating(@Param('id') id: string) {
    return this.ratingService.deleteRating(id);
  }
}
