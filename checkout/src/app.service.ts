import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { OrderDto } from './order.dto';
import { OrderStatus } from '@prisma/client';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject('CHECKOUT_SERVICE')
    private kafkaClient: ClientKafka
  ) {}

  all() {
    return this.prisma.order.findMany();
  }

  async create(data: OrderDto) {
    const order = await this.prisma.order.create({ 
      data: {
        ...data,
        status: OrderStatus.CART
      },
     });
     await lastValueFrom(this.kafkaClient.emit('order_created', order));
     return order;
  }

  async update_order_status(data){
    if(data.status == 'PAID'){
      await lastValueFrom(this.kafkaClient.emit('order_paid', data));
    }
    
    await this.prisma.order.update({
      where: {
        id: data.order_id
      },
      data: {
        status: data.status == 'PAID' ? OrderStatus.PAID : OrderStatus.CANCELLED
      }
    });
  }
}
