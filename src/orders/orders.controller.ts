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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findOrders() {
    return this.orderService.findOrders();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOrder(@Param('id') id: string) {
    return this.orderService.findOrder(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(body);
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  updateOrder(@Body() body: UpdateOrderDto) {
    return this.orderService.updateOrder(body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteOrder(id: string) {
    return this.orderService.deleteOrder(id);
  }
}
