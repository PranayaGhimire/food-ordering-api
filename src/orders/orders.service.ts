import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  async findOrders() {
    const orders = await this.orderModel.find().populate('food');
    return {
      message: 'Orders found successfully',
      data: orders,
    };
  }
  async findOrder(id: string) {
    const order = await this.orderModel.findById(id);
    return {
      message: 'Order found successfully',
      data: order,
    };
  }
  async createOrder(data: CreateOrderDto) {
    const newOrder = await this.orderModel.create(data);
    return {
      message: 'New order created successfully',
      data: newOrder,
    };
  }
  async updateOrder(data: UpdateOrderDto) {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(data.id, data);
    return {
      message: 'Order updated successfully',
      data: updatedOrder,
    };
  }
  async deleteOrder(id: string) {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id);
    return {
      message: 'Order delete successfully',
      data: deletedOrder,
    };
  }
}
