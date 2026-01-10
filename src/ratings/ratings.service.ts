import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './rating.schema';
import { Model } from 'mongoose';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>) {}
  async getRatings() {
    const ratings = await this.ratingModel.find();
    return {
      message: 'Ratings Fetched Successfully',
      data: ratings,
    };
  }
  async getRating(id: string) {
    const rating = await this.ratingModel.findById(id);
    if (!rating) throw new BadRequestException('Rating Not Found');
    return {
      message: 'Rating Fetched Successfully',
      data: rating,
    };
  }
  async createRating(body: CreateRatingDto) {
    const newRating = await this.ratingModel.create(body);
    return {
      message: 'Rating Added Successfully',
      data: newRating,
    };
  }
  async updateRating(body: UpdateRatingDto) {
    const rating = await this.ratingModel.findById(body.id);
    if (!rating) throw new BadRequestException('Rating Not Found');
    const updatedRating = await this.ratingModel.findByIdAndUpdate(
      body.id,
      body,
      { new: true },
    );
    return {
      message: 'Rating Updated Successfully',
      data: updatedRating,
    };
  }
}
