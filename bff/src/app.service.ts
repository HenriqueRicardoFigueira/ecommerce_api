import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { OrderDto } from './order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  all() {
    return this.prisma.order.findMany();
  }

  create(data: OrderDto) {
    return this.prisma.order.create({ 
      data: {
        ...data,
        status: OrderStatus.CART
      },
     });
  }
}
