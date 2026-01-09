import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { InitiateKhaltiDto } from './dto/initiate-khalti.dto';
import { VerifyKhaltiDto } from './dto/verify-khalti.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('khalti/initiate')
  initiateKhalti(@Body() body: InitiateKhaltiDto) {
    return this.paymentService.initiatePayment(body);
  }
  @Post('khalti/verify')
  verifyKhalti(@Body() body: VerifyKhaltiDto) {
    return this.paymentService.verifyPayment(body);
  }
}
