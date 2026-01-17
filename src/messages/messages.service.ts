import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model } from 'mongoose';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}
  async getMessages() {
    const messages = await this.messageModel.find();
    return {
      message: 'All messages fetched successfully',
      data: messages,
    };
  }
  async sendMessage(body: SendMessageDto) {
    const message = await this.messageModel.create(body);
    return {
      message: 'Message send successfully',
      data: message,
    };
  }
}
