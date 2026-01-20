import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';
import { AddSubscriberDto } from './dto/add-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscriberService: SubscribersService) {}
  @Roles(UserRole.ADMIN)
  @Get()
  getSubscribers() {
    return this.subscriberService.getSubscribers();
  }
  @Post()
  addSubscriber(@Body() body: AddSubscriberDto) {
    return this.subscriberService.addSubscriber(body);
  }
}
