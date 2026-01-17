import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  getMessages() {
    return this.messageService.getMessages();
  }
  @Post()
  sendMessage(@Body() body: SendMessageDto) {
    return this.messageService.sendMessage(body);
  }
}
