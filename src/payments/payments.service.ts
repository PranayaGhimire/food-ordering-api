/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { InitiateKhaltiDto } from './dto/initiate-khalti.dto';
import { VerifyKhaltiDto } from './dto/verify-khalti.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../orders/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  private khaltiUrl = process.env.KHALTI_URL;
  private khaltiSecretKey = process.env.KHALTI_LIVE_SECRET_KEY;
  async initiatePayment(body: InitiateKhaltiDto) {
    try {
      const response = await axios.post(
        `${this.khaltiUrl}/epayment/initiate/`,
        {
          return_url:
            process.env.NODE_ENV === 'production'
              ? 'https://food-ordering-frontend-pranaya.vercel.app/payments'
              : 'http://localhost:3000/payments',
          website_url:
            process.env.NODE_ENV === 'production'
              ? 'https://food-ordering-frontend-pranaya.vercel.app'
              : 'http://localhost:3000',
          amount: body.amount * 100,
          purchase_order_id: body.orderId,
          purchase_order_name: 'Food Order',
        },
        {
          headers: {
            Authorization: `Key ${this.khaltiSecretKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return {
        message: 'Khalti Payment Intiated Successfully',
        data: response.data,
      };
    } catch (error) {
      throw new BadRequestException('Khalti payment initiation failed', error);
    }
  }
  async verifyPayment(body: VerifyKhaltiDto) {
    try {
      const response = await axios.post(
        `${this.khaltiUrl}/epayment/lookup/`,
        {
          pidx: body.pidx,
        },
        {
          headers: {
            Authorization: `Key ${this.khaltiSecretKey}`,
          },
        },
      );
      if (response?.data?.data?.status === 'Completed') {
        await this.orderModel.findByIdAndUpdate(
          body.orderId,
          { paymentStatus: 'PAID' },
          { new: true },
        );
      }
      return {
        message: 'Khalti Payment Verified Successfully',
        data: response.data,
      };
    } catch (error) {
      throw new BadRequestException(
        'Khalti epayment verification failed',
        error,
      );
    }
  }
}
