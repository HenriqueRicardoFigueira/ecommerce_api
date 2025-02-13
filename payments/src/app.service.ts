import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PaymentDto } from './payment.dto';
import { PaymentStatus } from '@prisma/client';
import { lastValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService,
    @Inject('PAYMENT_SERVICE')
    private kafkaClient: ClientKafka
  ) {}
  
  all(){
    return this.prismaService.payment.findMany();
  }

  async payment(data: PaymentDto){
    const payment = await this.prismaService.payment.create({
      data: {
        ...data,
        status: this.hand_status()
      }
    });
    await lastValueFrom(this.kafkaClient.emit('payment_created', payment));

    return payment;
  }

  hand_status(){
    return Math.random() > 0.5 ? PaymentStatus.PAID : PaymentStatus.FAILED;
  }


}
