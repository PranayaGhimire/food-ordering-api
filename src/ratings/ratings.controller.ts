import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { CreateRatingDto } from './dto/create-rating.dto';

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
  createRating(@Body() body: CreateRatingDto) {
    return this.ratingService.createRating(body);
  }
  @Put(':id')
  updateRating(@Body() body: UpdateRatingDto) {
    return this.ratingService.updateRating(body);
  }
}
