import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PaymentDto } from './payment.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}
  
  all(){
    return this.prismaService.payment.findMany();
  }

  async payment(data: PaymentDto){
    await this.prismaService.payment.create({
      data: {
        ...data,
        status: this.hand_status()
      }
    });

  }

  hand_status(){
    return Math.random() > 0.5 ? PaymentStatus.PAID : PaymentStatus.FAILED;
  }


}
