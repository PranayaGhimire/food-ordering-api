import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from './subscriber.schema';
import { AddSubscriberDto } from './dto/add-subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name) private subscriberModel: Model<Subscriber>,
  ) {}
  async getSubscribers() {
    const subscribers = await this.subscriberModel.find();
    return {
      message: 'All subscribers fetched successfully',
      data: subscribers,
    };
  }
  async addSubscriber(data: AddSubscriberDto) {
    const newSubscriber = await this.subscriberModel.create(data);
    return {
      message: 'You have subscribed successfully',
      data: newSubscriber,
    };
  }
}
